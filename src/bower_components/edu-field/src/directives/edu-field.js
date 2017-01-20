'use strict';

eduFieldDirectives.directive("dynamicName",function($compile){
    return {
        restrict:"A",
        terminal:true,
        priority:1000,
        link:function(scope,element,attrs){
            element.attr('name', scope.$eval(attrs.dynamicName));
            element.removeAttr("dynamic-name");
            $compile(element)(scope);
        }
    };
});
eduFieldDirectives.directive(
        'dateInput',
        function(dateFilter) {
            return {
                require: 'ngModel',
                template: '<input type="date" ></input>',
                replace: true,
                link: function(scope, elm, attrs, ngModelCtrl) {
                    ngModelCtrl.$formatters.unshift(function (modelValue) {
                        return dateFilter(modelValue, 'yyyy-MM-dd');
                    });
                    
                    ngModelCtrl.$parsers.unshift(function(viewValue) {
                        return new Date(viewValue);
                    });
                },
            };
    });
	eduFieldDirectives.directive(
        'dateTimeInput',
        function(dateFilter) {
            return {
                require: 'ngModel',
                template: '<input type="datetime-local"></input>',
                replace: true,
                link: function(scope, elm, attrs, ngModelCtrl) {
                    ngModelCtrl.$formatters.unshift(function (modelValue) {
                        return dateFilter(modelValue, 'yyyy-MM-ddTHH:mm');
                    });
                    
                    ngModelCtrl.$parsers.unshift(function(viewValue) {
                        return new Date(viewValue);
                    });
                },
            };
    });



