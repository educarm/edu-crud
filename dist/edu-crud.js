// Main eduCrud Module
//Declare app level module which depends on filters, and services
var eduCrudServices = angular.module('edu-crud.services', []);
var eduCrudDirectives = angular.module('edu-crud.directives', []);
var eduCrudFilters = angular.module('edu-crud.filters', []);
var eduCrudTpl = angular.module('edu-crud.tpl', []);
// initialization of services into the main module
angular.module('eduCrud', [
  'edu-crud.services',
  'edu-crud.directives',
  'edu-crud.filters',
  'edu-crud.tpl',
  'ngResource',
  'ui.bootstrap',
  'eduForm',
  'eduGrid'
]);
eduCrudServices.factory('dataFactoryCrud', [
  '$resource',
  function ($resource) {
    return function (uri, actions) {
      var defActions = {
          getAll: {
            method: 'GET',
            params: {},
            withCredentials: true,
            isArray: true
          },
          getCount: {
            method: 'GET',
            url: uri + '/count',
            params: {},
            withCredentials: true,
            isArray: false
          },
          get: {
            method: 'GET',
            params: {},
            withCredentials: true,
            isArray: false
          },
          insert: {
            method: 'POST',
            params: {},
            withCredentials: true,
            isArray: false
          },
          update: {
            method: 'PUT',
            params: {},
            withCredentials: true,
            isArray: false
          },
          remove: {
            method: 'DELETE',
            params: {},
            withCredentials: true,
            isArray: false
          }
        };
      if (typeof actions !== 'undefined' && actions !== '') {
        for (keyAction in actions) {
          for (keyDefAction in defActions) {
            if (keyAction == keyDefAction) {
              defActions[keyDefAction] = actions[keyAction];
            }
          }
        }
      }
      return $resource(uri, {}, defActions);
    };
  }
]);
eduCrudDirectives.directive('eduCrud', function () {
  return {
    restrict: 'A',
    replace: true,
    transclude: false,
    scope: {
      ngModel: '=',
      options: '='
    },
    templateUrl: 'directives/edu-crud.tpl.html',
    link: function ($scope, $filter) {
      if (!$scope.hasOwnProperty('options')) {
        throw new Error('options are required!');
      }
    },
    controller: [
      '$scope',
      '$log',
      '$q',
      'dataFactoryCrud',
      function ($scope, $log, $q, dataFactoryCrud) {
        if (!$scope.hasOwnProperty('options')) {
          throw new Error('options are required!');
        }
        // ---
        // DEFAULT OPTIONS
        // ---	
        $scope.options.heading = typeof $scope.options.heading === 'undefined' ? 'EduCrud' : $scope.options.heading;
        $scope.options.metaData.panelType = typeof $scope.options.metaData.panelType === 'undefined' ? 'default' : $scope.options.metaData.panelType;
        $scope.options.showOverlayLoading = typeof $scope.options.showOverlayLoading === 'undefined' ? false : $scope.options.showOverlayLoading;
        $scope.options.showOvelayFormDelete = typeof $scope.options.showOvelayFormDelete === 'undefined' ? false : $scope.options.showOvelayFormDelete;
        $scope.options.showRefreshButton = typeof $scope.options.showRefreshButton === 'undefined' ? true : $scope.options.showRefreshButton;
        $scope.options.showAddButtonTopLeft = typeof $scope.options.showAddButtonTopLeft === 'undefined' ? true : $scope.options.showAddButtonTopLeft;
        // show elemEnts desing		
        $scope.options.showPagination = typeof $scope.options.showPagination === 'undefined' ? true : $scope.options.showPagination;
        $scope.options.showItemsPerPage = typeof $scope.options.showItemsPerPage === 'undefined' ? true : $scope.options.showItemsPerPage;
        $scope.options.showSearch = typeof $scope.options.showSearch === 'undefined' ? true : $scope.options.showSearch;
        $scope.options.showAvancedSearch = typeof $scope.options.showAvancedSearch === 'undefined' ? false : $scope.options.showAvancedSearch;
        $scope.options.showMetaData = typeof $scope.options.showMetaData === 'undefined' ? true : $scope.options.showMetaData;
        $scope.options.paginationWidth = typeof $scope.options.paginationWidth === 'undefined' ? 3 : $scope.options.paginationWidth;
        //buttons crud	pre	
        $scope.options.showButtonsCrudEditPre = typeof $scope.options.showButtonsCrudEditPre === 'undefined' ? true : $scope.options.showButtonsCrudEditPre;
        $scope.options.showButtonsCrudDeletePre = typeof $scope.options.showButtonsCrudDeletePre === 'undefined' ? true : $scope.options.showButtonsCrudDeletePre;
        //buttons crud post		
        $scope.options.showButtonsCrudEditPost = typeof $scope.options.showButtonsCrudEditPost === 'undefined' ? false : $scope.options.showButtonsCrudEditPost;
        $scope.options.showButtonsCrudDeletePost = typeof $scope.options.showButtonsCrudDeletePost === 'undefined' ? false : $scope.options.showButtonsCrudDeletePost;
        $scope.options.showRowNumber = typeof $scope.options.showRowNumber === 'undefined' ? true : $scope.options.showRowNumber;
        $scope.options.showSelectRow = typeof $scope.options.showSelectRow === 'undefined' ? false : $scope.options.showSelectRow;
        // default height. Changed to allow the component to resize vertically until it conforms to the contents of the records page
        //$scope.options.height=(typeof $scope.options.height==='undefined'?'300':$scope.options.height);
        if (typeof $scope.options.metaData !== 'undefined') {
          $scope.options.metaData.limit = typeof $scope.options.metaData.limit === 'undefined' ? 5 : $scope.options.metaData.limit;
        } else {
          $scope.options.metaData = { limit: 5 };
        }
        //For Backwards Compatibility. The properties of 'metaData' are passed to the root of the object,
        if (typeof $scope.options.panelType !== 'undefined') {
          $scope.options.metaData.panelType = $scope.options.panelType;
        }
        if (typeof $scope.options.limit !== 'undefined') {
          $scope.options.metaData.limit = $scope.options.limit;
        }
        if (typeof $scope.options.orderBy !== 'undefined') {
          $scope.options.metaData.orderBy = $scope.options.orderBy;
        }
        if (typeof $scope.options.order !== 'undefined') {
          $scope.options.metaData.order = $scope.options.order;
        }
        /*
				metaData:{
				   panelType:"info",
				   limit:50,
				   orderBy:'vcodcen',
				   order:'asc'
				},*/
        // ---
        // SETUP
        // ---
        //Backward compatibility
        if ($scope.options.hasOwnProperty('snippets') && $scope.options.snippets.hasOwnProperty('buttonNew')) {
          $scope.options.snippets.buttonAdd = $scope.options.snippets.buttonNew;
        }
        //Component control
        $scope.options.crudControl = {};
        $scope.showForm = false;
        $scope.options.buttonsGridUserPre = [];
        $scope.options.buttonsGridUserPost = [];
        $scope.options.formData = {};
        $scope.formFieldsError = false;
        $scope.formOptionsError = false;
        $scope.options.showButtonsGridUserPre = $scope.options.showButtonsCrudPre || $scope.options.showButtonsCrudEditPre || $scope.options.showButtonsCrudDeletePre || $scope.options.showButtonsUserPre;
        $scope.options.showButtonsGridUserPost = $scope.options.showButtonsCrudPost || $scope.options.showButtonsCrudEditPost || $scope.options.showButtonsCrudDeletePost || $scope.options.showButtonsUserPost;
        // ---
        // METHODS
        // ---
        $scope.internalControl = $scope.options.crudControl || {};
        $scope.internalControl.refresh = function (bCleanFilters) {
          $scope.options.gridControl.refresh(bCleanFilters);
        };
        $scope.internalControl.updateFields = function () {
          $scope.options.gridControl.updateFields();
          $scope.updateFields();
        };
        $scope.internalControl.showOverlayLoading = function (bShow) {
          $scope.options.gridControl.showOverlayLoading(bShow);
        };
        $scope.internalControl.clearGrid = function (bShow) {
          $scope.options.gridControl.clearGrid();
        };
        $scope.internalControl.clearCrud = function (bShow) {
          $scope.options.gridControl.clearGrid();
          $scope.options.formControl.clearForm();
        };
        $scope.internalControl.showOverlayFormDelete = function (bShow) {
          $scope.options.showOverlayCrudFormDelete = bShow;
        };
        $scope.internalControl.showOverlayFormUser = function (bShow) {
          $scope.options.gridControl.showOverlayFormUser(bShow);
        };
        $scope.internalControl.clearForm = function () {
          $scope.options.formControl.clearForm();
        };
        $scope.internalControl.selectTab = function (indexTab) {
          $scope.options.formControl.selectTab(indexTab);
        };
        $scope.internalControl.showButtonsUserPre = function (bShow) {
          $scope.options.gridControl.showButtonsUserPre(bShow);
        };
        $scope.internalControl.showButtonsUserPost = function (bShow) {
          $scope.options.gridControl.showButtonsUserPost(bShow);
        };
        $scope.internalControl.showButtonsCrudPre = function (bShow) {
          console.log('showButtonsCrudPre' + bShow);
          $scope.options.showButtonsCrudEditPre = bShow;
          $scope.options.showButtonsCrudDeletePre = bShow;
        };
        $scope.internalControl.showButtonsCrudPost = function (bShow) {
          $scope.options.showButtonsCrudEditPost = bShow;
          $scope.options.showButtonsCrudDeletePost = bShow;
        };
        $scope.internalControl.showButtonsCrudEditPre = function (bShow) {
          console.log('showButtonsCrudPre' + bShow);
          $scope.options.showButtonsCrudEditPre = bShow;
        };
        $scope.internalControl.showButtonsCrudEditPost = function (bShow) {
          $scope.options.showButtonsCrudEditPost = bShow;
        };
        $scope.internalControl.showButtonsCrudDeletePre = function (bShow) {
          console.log('showButtonsCrudPre' + bShow);
          $scope.options.showButtonsCrudDeletePre = bShow;
        };
        $scope.internalControl.showButtonsCrudDeletePost = function (bShow) {
          $scope.options.showButtonsCrudDeletePost = bShow;
        };
        $scope.internalControl.clearSelection = function () {
          $scope.options.gridControl.clearSelection();
        };
        // ---
        // 
        // --- 
        if ($scope.options.hasOwnProperty('showButtonsCrudPre')) {
          $scope.options.showButtonsCrudEditPre = $scope.options.showButtonsCrudPre;
          $scope.options.showButtonsCrudDeletePre = $scope.options.showButtonsCrudPre;
        }
        if ($scope.options.hasOwnProperty('showButtonsCrudPost')) {
          $scope.options.showButtonsCrudEditPost = $scope.options.showButtonsCrudPost;
          $scope.options.showButtonsCrudDeletePost = $scope.options.showButtonsCrudPost;
        }
        if ($scope.options.hasOwnProperty('showAddButtonTopLeft')) {
          $scope.options.showExtraButtonTopLeft = $scope.options.showAddButtonTopLeft;
        }
        if ($scope.options.hasOwnProperty('showAddButtonTopRight')) {
          $scope.options.showExtraButtonTopRight = $scope.options.showAddButtonTopRight;
        }
        if ($scope.options.hasOwnProperty('snippets') && $scope.options.snippets.hasOwnProperty('buttonAdd')) {
          $scope.options.snippets.extraButtonTop = $scope.options.snippets.buttonAdd;
        }
        // ---
        // LISTENERS
        // ---
        if (!$scope.options.hasOwnProperty('listListeners')) {
          $scope.options.listListeners = {};
        }
        $scope.$watch('mode', function (newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          if ($scope.options.hasOwnProperty('crudListeners')) {
            if ($scope.options.crudListeners.hasOwnProperty('onChangeMode') && typeof $scope.options.crudListeners.onChangeMode == 'function') {
              $scope.options.crudListeners.onChangeMode(newValue, oldValue);
            }
          }
        });
        $scope.options.listListeners.onExtraButtonClick = function () {
          $scope.add();
        };
        //Inicializa la lista de campos para que funcionen correctamente.
        $scope.updateFields = function () {
          if (typeof $scope.options.crudUri !== 'undefined' && $scope.options.crudUri !== '') {
            $scope.api = dataFactoryCrud($scope.options.crudUri, typeof $scope.options.actions !== 'undefined' ? $scope.options.actions : '');
          }
          ;
        };
        if ($scope.options.showButtonsUserPre) {
          if ($scope.options.hasOwnProperty('buttonsUserPre')) {
            for (var i = 0; i < $scope.options.buttonsUserPre.length; i++) {
              $scope.options.buttonsGridUserPre.push($scope.options.buttonsUserPre[i]);
            }
          }
        }
        if ($scope.options.showButtonsUserPost) {
          if ($scope.options.hasOwnProperty('buttonsUserPost')) {
            for (var i = 0; i < $scope.options.buttonsUserPost.length; i++) {
              $scope.options.buttonsGridUserPost.push($scope.options.buttonsUserPost[i]);
            }
          }
        }
        if ($scope.options.showButtonsCrudEditPre) {
          var button = {
              label: 'Editar',
              class: '',
              glyphicon: 'edit',
              button: false,
              onclick: function (row) {
                $scope.edit(row);
              }
            };
          if ($scope.options.hasOwnProperty('crudListeners')) {
            if ($scope.options.crudListeners.hasOwnProperty('hiddenButtonEditPre') && typeof $scope.options.crudListeners.hiddenButtonEditPre == 'function') {
              button.hidden = $scope.options.crudListeners.hiddenButtonEditPre;
            }
          }
          $scope.options.buttonsGridUserPre.push(button);
        }
        ;
        if ($scope.options.showButtonsCrudDeletePre) {
          var button = {
              label: 'Eliminar',
              class: '',
              glyphicon: 'trash',
              button: false,
              onclick: function (row) {
                $scope.selectedRowForDelete = row;
                $scope.keyRowForDelete = row[$scope.options.fieldKey];
                $scope.options.showOverlayCrudFormDelete = true;
              }
            };
          if ($scope.options.hasOwnProperty('crudListeners')) {
            if ($scope.options.crudListeners.hasOwnProperty('hiddenButtonDeletePre') && typeof $scope.options.crudListeners.hiddenButtonDeletePre == 'function') {
              button.hidden = $scope.options.crudListeners.hiddenButtonDeletePre;
            }
          }
          $scope.options.buttonsGridUserPre.push(button);
        }
        ;
        if ($scope.options.showButtonsCrudEditPost) {
          var button = {
              label: 'Editar',
              class: '',
              glyphicon: 'edit',
              button: false,
              onclick: function (row) {
                $scope.edit(row);
              }
            };
          if ($scope.options.hasOwnProperty('crudListeners')) {
            if ($scope.options.crudListeners.hasOwnProperty('hiddenButtonEditPost') && typeof $scope.options.crudListeners.hiddenButtonEditPost == 'function') {
              button.hidden = $scope.options.crudListeners.hiddenButtonEditPost;
            }
          }
          $scope.options.buttonsGridUserPost.push(button);
        }
        if ($scope.options.showButtonsCrudDeletePost) {
          var button = {
              label: 'Eliminar',
              class: '',
              glyphicon: 'trash',
              button: false,
              onclick: function (row) {
                $scope.selectedRowForDelete = row;
                $scope.keyRowForDelete = row[$scope.options.fieldKey];
                $scope.options.showOverlayCrudFormDelete = true;
              }
            };
          if ($scope.options.hasOwnProperty('crudListeners')) {
            if ($scope.options.crudListeners.hasOwnProperty('hiddenButtonDeletePost') && typeof $scope.options.crudListeners.hiddenButtonDeletePost == 'function') {
              button.hidden = $scope.options.crudListeners.hiddenButtonDeletePost;
            }
          }
          $scope.options.buttonsGridUserPost.push(button);
        }
        $scope.options.buttonsUserPre = $scope.options.buttonsGridUserPre;
        $scope.options.buttonsUserPost = $scope.options.buttonsGridUserPost;
        $scope.options.showOverlayLoading = false;
        $scope.startLoading = function () {
          $scope.options.gridControl.showOverlayLoading(true);
        };
        $scope.finishLoading = function () {
          $scope.options.gridControl.showOverlayLoading(false);
        };
        $scope.api = null;
        //$scope.apiCount=null;
        /*if((typeof $scope.ngModel==='undefined') && $scope.options.crudUri!==''){
            		$scope.api=dataFactory($scope.options.crudUri);
					//$scope.apiCount=dataFactory($scope.options.crudUriCount);
            	};
				*/
        if (typeof $scope.options.crudUri !== 'undefined' && $scope.options.crudUri !== '') {
          $scope.api = dataFactoryCrud($scope.options.crudUri, typeof $scope.options.actions !== 'undefined' ? $scope.options.actions : '');
        }
        ;
        /**
            	 * internal functions form crud
            	 */
        function getOid(row) {
          var vid = row[$scope.options.fieldKey];
          var oId = {};
          oId['id'] = vid;
          //agm88x: 10-04-2015 añadir mecanismo de transformParams
          if ($scope.options.hasOwnProperty('crudListeners') && typeof $scope.options.crudListeners.transformParams == 'function') {
            oId = $scope.options.crudListeners.transformParams(row);
          }
          return oId;
        }
        /**
            	 * operation form crud
            	 */
        $scope.options.formListeners = {
          onsave: function (data) {
            if ($scope.options.hasOwnProperty('crudListeners')) {
              if ($scope.options.crudListeners.hasOwnProperty('onBeforeSave') && typeof $scope.options.crudListeners.onBeforeSave == 'function') {
                data = $scope.options.crudListeners.onBeforeSave(data);
              }
            }
            if ($scope.options.hasOwnProperty('crudListeners')) {
              if ($scope.options.crudListeners.hasOwnProperty('addValueToForm') && typeof $scope.options.crudListeners.addValueToForm == 'function') {
                data = $scope.options.crudListeners.addValueToForm(data);
              }
            }
            console.log('grid form onsave()' + angular.toJson(data));
            $scope.save(data);
          },
          oncancel: function () {
            if ($scope.options.hasOwnProperty('crudListeners')) {
              if ($scope.options.crudListeners.hasOwnProperty('onBeforeCancel') && typeof $scope.options.crudListeners.onBeforeCancel == 'function') {
                $scope.options.crudListeners.onBeforeCancel();
              }
            }
            $scope.cancel();
          }
        };
        $scope.cancel = function () {
          $log.log('click cancel');
          $scope.mode = 'list';
          if ($scope.options.hasOwnProperty('crudListeners')) {
            if ($scope.options.crudListeners.hasOwnProperty('onAfterCancel') && typeof $scope.options.crudListeners.onAfterCancel == 'function') {
              $scope.options.crudListeners.onAfterCancel();
            }
          }
          $scope.showForm = false;
        };
        $scope.edit = function (row) {
          console.log('Edit row:', row);
          $scope.mode = 'edit';
          $scope.showForm = true;
          //adjust disabled property for edit
          for (var i = 0; i < $scope.options.formFields.tabs.length; i++) {
            for (var j = 0; j < $scope.options.formFields.tabs[i].fieldSets.length; j++) {
              for (var k = 0; k < $scope.options.formFields.tabs[i].fieldSets[j].fields.length; k++) {
                if ($scope.options.formFields.tabs[i].fieldSets[j].fields[k].hasOwnProperty('disabledEdit') && $scope.options.formFields.tabs[i].fieldSets[j].fields[k].disabled != '') {
                  $scope.options.formFields.tabs[i].fieldSets[j].fields[k].disabledTmp = $scope.options.formFields.tabs[i].fieldSets[j].fields[k].disabled;
                  $scope.options.formFields.tabs[i].fieldSets[j].fields[k].disabled = $scope.options.formFields.tabs[i].fieldSets[j].fields[k].disabledEdit;
                }
                if ($scope.options.formFields.tabs[i].fieldSets[j].fields[k].hasOwnProperty('readonlyEdit') && $scope.options.formFields.tabs[i].fieldSets[j].fields[k].readonly != '') {
                  $scope.options.formFields.tabs[i].fieldSets[j].fields[k].readonlyTmp = $scope.options.formFields.tabs[i].fieldSets[j].fields[k].readonly;
                  $scope.options.formFields.tabs[i].fieldSets[j].fields[k].readonly = $scope.options.formFields.tabs[i].fieldSets[j].fields[k].readonlyEdit;
                }
              }
            }
          }
          if ($scope.options.formControl) {
            $scope.options.formControl.showOverlayLoading(true);
          }
          var oId = getOid(row);
          if ($scope.options.hasOwnProperty('crudListeners')) {
            if ($scope.options.crudListeners.hasOwnProperty('onBeforeButtonEditCrud') && typeof $scope.options.crudListeners.onBeforeButtonEditCrud == 'function') {
              $scope.options.crudListeners.onBeforeButtonEditCrud(oId.id, row);
            }
          }
          $scope.api.get(oId, function (data) {
            $scope.options.formData = data;
            $scope.options.formFields.tabs[0].active = true;
            if ($scope.options.hasOwnProperty('crudListeners')) {
              if ($scope.options.crudListeners.hasOwnProperty('onAfterButtonEditCrud') && typeof $scope.options.crudListeners.onAfterButtonEditCrud == 'function') {
                $scope.options.crudListeners.onAfterButtonEditCrud(true, data);
              }
            }
            $scope.options.formControl.showOverlayLoading(false);
          }, function (error) {
            $scope.options.formControl.showOverlayLoading(false);
            if ($scope.options.hasOwnProperty('crudListeners')) {
              if ($scope.options.crudListeners.hasOwnProperty('onAfterButtonEditCrud') && typeof $scope.options.crudListeners.onAfterButtonEditCrud == 'function') {
                $scope.options.crudListeners.onAfterButtonEditCrud(false);
              }
            }
            $scope.showForm = false;
            $scope.options.gridControl.showOverlayFormSuccessError('0', error.data, 20000);
          });
        };
        $scope.save = function (row) {
          if ($scope.mode == 'edit') {
            var oId = getOid(row);
            $scope.api.update(oId, row, function (data) {
              if ($scope.options.hasOwnProperty('crudListeners')) {
                if ($scope.options.crudListeners.hasOwnProperty('onAfterSave') && typeof $scope.options.crudListeners.onAfterSave == 'function') {
                  $scope.options.crudListeners.onAfterSave(data);
                }
              }
              $scope.options.gridControl.refresh();
            }, function (data) {
              if ($scope.options.hasOwnProperty('crudListeners')) {
                if ($scope.options.crudListeners.hasOwnProperty('onAfterSave') && typeof $scope.options.crudListeners.onAfterSave == 'function') {
                  $scope.options.crudListeners.onAfterSave(data);
                }
              }
              $scope.options.gridControl.showOverlayFormSuccessError('0', data.data, 20000);
            });
          } else if ($scope.mode == 'new') {
            $log.log('click save row:' + angular.toJson(row));
            $scope.api.insert(row, function (data) {
              if ($scope.options.hasOwnProperty('crudListeners')) {
                if ($scope.options.crudListeners.hasOwnProperty('onAfterSave') && typeof $scope.options.crudListeners.onAfterSave == 'function') {
                  $scope.options.crudListeners.onAfterSave(data);
                }
              }
              $scope.options.gridControl.refresh();
            }, function (data) {
              if ($scope.options.hasOwnProperty('crudListeners')) {
                if ($scope.options.crudListeners.hasOwnProperty('onAfterSave') && typeof $scope.options.crudListeners.onAfterSave == 'function') {
                  $scope.options.crudListeners.onAfterSave(data);
                }
              }
              $scope.options.gridControl.showOverlayFormSuccessError('0', data.data, 20000);
            });
          }
          $scope.mode = 'list';
          $scope.showForm = false;
        };
        $scope.remove = function (row) {
          var oId = getOid(row);
          if ($scope.options.hasOwnProperty('crudListeners')) {
            if ($scope.options.crudListeners.hasOwnProperty('onBeforeButtonDeleteCrud') && typeof $scope.options.crudListeners.onBeforeButtonDeleteCrud == 'function') {
              $scope.options.crudListeners.onBeforeButtonDeleteCrud(oId.id, row);
            }
          }
          $scope.api.remove(oId, function (data) {
            if ($scope.options.hasOwnProperty('crudListeners')) {
              if ($scope.options.crudListeners.hasOwnProperty('onAfterButtonDeleteCrud') && typeof $scope.options.crudListeners.onAfterButtonDeleteCrud == 'function') {
                $scope.options.crudListeners.onAfterButtonDeleteCrud(true);
              }
            }
            $scope.options.gridControl.refresh();
          }, function (error) {
            if ($scope.options.hasOwnProperty('crudListeners')) {
              if ($scope.options.crudListeners.hasOwnProperty('onAfterButtonDeleteCrud') && typeof $scope.options.crudListeners.onAfterButtonDeleteCrud == 'function') {
                $scope.options.crudListeners.onAfterButtonDeleteCrud(false);
              }
            }
            $scope.options.gridControl.showOverlayFormSuccessError('0', error.data, 20000);
          });
        };
        $scope.add = function () {
          $log.log('click new');
          $scope.mode = 'new';
          setTimeout(function () {
            $scope.options.formControl.selectTab(0);
          });
          $scope.showForm = true;
          for (key in $scope.options.formData) {
            $scope.options.formData[key] = '';
          }
          for (var i = 0; i < $scope.options.formFields.tabs.length; i++) {
            for (var j = 0; j < $scope.options.formFields.tabs[i].fieldSets.length; j++) {
              for (var k = 0; k < $scope.options.formFields.tabs[i].fieldSets[j].fields.length; k++) {
                var key = $scope.options.formFields.tabs[i].fieldSets[j].fields[k].key;
                var type = $scope.options.formFields.tabs[i].fieldSets[j].fields[k].type;
                var defaultValue = $scope.options.formFields.tabs[i].fieldSets[j].fields[k].default;
                //asign default value if exist
                if (defaultValue) {
                  $scope.options.formData[key] = defaultValue;
                } else {
                  if (type == 'ckeckbox') {
                    $scope.options.formData[key] = 'N';
                  } else {
                    $scope.options.formData[key] = '';
                  }
                }
                //adjust disabled property for new
                if ($scope.options.formFields.tabs[i].fieldSets[j].fields[k].hasOwnProperty('disabledTmp')) {
                  $scope.options.formFields.tabs[i].fieldSets[j].fields[k].disabled = $scope.options.formFields.tabs[i].fieldSets[j].fields[k].disabledTmp;
                }
              }
            }
          }
          if (typeof $scope.options.fieldFk != 'undefined' && typeof $scope.options.valueFk != 'undefined') {
            $scope.options.formData[$scope.options.fieldFk] = $scope.options.valueFk;
          }
          if (typeof $scope.options.crudListeners != undefined && $scope.options.crudListeners.hasOwnProperty('onButtonNew') && typeof $scope.options.crudListeners.onButtonNew == 'function') {
            var formData = $scope.options.crudListeners.onButtonNew($scope.options.formData);
            setTimeout(function () {
              $scope.$apply(function () {
                $scope.options.formData = formData;
              });
            });
          }
        };
        $scope.formDeleteContinue = function () {
          $scope.remove($scope.selectedRowForDelete);
          $scope.options.showOverlayCrudFormDelete = false;
        };
        $scope.formDeleteCancel = function () {
          $scope.options.showOverlayCrudFormDelete = false;
        };
      }
    ]
  };
});
angular.module('edu-crud.tpl').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('directives/edu-crud.tpl.html', '<div><div ng-if=!options><h4>Options are required</h4></div><div class=box ng-if=options><div ng-hide=showForm><div class=panel-body><div edu-grid options=options></div></div></div><div ng-if=showForm><div class=panel-body><div><div edu-form result=options.formData options=options></div></div></div></div><div name=overlay class=overlay-edu-crud ng-show=options.showOverlayCrudFormDelete><div class=centrado-edu-crud><div class="panel panel-info"><div class=panel-heading><div class=row><div class=col-md-12><h4>{{options.snippets.formDeleteTitle || \'Por favor confirme\'}}</h4></div></div></div><div class=panel-body><h4>{{options.snippets.formDeleteMessage || \'\xbfEst\xe1 seguro que quiere ELIMINAR el registro\'}} {{keyRowForDelete}} ?</h4></div><div class=panel-footer><div class=row><div class="col-md-offset-6 col-md-6"><button ng-click=formDeleteContinue() class="btn btn-sm btn-primary">{{options.snippets.formDeleteButtonContinue || \'Continuar\'}}</button> <button ng-click=formDeleteCancel() class="btn btn-sm">{{options.snippets.formDeleteButtonCancel || \'Cancelar\'}}</button></div></div></div></div></div></div></div></div>');
  }
]);