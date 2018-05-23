'use strict';

eduFormDirectives.directive('eduForm', function() {
	return {
		restrict: 'AE',
		templateUrl: 'directives/edu-form-tpl.html',
		replace: true,
		transclude: true,
		scope: {
		    options:'=options',
			result: '=result'
		},
		controller: function($scope, $element,$timeout) {
			if (!$scope.hasOwnProperty('options')) {
                throw new Error('options are required!');
            }
			$scope.result={};
			$scope.$watchCollection('result', function(newValue, oldValue) {
				if ( newValue!== oldValue ) {
					if ($scope.options.formListeners.onchange === undefined) return;
						$scope.options.formListeners.onchange($scope.result);
				   }
			});
			
			$scope.$watchCollection('options.formFields', function(newValue, oldValue) {
				
			});
			
		    $scope.options.formData=$scope.result;	
			 
			//default options
			$scope.options.formMetaData.buttonsShow=(typeof $scope.options.formMetaData.buttonsShow==='undefined'?true:$scope.options.formMetaData.buttonsShow);
			$scope.options.formMetaData.tabsShow=(typeof $scope.options.formMetaData.tabsShow==='undefined'?true:$scope.options.formMetaData.tabsShow);
			$scope.options.formMetaData.headerShow=(typeof $scope.options.formMetaData.headerShow==='undefined'?true:$scope.options.formMetaData.headerShow);
			$scope.options.formMetaData.footerShow=(typeof $scope.options.formMetaData.footerShow==='undefined'?true:$scope.options.formMetaData.footerShow);
			$scope.options.formMetaData.fieldSetShow=(typeof $scope.options.formMetaData.fieldSetShow==='undefined'?true:$scope.options.formMetaData.fieldSetShow);
			
			$scope.options.formMetaData.showButtonSave=(typeof $scope.options.formMetaData.showButtonSave==='undefined'?true:$scope.options.formMetaData.showButtonSave);
			$scope.options.formMetaData.showButtonCancel=(typeof $scope.options.formMetaData.showButtonCancel==='undefined'?true:$scope.options.formMetaData.showButtonCancel);
			
			if($scope.options.formMetaData.hasOwnProperty("inputsSize")){
				for(var i=0;i<$scope.options.formFields.tabs.length;i++){
					for(var j=0;j<$scope.options.formFields.tabs[i].fieldSets.length;j++){
						for(var k=0;k<$scope.options.formFields.tabs[i].fieldSets[j].fields.length;k++){
							if(!$scope.options.formFields.tabs[i].fieldSets[j].fields[k].hasOwnProperty('inputSize') || (!$scope.options.formFields.tabs[i].fieldSets[j].fields[k].hasOwnProperty('inputSize') && $scope.options.formFields.tabs[i].fieldSets[j].fields[k].fieldSize=='')){
							  $scope.options.formFields.tabs[i].fieldSets[j].fields[k].inputSize=$scope.options.formMetaData.inputsSize;
							}
				        }
				    }
				}
			}

			$scope.options.formControl={};
			$scope.internalControl = $scope.options.formControl || {};
			//methods  
			$scope.internalControl.selectTab = function(indexTab) {
				if($scope.options.formFields.hasOwnProperty('tabs')){
					$scope.options.formFields.tabs[indexTab].active = true;
				}
			}
			$scope.internalControl.clearForm = function() {
				 angular.forEach($scope.options.formFields.tabs, function(tab) {
					angular.forEach(tab.fieldSets, function(fieldset) {
						angular.forEach(fieldset.fields, function(field) {
							$scope.result[field.key]="";
						});
					});
				 });
				 //for element out of options formFields
				 for( var key in $scope.result){
					$scope.result[key]="";
				}
			}
			
			$scope.internalControl.showTab = function(indexTab) {
				if($scope.options.formFields.hasOwnProperty('tabs')){
					$scope.options.formFields.tabs[indexTab].show = true;
				} 
			}
			
			$scope.internalControl.hideTab = function(indexTab) {
				if($scope.options.formFields.hasOwnProperty('tabs')){
					$scope.options.formFields.tabs[indexTab].show = false;
				} 
			}
			
			$scope.internalControl.showOverlayLoading = function(bShow) {
				$scope.options.showOverlayLoadingForm=bShow;  
			}
			
			$scope.internalControl.showOverlayFormSuccessError = function(type,text,duration) {
				console.log("show form success/error:"+type+text+duration);
				$scope.options.overlayFormSuccessErrorForm={};
				$scope.options.overlayFormSuccessErrorForm.show=true;
				$scope.options.overlayFormSuccessErrorForm.type=type=='1'?'success':'danger';
				$scope.options.overlayFormSuccessErrorForm.message=text;
				var closeForm=function(){
					$scope.options.overlayFormSuccessErrorForm.show=false;
					$scope.$apply() ;
				}
				$timeout(closeForm,duration);
			}
			
			// events
			$scope.save = function () {
                if ($scope.options.formListeners.onsave === undefined) return;
                $scope.options.formListeners.onsave($scope.result);
            };
            $scope.cancel = function () {
                if ($scope.options.formListeners === undefined) return;
                $scope.options.formListeners.oncancel();
            };
			
		},
		link: function ($scope,$document) {
			if (!$scope.hasOwnProperty('options')) {
                throw new Error('options are required!');
            }
			
			
		}
	};
});