eduFieldDirectives.directive('eduField', function formField($http, $compile, $templateCache,$timeout) {

	var getTemplateUrl = function(type) {
		var templateUrl = '';

		switch(type) {
		    case 'textbutton':
				templateUrl = 'directives/edu-field-textbutton-tpl.html';
				break;
			case 'button':
				templateUrl = 'directives/edu-field-button-tpl.html';
				break;
			case 'hidden':
				templateUrl = 'directives/edu-field-hidden-tpl.html';
				break;
			case 'literal':
				templateUrl = 'directives/edu-field-literal-tpl.html';
				break;
			case 'upload':
				templateUrl = 'directives/edu-field-upload-tpl.html';
				break;
			case 'upload15x':
				templateUrl = 'directives/edu-field-upload15x-tpl.html';
				break;
		    case 'nifniecif':
				templateUrl = 'directives/edu-field-nifniecif-tpl.html';
				break;
			case 'iban':
				templateUrl = 'directives/edu-field-iban-tpl.html';
				break;
			case 'autocomplete':
				templateUrl = 'directives/edu-field-autocomplete-tpl.html';
				break;
			case 'range':
				templateUrl = 'directives/edu-field-range-tpl.html';
				break;
			case 'textedit':
				templateUrl = 'directives/edu-field-textedit-tpl.html';
				break;
			case 'url':
				templateUrl = 'directives/edu-field-url-tpl.html';
				break;
			case 'time':
				templateUrl = 'directives/edu-field-time-tpl.html';
				break;
			case 'week':
				templateUrl = 'directives/edu-field-week-tpl.html';
				break;
			case 'month':
				templateUrl = 'directives/edu-field-month-tpl.html';
				break;
			case 'date<13':
				templateUrl = 'directives/edu-field-date-tpl.html';
				break;
			case 'date':
				templateUrl = 'directives/edu-field-date-ag-ui-tpl.html';
				break;
			case 'date-time':
				templateUrl = 'directives/edu-field-date-time-tpl.html';
				break;
			case 'textarea':
				templateUrl = 'directives/edu-field-textarea-tpl.html';
				break;
			case 'radio':
				templateUrl = 'directives/edu-field-radio-tpl.html';
				break;
			case 'select':
				templateUrl = 'directives/edu-field-select-tpl.html';
				break;
			case 'number':
				templateUrl = 'directives/edu-field-number-tpl.html';
				break;
			case 'checkbox':
				templateUrl = 'directives/edu-field-checkbox-tpl.html';
				break;
			case 'password' :
				templateUrl = 'directives/edu-field-password-tpl.html';
				break;
			case 'hidden' :
				templateUrl = 'directives/edu-field-hidden-tpl.html';
				break;
			case 'email':
				templateUrl = 'directives/edu-field-email-tpl.html';
				break;
			case 'text':
				templateUrl = 'directives/edu-field-text-tpl.html';
				break;
			default :
				templateUrl = null;
				break;
		}

		return templateUrl;
	};
	var getStringPattern = function(type) {
		var stringPattern = '';

		switch(type) {
		    case 'textbutton':
				stringPattern = '';
				break;
			case 'button':
				stringPattern = '';
				break;
			case 'hidden':
				stringPattern = '';
				break;
			case 'literal':
				stringPattern = '';
				break;
			case 'upload':
				stringPattern = '';
				break;
			case 'upload15x':
				stringPattern = '';
				break;
		    case 'nifniecif':
				stringPattern = '';
				break;
			case 'iban':
				stringPattern = '';
				break;
			case 'autocomplete':
				stringPattern = '';
				break;
			case 'range':
				stringPattern = '';
				break;
			case 'textedit':
				stringPattern = '';
				break;
			case 'url':
				stringPattern = '';
				break;
			case 'time':
				stringPattern = '';
				break;
			case 'week':
				stringPattern = '';
				break;
			case 'month':
				stringPattern = '^(19|20)\d\d[- \/](0[1-9]|1[012])$';
				break;
			case 'date<13':
				stringPattern = '';
				break;
			case 'date':
				stringPattern = '';
				break;
			case 'date-time':
				stringPattern = '';
				break;
			case 'textarea':
				stringPattern = '';
				break;
			case 'radio':
				stringPattern = '';
				break;
			case 'select':
				stringPattern = '';
				break;
			case 'number':
				stringPattern = '^-?[0-9]+$';
				break;
			case 'checkbox':
				stringPattern = '';
				break;
			case 'password' :
				stringPattern = '';
				break;
			case 'hidden' :
				stringPattern = '';
				break;
			case 'email':
				stringPattern = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|es|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b$";
				break;
			case 'text':
				stringPattern = '';
				break;
			default :
				stringPattern = '';
				break;
		}

		return stringPattern;
	};
	return {
		restrict: 'AE',
		transclude: true,
		scope: {
			options: '=options',
			value:'=value'
		},
		
		
		// -------------------------------------------------- //
        //        LINK
        // -------------------------------------------------- //
		
		
		link: function fieldLink($scope, $element, $attr,ctrl) {
			
			if (!$scope.hasOwnProperty('options')) {
				throw new Error('options are required!');
            }
			
			
		
		    // load the correct template
			var templateUrl = $scope.options.templateUrl || getTemplateUrl($scope.options.type);
			
			if (templateUrl) {
				$http.get(templateUrl, {
					cache: $templateCache
				}).success(function(data) {
					$element.html(data);
					$compile($element.contents())($scope);					
				});
			} else {
				console.log('eduField Error: plantilla tipo \'' + $scope.options.type + '\' no soportada.');
			}
			
            // validate field
            $scope.$dirty=false;
			$scope.$invalid=false;
			$scope.$invalidRequired=false;
			$scope.$invalidPattern=false;
			$scope.$invalidMinlength=false;
			$scope.$invalidMaxlength=false;
			$scope.$invalidMin=false;
			$scope.$invalidMax=false;
		  
			
			// ---
			// CALLBACKS
			// ---
			$scope.onClick=function() {
				if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onClick == 'function'){
					$scope.options.fieldListeners.onClick($scope.value);
				}
			}
			$scope.onChange=function() {
				if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onChange == 'function'){
					$scope.options.fieldListeners.onChange($scope.value);
				}
			}
			
			$scope.onKeypress=function($event) {
				if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onKeypress == 'function'){
					$scope.options.fieldListeners.onKeypress($event);
				}
			}
			
			$scope.onInit=function() {
				 var callInit=function(){
							    	$scope.options.fieldListeners.onInit($scope.value);
									$scope.$apply() ;
							}
								
				if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onInit == 'function'){
					$timeout(callInit,2000);
				}
			}
			
			$scope.onFocus=function() {
				if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onFocus == 'function'){
					$scope.options.fieldListeners.onFocus($scope.value);
				}
			}
			
			$scope.onBlur=function() {
				var elementClass=$element.find("[id^='"+$scope.id+"']").attr('class');
				$element.find("[id^='"+$scope.id+"']").attr('blur',true);
				if(typeof elementClass!=="undefined"){
				    var aClass=elementClass.split(" ");
					for(var i=0;i<aClass.length;i++){
						if(aClass[i]==="ng-dirty"){ $scope.$dirty=true;}
						else if(aClass[i]=="ng-invalid"){ $scope.$invalid=true;}
						else if(aClass[i]=="ng-invalid-required"){ $scope.$invalidRequired=true; }
						else if(aClass[i]=="ng-invalid-pattern"){ $scope.$invalidPattern=true;}
						else if(aClass[i]=="ng-invalid-minlength"){ $scope.$invalidMinlength=true;}
						else if(aClass[i]=="ng-invalid-maxlength"){ $scope.$invalidMaxlength=true;}
						else if(aClass[i]=="ng-invalid-min"){ $scope.$invalidMin=true;}
						else if(aClass[i]=="ng-invalid-max"){ $scope.$invalidMax=true;}
						
						else if(aClass[i]=="ng-valid"){ $scope.$invalid=false;}
						else if(aClass[i]=="ng-valid-required"){ $scope.$invalidRequired=false;}
						else if(aClass[i]=="ng-valid-pattern"){ $scope.$invalidPattern=false;}
						else if(aClass[i]=="ng-valid-minlength"){ $scope.$invalidMinlength=false;}
						else if(aClass[i]=="ng-valid-maxlength"){ $scope.$invalidMaxlength=false;}
					}
				}
				
				if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onBlur == 'function'){
					$scope.options.fieldListeners.onBlur($scope.value);
				}
				
			}	
		},
		
		
		
		// -------------------------------------------------- //
        //        CONTROLLER
        // -------------------------------------------------- //
		
		
		
		controller: function fieldController($scope,Upload,FileUploader) {
			
			// component control
			$scope.options.fieldControl={};
		   
		    $scope.internalControl = $scope.options.fieldControl || {};
			
			// ---
			// METHODS
			// ---  
			$scope.internalControl.upload = function(idxFile) {
				console.log("llamada a file upload file:"+idxFile);
				if($scope.options.type=="upload"){
					$scope.uploader.queue[idxFile-1].upload();
				}
				if($scope.options.type=="upload15x"){
					$scope.ngfupload();
				}
			}
			$scope.internalControl.filesInQueue = function() {
				
				if($scope.options.type=="upload"){
					return $scope.uploader.queue.length;
				}else{
					return 0;
				}
			}
			
			$scope.internalControl.clearQueue = function() {
				
				if($scope.options.type=="upload"){
					return $scope.uploader.clearQueue();
				}else{
					return 0;
				}
			}
			
			
			$scope.internalControl.refresh = function(value) {
				if($scope.options.type=="select"){
					$scope.refreshSelect(value);
				}
			}
			
			$scope.internalControl.clean = function(value) {
				if($scope.options.type=="select"){
					$scope.optionsSelect=[];
				}
			}
			
			if (!$scope.options.hasOwnProperty('loadOnInit')&&$scope.options.type=='select'){
				$scope.options.loadOnInit=true;
			}
			
			//apply pattern to types. For fix change to 1.5.x
			$scope.pattern_validator = (function() {
				var regexp = '';
				if($scope.options.hasOwnProperty("pattern")){
					regexp=$scope.options.pattern;
					if(regexp.substr(0,1)=='/'){
						regexp=regexp.substr(1);
					}
					if(regexp.substr(regexp.length-1,1)=='/'){
						regexp=regexp.substr(0,regexp.length-1);
					}
					
				}else{
					regexp=getStringPattern($scope.options.type);
				}
				return regexp;
			})();
			
			//Especific validator
			
			// ---
			// CONTROL TYPE= date
		    // ---
			//$scope.options.showPopupCalendar=true;
			
			$scope.internalControl.showCalendar = function($event) {
				$event.preventDefault();
                $event.stopPropagation();
				$scope.options.showPopupCalendar=true;
			};
			
			// ---
			// CONTROL TYPE= iban
		    // ---
			$scope.ibanValidator = (function() {
				return {
					test: function(value) {
						return IBAN.isValid(value)
					}
				};
			})();
			
			// ---
			// CONTROL TYPE= nif nie cif
		    // ---
		    $scope.nifniecifValidator = (function() {
				return {
					test: function(value) {
						var sValid=valida_nif_cif_nie(value)
						if(sValid>0) return true;
						else 
						  return false
					}
				};
			})();

			
			// ---
			// CONTROL TYPE= ss
		    // ---
			$scope.ssValidator = (function() {
				return {
					test: function(value) {
						var sValid=ss(value)
						if(sValid>=0) return true;
						else 
						  return false
					}
				};
			})();
			
			
			// ---
			// CONTROL TYPE= uploader15x -- plugin ng-file-upload
		    // ---
			$scope.ngfselect=function(file){
				if(file){
					$scope.value=file.$ngfName || file.name;
					if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onAfterAddingFile == 'function'){
					$scope.options.fieldListeners.onAfterAddingFile(file);
			  }
				}
			}
			$scope.uploading=false;
			$scope.ngfupload=function(){
				$scope.uploading=true;
				if($scope.file){
					Upload.upload({
						url: $scope.options.url,
						data: {file: $scope.file}
					}).then(function (resp) {
						//console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
						$scope.uploading=false;
						if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onSuccessItem == 'function'){
							$scope.options.fieldListeners.onSuccessItem(resp.config.data.file);
						}
					}, function (resp) {
						//console.log('Error status: ' + resp.status);
						$scope.uploading=false;
						if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onErrorItem == 'function'){
							$scope.options.fieldListeners.onErrorItem(resp.status);
						}
					}, function (evt) {
						$scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
						//console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.data.file.name);
						if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onProgressItem == 'function'){
							$scope.options.fieldListeners.onProgressItem($scope.progressPercentage,evt.config.data.file.name);
						}
					});
				}
				
				
				
			}
			
			
			// ---
			// CONTROL TYPE= uploader
		    // ---

			    // create a uploader with options
			    var uploader = $scope.uploader = new FileUploader({
					url: $scope.options.url
				});

				// FILTERS

				uploader.filters.push({
					name: 'customFilter',
					fn: function(item /*{File|FileLikeObject}*/, options) {
						return this.queue.length < 10;
					}
				});

				// CALLBACKS

				uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
					if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onWhenAddingFileFailed == 'function'){
						$scope.options.fieldListeners.onWhenAddingFileFailed(item, filter, options);
					}
				};
				uploader.onAfterAddingFile = function(fileItem) {
					$scope.value=uploader.queue[0]._file.name
					if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onAfterAddingFile == 'function'){
						$scope.options.fieldListeners.onAfterAddingFile(fileItem);
					}
				};
				uploader.onAfterAddingAll = function(addedFileItems) {
					if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onAfterAddingAll == 'function'){
						$scope.options.fieldListeners.onAfterAddingAll(addedFileItems);
					}
				};
				uploader.onBeforeUploadItem = function(item) {
					if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onBeforeUploadItem == 'function'){
						$scope.options.fieldListeners.onBeforeUploadItem(item);
					}
				};
				uploader.onProgressItem = function(fileItem, progress) {
					if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onProgressItem == 'function'){
						$scope.options.fieldListeners.onProgressItem( fileItem, progress);
					}
				};
				uploader.onProgressAll = function(progress) {
					if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onProgressAll == 'function'){
						$scope.options.fieldListeners.onProgressAll( progress);
					}
				};
				uploader.onSuccessItem = function(fileItem, response, status, headers) {
					if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onSuccessItem == 'function'){
						$scope.options.fieldListeners.onSuccessItem(fileItem, response, status, headers);
					}
				};
				uploader.onErrorItem = function(fileItem, response, status, headers) {
					if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onErrorItem == 'function'){
						$scope.options.fieldListeners.onErrorItem(fileItem, response, status, headers);
					}
				};
				uploader.onCancelItem = function(fileItem, response, status, headers) {
					if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onCancelItem == 'function'){
						$scope.options.fieldListeners.onCancelItem(fileItem, response, status, headers);
					}
				};
				uploader.onCompleteItem = function(fileItem, response, status, headers) {
					if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onCompleteItem == 'function'){
						$scope.options.fieldListeners.onCompleteItem(fileItem, response, status, headers);
					}
				};
				uploader.onCompleteAll = function() {
					if ($scope.options.hasOwnProperty('fieldListeners') && typeof $scope.options.fieldListeners.onCompleteAll == 'function'){
						$scope.options.fieldListeners.onCompleteAll();
					}
				};

			
			// ---
			// CONTROL TYPE= SELECT
		    // ---
		$scope.refreshSelect = function (value) {
            if ($scope.options.selecttypesource == 'url' && true) {
              var sUrl = $scope.options.selectsource;
              if (typeof value != 'undefined') {
                sUrl = sUrl + '&' + value;
              }
            
              $http.get(sUrl).success(function (data, status, headers, config) {
                $scope.optionsSelect = data;
                for (var i = 0; i < $scope.optionsSelect.length; i++) {
                  if (!$scope.optionsSelect[i].hasOwnProperty('value')) {
                    $scope.optionsSelect[i].value = $scope.optionsSelect[i][$scope.options.optionvalue];
                  }
                  if (!$scope.optionsSelect[i].hasOwnProperty('name')) {
                    if ($scope.options.selectconcatvaluename) {
                      $scope.optionsSelect[i].name = $scope.optionsSelect[i][$scope.options.optionvalue] + ' - ' + $scope.optionsSelect[i][$scope.options.optionname];
                    } else {
                      $scope.optionsSelect[i].name = $scope.optionsSelect[i][$scope.options.optionname];
                    }
                    delete $scope.optionsSelect[i][$scope.options.optionname];
                    delete $scope.optionsSelect[i][$scope.options.optionvalue];
                  } else {
                    if ($scope.options.selectconcatvaluename) {
                      $scope.optionsSelect[i].name = $scope.optionsSelect[i]['value'] + ' - ' + $scope.optionsSelect[i]['name'];
                    } else {
                      $scope.optionsSelect[i].name = $scope.optionsSelect[i][$scope.options.optionname];
                    }
                  }
                }
                $scope.onInit();
              }).error(function (data, status, headers, config) {
              }); 
            } else if ($scope.options.selecttypesource == 'array') {
              $scope.optionsSelect = $scope.options.selectsource;
             
                if (typeof $scope.optionsSelect != 'undefined') {
                  for (var i = 0; i < $scope.optionsSelect.length; i++) {
				    if (!$scope.optionsSelect[i].hasOwnProperty('value')) {
                        $scope.optionsSelect[i].value = $scope.optionsSelect[i][$scope.options.optionvalue];
                    }
					if (!$scope.optionsSelect[i].hasOwnProperty('name')) {
						if ($scope.options.selectconcatvaluename) {
							$scope.optionsSelect[i].name = $scope.optionsSelect[i][$scope.options.optionvalue] + ' - ' + $scope.optionsSelect[i][$scope.options.optionname];
						   
						} else {
						    $scope.optionsSelect[i].name = $scope.optionsSelect[i][$scope.options.optionname];
						}
					    
					}
                    
                  }
                }
                $scope.onInit();
         
            }
          };
          
          if ($scope.options.type == 'select') {
            if ($scope.options.selecttypesource == 'url' && (typeof $scope.options.autoload == 'undefined' || $scope.options.autoload == true)) {
              var sUrl = $scope.options.selectsource;
              if ($scope.options.loadOnInit) {
                $http.get(sUrl).success(function (data, status, headers, config) {
                  $scope.optionsSelect = data;
                  for (var i = 0; i < $scope.optionsSelect.length; i++) {
                    if (!$scope.optionsSelect[i].hasOwnProperty('value')) {
                      $scope.optionsSelect[i].value = $scope.optionsSelect[i][$scope.options.optionvalue];
                    }
                    if (!$scope.optionsSelect[i].hasOwnProperty('name')) {
                      if ($scope.options.selectconcatvaluename) {
                        $scope.optionsSelect[i].name = $scope.optionsSelect[i][$scope.options.optionvalue] + ' - ' + $scope.optionsSelect[i][$scope.options.optionname];
                      } else {
                        $scope.optionsSelect[i].name = $scope.optionsSelect[i][$scope.options.optionname];
                      }
                      delete $scope.optionsSelect[i][$scope.options.optionname];
                      delete $scope.optionsSelect[i][$scope.options.optionvalue];
                    } else {
                      if ($scope.options.selectconcatvaluename) {
                        $scope.optionsSelect[i].name = $scope.optionsSelect[i]['value'] + ' - ' + $scope.optionsSelect[i]['name'];
                      } else {
                        $scope.optionsSelect[i].name = $scope.optionsSelect[i][$scope.options.optionname];
                      }
                    }
                  }
                  $scope.onInit();
                }).error(function (data, status, headers, config) {
                });
              }
            } else if ($scope.options.selecttypesource == 'array') {
              $scope.optionsSelect = $scope.options.selectsource;
              $scope.$watchCollection('optionsSelect', function () {
                if (typeof $scope.optionsSelect != 'undefined' && !$scope.optionsSelect[0].hasOwnProperty('value')) {
                  for (var i = 0; i < $scope.optionsSelect.length; i++) {
				    if (!$scope.optionsSelect[i].hasOwnProperty('value')) {
                        $scope.optionsSelect[i].value = $scope.optionsSelect[i][$scope.options.optionvalue];
                    }
					if (!$scope.optionsSelect[i].hasOwnProperty('name')) {
						if ($scope.options.selectconcatvaluename) {
							$scope.optionsSelect[i].name = $scope.optionsSelect[i][$scope.options.optionvalue] + ' - ' + $scope.optionsSelect[i][$scope.options.optionname];
						    
						} else {
						    $scope.optionsSelect[i].name = $scope.optionsSelect[i][$scope.options.optionname];
						}
					    
					}
                    
                  }
                }
                $scope.onInit();
              });
            }
          }
			
			// default value
			if (typeof $scope.options.default !== 'undefined') {
				$scope.value = $scope.options.default;
			}

			// set field id and name
			$scope.id = $scope.options.id ||$scope.options.key ;
			$scope.name = $scope.options.name || $scope.options.key

		}
	};
});
