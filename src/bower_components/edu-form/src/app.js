'use strict';
// Angular Init
var app = angular.module('app', [
	'eduForm'
]);

app.controller('appController', ['$scope','$http', function ($scope,$http) {
   //$scope.formData={};										
	
	
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
				
	

    $scope.options2 = {
	   heading:"Prueba",
       formListeners: {
                    onsave: function (data) {
                        console.log('form onsave()'+angular.toJson(data));
						
                    },
                    oncancel: function () {
                        console.log('form oncancel()');
						
                    }
                },
		
		formMetaData:{
		              tabsShow:true,
					  buttonsShow:true,
					  headerShow:true,
					  panelType:"info",
					  footerShow:true,
					  fieldSetShow:true,
		              name:"myFormName",
					  id:"myFormId"
		},
		formFields:{  
		              tabs:[ 
					        { tabname:"Pestaña 1",
							  active:true,
							  fieldSets:[
										{
										   fieldSetName:"fieldname1",
										   fields:[	  
													{key: 'oculto',type: 'hidden',value:"campo oculto",name:"nombre",id:"id" },
													{key: 'upload',type: 'upload',multiple:true,url:"/api/v1/upload",col:'col-md-12',label: 'Subida fichero',placeholder: 'Upload',autofocus:'',required: false },
													{key: 'texto',type: 'text',col:'col-md-4',label: 'Texto',placeholder: 'Texto',autofocus:'',required: true },
													{key: 'numero',type: 'number',col:'col-md-4',label: 'Número',placeholder: 'Número',autofocus:'',required: true },
													{key: 'email',type: 'email',col:'col-md-4',label: 'Email',placeholder: 'Email',autofocus:'',required: true },
													{key: 'url',type: 'url',col:'col-md-4',label: 'Url',placeholder: 'Url',autofocus:'',required: true },
													{key: 'password',type: 'password',col:'col-md-4',label: 'Password',placeholder: 'Password',autofocus:'',required: true },	 
											]
										},
										{
										   fieldSetName:"fieldname2",
										   fields:[	  
													
													{key: 'ckeckbox',type: 'checkbox',col:'col-md-4',label: 'Checkbox',placeholder: 'Checkbox',autofocus:'',disabled:false,required: true },
													{key: 'radio',type: 'radio',col:'col-md-4',label: 'Radio',options:[{"name":"perro","value":"1"},{"name":"gato","value":"2"}],placeholder: 'Checkbox',autofocus:'',required: true },
													{key: 'rango',type: 'range',col:'col-md-4',label: 'Slider',min:100,max:500,placeholder: 'Slider',autofocus:'',required: true },
													  
											]
										}
									]
							 },
							 { tabname:"Pestaña 2",
							   active:false,
							   fieldSets:[
											{
											   fieldSetName:"fieldname3",
											   fields:[	 
														{key: 'fecha',type: 'date',col:'col-md-4',lines: 5,label:'Fecha',placeholder: 'Fecha',autofocus:'',required: true}, 
														{key: 'fechahora',type: 'date-time',col:'col-md-4',label:'Fecha Hora',placeholder: 'Fecha Hora',autofocus:'',required: true,disabled:false},					 
														{key: 'mes',type: 'month',col:'col-md-4',label: 'Fecha mes',placeholder: 'Fecha mes',autofocus:'',required: true },
														{key: 'semana',type: 'week',col:'col-md-4',label: 'Semana',placeholder: 'Semana',autofocus:'',required: true },
														{key: 'hora',type: 'time',col:'col-md-4',label: 'Hora',placeholder: 'Hora',autofocus:'',required: true },
														
														]
											 },
											 {
											   fieldSetName:"fieldname4",
											   fields:[	 
														
														{key: 'autocompletalocal',type: 'autocomplete',col:'col-md-4',label: 'Autocomplete datos locales',autoclocaldata:$scope.municipios,autocsearchfields:"name",autocminlength:3,autocfieldtitle:"value,name",autocfielddescription:"",autocfieldvalue:"value",autocpause:300},
														{key: 'autocompleteremoto',type: 'autocomplete',col:'col-md-4',label: 'Autocomplete datos remotos',autocurldata: 'api/v1/municipios?filter=',autocsearchfields:"name",autocminlength:3,autocfieldtitle:"value,name",autocfielddescription:"",autocfieldvalue:"value",autocpause:300},											   
														
														{key: 'selectlocal',type: 'select',col:'col-md-4',label: 'Select datos locales',selecttypesource:'array',selectsource: $scope.municipios,optionname:"name",optionvalue:"value",selectconcatvaluename:true},
														{key: 'selectremoto',type: 'select',col:'col-md-4',label: 'Select datos remotos',selecttypesource:'url',selectsource: 'api/v1/municipios',optionname:"name",optionvalue:"value",selectconcatvaluename:true},
														
														{key: 'areatexto',type: 'textarea',col:'col-md-4',rows: 5,label: 'Área de texto',placeholder: 'Área de texto',autofocus:'',required: true	},
														{key: 'areatextoedit',type: 'textedit',col:'col-md-4',rows: 5,label: 'Área de texto rico',placeholder: 'Área de texto rico',autofocus:'',required: true	}
											   ]
											 }
										]
							 }
							]
		}
    }
}])

