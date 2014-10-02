
 eduCrudDirectives.directive('eduCrud', function () {
        return {
            restrict: "A",
            replace: true,
            transclude: false,
            scope: {
                ngModel: '=',
                options: '='
            },
            templateUrl:'directives/edu-crud.tpl.html',
            link: function ($scope,$filter) {
				if (!$scope.hasOwnProperty('options')) {
					throw new Error('options are required!');
				}
		     },
			 
			 
			// -------------------------------------------------- //           
			//    CONTROLLER
            // -------------------------------------------------- //
			
			
            controller: function ($scope,$log,dataFactoryCrud) {
				if (!$scope.hasOwnProperty('options')) {
                    throw new Error('options are required!');
				}
				
				// ---
                // DEFAULT OPTIONS
                // ---	
				
				$scope.options.heading=(typeof $scope.options.heading==='undefined'?'EduCrud':$scope.options.heading);
				$scope.options.showOverlayLoading=(typeof $scope.options.showOverlayLoading==='undefined'?false:$scope.options.showOverlayLoading);
				$scope.options.showOvelayFormDelete=(typeof $scope.options.showOvelayFormDelete==='undefined'?false:$scope.options.showOvelayFormDelete);
				$scope.options.showRefreshButton=(typeof $scope.options.showRefreshButton==='undefined'?true:$scope.options.showRefreshButton);
				$scope.options.showAddButtonTopLeft=(typeof $scope.options.showAddButtonTopLeft==='undefined'?true:$scope.options.showAddButtonTopLeft);
				// show elemEnts desing		
				$scope.options.showPagination=(typeof $scope.options.showPagination==='undefined'?true:$scope.options.showPagination);
				$scope.options.showItemsPerPage=(typeof $scope.options.showItemsPerPage==='undefined'?true:$scope.options.showItemsPerPage);
				$scope.options.showSearch=(typeof $scope.options.showSearch==='undefined'?true:$scope.options.showSearch);
				$scope.options.showAvancedSearch=(typeof $scope.options.showAvancedSearch==='undefined'?false:$scope.options.showAvancedSearch);
				$scope.options.showMetaData=(typeof $scope.options.showMetaData==='undefined'?true:$scope.options.showMetaData);
				$scope.options.paginationWidth=(typeof $scope.options.paginationWidth==='undefined'?3:$scope.options.paginationWidth);
				
				//buttons crud	pre	
				$scope.options.showButtonsCrudEditPre=(typeof $scope.options.showButtonsCrudEditPre==='undefined'?true:$scope.options.showButtonsCrudEditPre);
				$scope.options.showButtonsCrudDeletePre=(typeof $scope.options.showButtonsCrudDeletePre==='undefined'?true:$scope.options.showButtonsCrudDeletePre);
				//buttons crud post		
				$scope.options.showButtonsCrudEditPost=(typeof $scope.options.showButtonsCrudEditPost==='undefined'?false:$scope.options.showButtonsCrudEditPost);
				$scope.options.showButtonsCrudDeletePost=(typeof $scope.options.showButtonsCrudDeletePost==='undefined'?false:$scope.options.showButtonsCrudDeletePost);
				
				$scope.options.showRowNumber=(typeof $scope.options.showRowNumber==='undefined'?true:$scope.options.showRowNumber);
				$scope.options.showSelectRow=(typeof $scope.options.showSelectRow==='undefined'?false:$scope.options.showSelectRow);
				
				
				// default height
				//$scope.options.height=(typeof $scope.options.height==='undefined'?'300':$scope.options.height);
				
                if(typeof $scope.options.metaData!=='undefined'){
					$scope.options.metaData.limit=(typeof $scope.options.metaData.limit==='undefined'? 5:$scope.options.metaData.limit);
				}else{
					$scope.options.metaData={
						limit:5
					}
				}
			
			    // ---
				// SETUP
				// ---
				 
				//Backward compatibility
				if ($scope.options.hasOwnProperty('snippets') && $scope.options.snippets.hasOwnProperty('buttonNew')  ) {
                    $scope.options.snippets.buttonAdd=$scope.options.snippets.buttonNew;
                } 
				
				//Component control
				$scope.options.crudControl={};
				
                $scope.showForm=false;
				
				$scope.options.buttonsGridUserPre=[];
				$scope.options.buttonsGridUserPost=[];
				
				$scope.options.formData = {};
            	
            	$scope.formFieldsError = false;
            	$scope.formOptionsError = false;
				
				$scope.options.showButtonsGridUserPre=$scope.options.showButtonsCrudPre || $scope.options.showButtonsCrudEditPre ||$scope.options.showButtonsCrudDeletePre || $scope.options.showButtonsUserPre;
				$scope.options.showButtonsGridUserPost=$scope.options.showButtonsCrudPost || $scope.options.showButtonsCrudEditPost ||$scope.options.showButtonsCrudDeletePost || $scope.options.showButtonsUserPost;
				
				
				// ---
				// METHODS
				// ---
				
				
				 $scope.internalControl = $scope.options.crudControl || {};
			  
				  $scope.internalControl.refresh = function() {
					$scope.options.gridControl.refresh();  
				  }
				  $scope.internalControl.showOverlayLoading = function(bShow) {
					$scope.options.gridControl.showOverlayLoading(bShow);  
				  }
				  $scope.internalControl.showOverlayFormDelete = function(bShow) {
					$scope.options.showOverlayCrudFormDelete=bShow;  
				  }
				  $scope.internalControl.showOverlayFormUser = function(bShow) {
					$scope.options.gridControl.showOverlayFormUser(bShow);
				  }
				  
				  $scope.internalControl.clearForm = function() {
					$scope.options.formControl.clearForm();
				  }
				  
				  $scope.internalControl.selectTab = function(indexTab) {
					$scope.options.formControl.selectTab(indexTab);
				  }
				  
				  $scope.internalControl.showButtonsUserPre = function(bShow) {
					$scope.options.gridControl.showButtonsUserPre(bShow);  
				  }
				  $scope.internalControl.showButtonsUserPost = function(bShow) {
					$scope.options.gridControl.showButtonsUserPost(bShow);  
				  }
				  
				  $scope.internalControl.showButtonsCrudPre = function(bShow) {
					 console.log("showButtonsCrudPre"+bShow);
					$scope.options.showButtonsCrudEditPre=bShow;
					$scope.options.showButtonsCrudDeletePre=bShow;
				  }
				  $scope.internalControl.showButtonsCrudPost = function(bShow) {
					$scope.options.showButtonsCrudEditPost=bShow; 
					$scope.options.showButtonsCrudDeletePost=bShow;
				  }
				  
				  $scope.internalControl.showButtonsCrudEditPre = function(bShow) {
					console.log("showButtonsCrudPre"+bShow);
					$scope.options.showButtonsCrudEditPre=bShow; 
				  }
				  $scope.internalControl.showButtonsCrudEditPost = function(bShow) {
					$scope.options.showButtonsCrudEditPost=bShow;  
				  }
				  
				  $scope.internalControl.showButtonsCrudDeletePre = function(bShow) {
					console.log("showButtonsCrudPre"+bShow);
					$scope.options.showButtonsCrudDeletePre=bShow;
				  }
				  $scope.internalControl.showButtonsCrudDeletePost = function(bShow) {
					$scope.options.showButtonsCrudDeletePost=bShow;  
				  }
				 
				 
				 
				 
				if ($scope.options.hasOwnProperty('showButtonsCrudPre') ) {
					$scope.options.showButtonsCrudEditPre=$scope.options.showButtonsCrudPre;
					$scope.options.showButtonsCrudDeletePre=$scope.options.showButtonsCrudPre;
				}
				
				if ($scope.options.hasOwnProperty('showButtonsCrudPost') ) {
					$scope.options.showButtonsCrudEditPost=$scope.options.showButtonsCrudPost;
					$scope.options.showButtonsCrudDeletePost=$scope.options.showButtonsCrudPost;
				}
				
				if ($scope.options.hasOwnProperty('showAddButtonTopLeft')) {
                    $scope.options.showExtraButtonTopLeft=$scope.options.showAddButtonTopLeft;
                }
				if ($scope.options.hasOwnProperty('showAddButtonTopRight')) {
                    $scope.options.showExtraButtonTopRight=$scope.options.showAddButtonTopRight;
                }
				if ($scope.options.hasOwnProperty('snippets') && $scope.options.snippets.hasOwnProperty('buttonAdd')) {
                    $scope.options.snippets.extraButtonTop=$scope.options.snippets.buttonAdd;
                }
                $scope.options.listListeners.onExtraButtonClick=function(){
					console.log('click extra button:');
					$scope.add();
				}
				
				if($scope.options.showButtonsUserPre){
					if($scope.options.hasOwnProperty("buttonsUserPre")){
						for(var i=0;i<$scope.options.buttonsUserPre.length;i++){
							$scope.options.buttonsGridUserPre.push($scope.options.buttonsUserPre[i]);
						}
					}
			   }
			   
			   if($scope.options.showButtonsUserPost){
					if($scope.options.hasOwnProperty("buttonsUserPost")){
						for(var i=0;i<$scope.options.buttonsUserPost.length;i++){
							$scope.options.buttonsGridUserPost.push($scope.options.buttonsUserPost[i]);
						}
					}
			   }
			   if($scope.options.showButtonsCrudEditPre){
				
                	$scope.options.buttonsGridUserPre.push(
                             {label: 'Editar', class: '', glyphicon: 'edit', button: false, onclick: function (row) {
                                 $scope.edit(row);
                             }});
              };
				
				
				if($scope.options.showButtonsCrudDeletePre){
                    $scope.options.buttonsGridUserPre.push( {label: 'Eliminar', class: '', glyphicon: 'trash', button: false, onclick: function (row) {
								 $scope.selectedRowForDelete=row;
								 $scope.keyRowForDelete=$scope.options.fieldKeyLabel + ": "+ row[$scope.options.fieldKey]+ "?";
								 $scope.options.showOverlayCrudFormDelete=true;
                             }}
                         );
                };
				
                if($scope.options.showButtonsCrudEditPost){
                	$scope.options.buttonsGridUserPost.push(
                       {label: 'Editar', class: '', glyphicon: 'edit', button: false, onclick: function (row) {
                           $scope.edit(row);
                       }});
                }
				
				if($scope.options.showButtonsCrudDeletePost){
                    $scope.options.buttonsGridUserPost.push(  {label: 'Eliminar', class: '', glyphicon: 'trash', button: false, onclick: function (row) {
						   $scope.selectedRowForDelete=row;
						   $scope.keyRowForDelete=$scope.options.fieldKeyLabel + ": "+ row[$scope.options.fieldKey]+ "?";
						   $scope.options.showOverlayCrudFormDelete=true;
                       }}
                   );
                }
				$scope.options.buttonsUserPre=$scope.options.buttonsGridUserPre;
				$scope.options.buttonsUserPost=$scope.options.buttonsGridUserPost;
				

	
				$scope.options.showOverlayLoading=false;
				
				$scope.startLoading = function () {
                  $scope.options.gridControl.showOverlayLoading(true);
                };

                $scope.finishLoading = function () {
                  $scope.options.gridControl.showOverlayLoading(false);
               };
			
			
            	$scope.api=null;
            	//$scope.apiCount=null;
				
            	/*if((typeof $scope.ngModel==='undefined') && $scope.options.crudUri!==''){
            		$scope.api=dataFactory($scope.options.crudUri);
					//$scope.apiCount=dataFactory($scope.options.crudUriCount);
            	};
				*/
				if( typeof $scope.options.crudUri!=='undefined' && $scope.options.crudUri!==''){
					$scope.api=dataFactoryCrud($scope.options.crudUri,(typeof $scope.options.actions!=='undefined'?$scope.options.actions:''));
            	};
				
				
            	/**
            	 * operation form crud
            	 */
            	$scope.options.formListeners= {
                    onsave: function (data) {
                        console.log('grid form onsave()'+angular.toJson(data));
                        $scope.save(data);
                    },
                    oncancel: function () {
                        console.log('grid form oncancel()');
                        $scope.cancel();
                    }
                };
            	
            	
            	
            	$scope.cancel=function(){
                	$log.log("click cancel");
                	$scope.mode="list";
                	$scope.showForm=false;
                };
                
                $scope.edit=function(row){
                	   console.log('Edit row:', row);
                       var vid=row[$scope.options.fieldKey];
                       var oId={};
                       //oId[$scope.options.fieldKey]=vid;
					   oId['id']=vid;
                       $scope.api.get(oId,function (data) {					   
                   	    	$scope.options.formData=data;
							$scope.options.formFields.tabs[0].active=true;
                       });
                       $scope.mode="edit";
                       $scope.showForm=true;
                };
                          
                $scope.save=function(row){
                	if($scope.mode=="edit"){
                		var vid=row[$scope.options.fieldKey];
            	    	var oId={};
            	    	//oId[$scope.options.fieldKey]=vid;
						oId['id']=vid;
            	    	$scope.api.update(oId,row,function (data) {     
							$scope.options.gridControl.refresh();
            	        });
            	    	
                	}else if($scope.mode=="new"){
                		$log.log("click save row:"+  angular.toJson(row));
            	    	$scope.api.insert(row,function (data) {     
							$scope.options.gridControl.refresh();
            	        });
                	}
                	$scope.mode="list";
                	$scope.showForm=false;
                };
                
                $scope.remove=function(row){
                	var vid=row[$scope.options.fieldKey];
                	var oId={};
                	//oId[$scope.options.fieldKey]=vid;
					oId['id']=vid;
                	$scope.api.remove(oId,function (data) {     
                	    $scope.options.gridControl.refresh();  
                    });
                	
                };
                $scope.add=function(){
                	$log.log("click new");
                	$scope.mode="new"
					$scope.options.formControl.selectTab(0);
                	$scope.showForm=true;
                	for(key in $scope.options.formData){
                		$scope.options.formData[key]="";
                	}
                };
                
				$scope.formDeleteContinue=function(){
				    $scope.remove( $scope.selectedRowForDelete);
					$scope.options.showOverlayCrudFormDelete=false;
				}
				$scope.formDeleteCancel=function(){
					$scope.options.showOverlayCrudFormDelete=false;
				}
				
			   
            }
        };
    });