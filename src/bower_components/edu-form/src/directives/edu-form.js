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
			//default options
			$scope.options.formMetaData.buttonsShow=true;
			$scope.options.formMetaData.tabsShow=true;
		    $scope.options.formMetaData.buttonsShow=true;
		    $scope.options.formMetaData.headerShow=true;
		    $scope.options.formMetaData.footerShow=true;
		    $scope.options.formMetaData.fieldSetShow=true;
			
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