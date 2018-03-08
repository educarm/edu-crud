'use strict';
// Angular Init
var app = angular.module('app', [
	'eduCrud'
]);

app.controller('appController', ['$scope','$http','dataFactoryCrud', function ($scope,$http,dataFactoryCrud) {

     $scope.resultado={};

     $scope.field={key: 'vcodcen',type: 'date',col:'col-md-6',label: 'Código',placeholder: 'Denominación',autofocus:'',required: true }
										
	
	
	
	$scope.ciudades=[
																							{   value:'ABANILLA',
																								name: 'Abanilla2'
							
																							}, {
																								value:'MURCIA',
																								name: 'Murcia2'
							
																							}, {
																								value:'ABARÁN',
																								name: 'Abarán2'
																							}
				];
				
	$scope.municipios=[
{
	"value":"ABANILLA",
	"name": "Abanilla",
	"group":"grupo1x"	
},{
	"value":"ABARAN",
	"name": "Abarán2",
	"group":"grupo1x"	
},{
	"value":"MURCIA",
	"name": "Murcia",
	"group":"grupo1x"	
},{
	"value":"CARTAGENA",
	"name": "Cartagena",
	"group":"grupo1x"	
},{
	"value":"ALCANTARILLA",
	"name": "Alcantarilla",
	"group":"grupo2x"	
},
{
	"value":"ABUDEITE",
	"name": "Albudeite",
	"group":"grupo2x"	
}
]			
				
	$scope.userFieldsFormCrud=[	  
					{key: 'campo1',type: 'text',min:100,max:20000,col:'col-md-6',label: 'Código',placeholder: 'Código',autofocus:'autofocus',required: true },
					{key: 'campo2',type: 'text',min:100,max:20000,col:'col-md-6',label: 'Código',placeholder: 'Código',autofocus:'autofocus',required: true },
					{key: 'campo3',type: 'text',min:100,max:20000,col:'col-md-12',label: 'Código',placeholder: 'Código',autofocus:'autofocus',required: true }
				];
	$scope.avancedSearchFieldsFormGrid=[	  
			        {key: 'vdencen',type: 'text',col:'col-md-6',label: 'Fecha inicio22',placeholder: 'Denominación',autofocus:'',required: false },
					{key: 'vloccen',type: 'text',col:'col-md-6',label: 'Fecha fin3',placeholder: 'Municipio',autofocus:'',required: false },
					{key: 'vcodcen',type: 'text',col:'col-md-12',label: 'Tipo',placeholder: 'Código',autofocus:'',required: false,
						fieldListeners:{
							
							onKeypress:function(event){
								console.log("pulsada la tecla con código:"+event.keyCode);
								if(event.keyCode==13){
									$scope.options.gridControl.refresh(false);
									$scope.options.gridControl.showOverlayFormAvancedSearch(false);
								}
							} 
						}
					}
				];

	$scope.options = {
	    crudUri:'api/v1/centros/:id',
		fieldKey:'vcodcen',
		fieldKeyLabel:'código',
		height:'300',
		//showButtonsCrudPre:true,
		showAdvancedSearchInHeader:true,
		showAvancedSearch:true,
		showSelectRow:true,
		listFields: [
				{label: 'Código', column: 'vcodcen', weight: '10',type:'text'},
				{label: 'Denominación', column: 'vdencen', weight: '50',type:'text'},
				{label: 'Domicilio', column: 'vdomcen', weight: '20',type:'text'},
				{label: 'Localidad', column: 'vloccen', weight: '10',type:'text'},
				{label: 'Municipio', column: 'vmuncen', weight: '10',type:'text'}
			],
		metaData:{
		    
			limit:5,
			orderBy:'vcodcen',
			order:'asc'
		},
		listListeners: {
			onRowClick:function(row){
				console.log('click row:'+angular.toJson(row));
			}
	     },
		crudListeners: {
			hiddenButtonEditPre:function(row){
				//console.log('disabled button:', row);
				if(row.vcodcen=='30000018'){
					return true;
				}else{
					return false;
				}
				
			},
			hiddenButtonDeletePre:function(row){
				if(row.vcodcen=='30000146'){
					return true;
				}else{
					return false;
				}
				
			},
		      
			addValueToForm:function(data){
				// add needed fields or values to form
				
				console.log('datos :'+angular.toJson(data));
				return data;
			},
			
			
			
			onButtonNew:function (formData) {
				 console.log("onButtonNew");
				 formData.vdomcen='Calle las Mulas, Barqueros';
				 return formData;
				 //$scope.options.formFields.tabs[0].fieldSets[0].fields[0].disabled=true;
			},
			
			
			onBeforeButtonEditCrud:function (id) {
				 console.log("onBeforeButtonEditCrud id:"+id);
				 //$scope.options.formFields.tabs[0].fieldSets[0].fields[0].disabled=true;
			},
			onAfterButtonEditCrud:function (success) {
				console.log("onAfterButtonEditCrud success:"+success);
						
			},
			onBeforeButtonDeleteCrud:function (id,row) {
				console.log("onBeforeButtonDeleteCrud id:"+id);
			},	
			onAfterButtonDeleteCrud:function (success) {
				console.log("onAfterButtonDeleteCrud success:"+success);
			}
        },
		formMetaData:{
			tabsShow:true,
			fieldSetShow:true,
			name:"myFormName",
			id:"myFormId"
		},
		formFields:{
				tabs:[ 
							{	tabname:"Pestaña 1",
								active:true,
								fieldSets:[
										{ fieldSetName:"fieldSetName1",
										   fields:[	  
												//{key: 'vcodcen',type: 'text',min:2,max:20,col:'col-md-6',label: 'Código',placeholder: 'Código',autofocus:'autofocus',required: false }, 
													  {key: 'vcodcen',type: 'text',col:'col-md-2',label: 'Código',placeholder: 'Código',autofocus:'false',required: true,disabledEdit:false, readonlyEdit:true },
													  {key: 'ckeckbox',type: 'checkbox',inputSizeClass:"input-lg",col:'col-md-4',label: 'Checkbox',placeholder: 'Checkbox',autofocus:'',required: false,default:'S',disabledEdit:true },
													 
													  {key: 'vdencen',type: 'text',col:'col-md-6',label: 'Denominación',placeholder: 'Denominación',autofocus:'',required: true,default:'HOLA',
															fieldListeners:{
																onChange:function(value){
																 $scope.options.formAvancedSearch.fields[0].value="gato";	
																 var a=$scope.options.formAvancedSearchResult["vcodcen"]="gato";
																} 
															}
													   },
													   {key: 'vdomcen',type: 'text',col:'col-md-12',lines: 5,label:'Domicilio',placeholder: 'Domicilio',autofocus:'',required: true}, 
													  //{key: 'fecha',type: 'date',col:'col-md-12',label:'Fecha',placeholder: 'fecha',autofocus:'',required: true,disabled:false},
													  
													]
										}
										]
							},
							{ 	tabname:"Pestaña 2",
								active:false,
								fieldSets:[
										{ fieldSetName:"fieldSetName2",
											fields:[	 
												//{key: 'vmuncen',type: 'autocomplete',col:'col-md-2',label: 'Municipio autocomp local',autoclocaldata:$scope.municipios,autocurldata: 'api/v1/municipios?filter=',autocsearchfields:"name",autocminlength:3,autocfieldtitle:"name,group",autocfielddescription:"",autocfieldvalue:"value",autocpause:300},
												{key: 'vmuncen',type: 'autocomplete',col:'col-md-2',label: 'Municipio autocomp remote',autocurldata: 'api/v1/municipios?filter=',autocsearchfields:"name",autocminlength:3,autocfieldtitle:"name,group",autocfielddescription:"",autocfieldvalue:"value",autocpause:300},
																			   
											//{key: 'vmuncen',type: 'select',label: 'Municipio',selecttypesource:'array',selectsource: $scope.ciudades,optionname:"name",optionvalue:"value",selectconcatvaluename:true},
												//{key: 'vmuncen',type: 'select',label: 'Municipio',selecttypesource:'url',selectsource: 'json/ciudades.json',optionname:"namexxxx",optionvalue:"valuex",selectconcatvaluename:true},
												{key: 'vloccen',type: 'textarea',col:'col-md-12',rows: 15,label: 'Localidad',placeholder: 'Localidad',autofocus:'',required: true,disabledEdit:false, readonlyEdit:true	}
											]
										}
									]
							}
						]
		},

		buttonsUserPre: [
					{label: 'Ejecutar', class: '', glyphicon: 'flash', button: false, onclick: function (row) {
						console.log('ejecutar consulta:', row);
					}}
				
				],
		buttonsUserPost: [
					{label: 'Ejecutar', class: '', glyphicon: 'flash', button: false, onclick: function (row) {
						console.log('ejecutar consulta:', row);
					}}
				],
		formUser:{
			width:'800',
			fields:$scope.userFieldsFormCrud,
			events:{
					continue: function () {
						console.log('form User continue button:');
						$scope.options.crudControl.showOverlayFormUser(false);
					},
					cancel: function () {
						console.log('form User cancel button');
						$scope.options.crudControl.showOverlayFormUser(false);
					}
				},
			result:{}
		},
		formAvancedSearch:{
			width:'1200',
			fields:$scope.avancedSearchFieldsFormGrid
		}
		
	};
}])

