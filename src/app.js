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
			},
			onPageLoadComplete:function(rows){
				
				for(var i=0;i<rows.length;i++){
					if(i%2==0){
						rows[i].$styles={'background':'green'};
					}else{
						rows[i].$styles={'background':'red'};
					}
				}
            	//console.log('onPageLoadComplete rows:'+angular.toJson(rows));
            }
	     },
		crudListeners: {
			onBeforeSaveValidation:function(data){
				if(data.vcodcen!='XXX'){
					return true;
				}else{
					alert('Código de centro erróneo');
					return false;
					
				}
				
			},
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
													  {key: 'vcodcen',type: 'text',col:'col-md-2',label: 'Código',placeholder: 'Código',autofocus:'false',required: true,disabledEdit:false, readonlyEdit:false },
													  
													  
													  {key: 'ckeckbox',type: 'checkbox',inputSizeClass:"input-lg",col:'col-md-4',label: 'Checkbox',placeholder: 'Checkbox',autofocus:'',required: false,default:'S',disabledEdit:true },
													 
													  {key: 'vdencen',type: 'text',col:'col-md-6',label: 'Denominación',placeholder: 'Denominación',autofocus:'',required: true,default:'HOLA',
															fieldListeners:{
																onChange:function(value){
																 $scope.options.formAvancedSearch.fields[0].value="gato";	
																 var a=$scope.options.formAvancedSearchResult["vcodcen"]="gato";
																} 
															}
													   },
													   {key: 'grid',type: 'grid',height:'180',col:'col-md-6',label: 'Grid1',readonly:false,
														fieldKey:'vcodcen',
														uri:'api\/v1\/instalaciones/:id',
														fieldFk:'codcen',
														valueFk:'',
														//gridRows:itemsG,
														listFields:[
																	{label: 'Código', column: 'codigo', weight: '20',type:'text'},
																	 {label: 'Descripción', column: 'descripcion', weight: '60',type:'text'},
																	 {label: 'Localidad', column: 'vloccen', weight: '20',type:'select',options:[
																																					{value:'ABANILLA',descripcion:'Abanilla'},
																																					{value:'CARAVACA DE LA CRUZ',descripcion:'Caravaca de la Cruz'},
																																					{value:'CEHEGIN',descripcion:'Cehegín'},
																																					{value:'LORCA',descripcion:'Lorca'},
																																					{value:'CARTAGENA',descripcion:'Cartagena'},
																																					{value:'CIEZA',descripcion:'Cieza'},
																																					{value:'JUMILLA',descripcion:'Jumilla'},
																																					{value:'TOTANA',descripcion:'Totana'},
																	 ]}
																]
													   },
													   {key: 'vdomcen',type: 'text',col:'col-md-6',lines: 5,label:'Domicilio',placeholder: 'Domicilio',autofocus:'',required: true}, 
													  {key: 'fecha',type: 'date',col:'col-md-6',label:'Fecha',placeholder: 'fecha',autofocus:'',required: true,disabled:false}
													  
													  
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
		formButtonsUser:[
			{ 
				disabled:false,
				state:'default',
				label:'botón 0',
				glyphicon:'pencil',
				iconPath:'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',
				onClick:function(){
					console.log("on click button 0");
				}
			},
			{ 
				disabled:false,
				state:'info',
				label:'botón 1',
				glyphicon:'euro',
				onClick:function(){
					console.log("on click button 1");
				}
			},
			{
				disabled:false,
				state:'primary',
				label:'botón 2',
				glyphicon:'user',
				onClick:function(){
					console.log("on click button 2");
				}
			},
			{
				disabled:false,
				state:'warning',
				label:'botón 3',
				glyphicon:'search',
				onClick:function(){
					console.log("on click button 3");
				}
			},
			{
				disabled:true,
				state:'danger',
				label:'botón 4',
				glyphicon:'time',
				onClick:function(){
					console.log("on click button 4");
				}
			}
		
		],
		

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

