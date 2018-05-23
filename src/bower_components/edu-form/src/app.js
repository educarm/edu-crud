'use strict';
// Angular Init
var app = angular.module('app', [
	'eduForm'
]);

app.controller('appController', ['$scope','$http', function ($scope,$http) {
  $scope.required=function(b){
  var a=angular.copy($scope.options2.formFields.tabs[0].fieldSets[0].fields[2]);
  a.required=b;
  
	$scope.options2.formFields.tabs[0].fieldSets[0].fields.splice(2,1,a);
	
  }
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
						console.log('result object:'+$scope.formData);
						$scope.formData['texto']='kk';
						
						
                    },
                    oncancel: function () {
                        console.log('form oncancel()');
						$scope.options2.formData['texto']='kki';
						
                    },
                    onchange: function (result) {
                        console.log('form onchange()'+angular.toJson(result));
						
                    }
                },
		
		formMetaData:{
		              tabsShow:true,
					  buttonsShow:true,
					  headerShow:true,
					  inputsSize:'lg',
					  panelType:"info",
					  footerShow:true,
					  fieldSetShow:true,
		              name:"myFormName",
					  id:"myFormId",
					  showButtonSave:true
		},
		formFields:{  
		              tabs:[ 
					         { tabname:"tab1",
							  active:true,
							  fieldSets:[
										{
										   fieldSetName:"fieldname1",
										   fields:[	  
													//row one
													{key: 'selectlocal',type: 'select',inputSize:'md',col:'col-md-4',label: 'Select datos locales',selecttypesource:'array',selectsource: $scope.municipios,optionname:"name",optionvalue:"value",selectconcatvaluename:true},
													{key: 'ckeckbox',type: 'checkbox',inputSizeClass:"input-lg",col:'col-md-4',label: 'Checkbox',placeholder: 'Checkbox',autofocus:'',disabled:false,required: true,default:'N' },
													{key: 'ckeckbox',type: 'checkbox',inputSizeClass:"input-lg",col:'col-md-4',label: 'Checkbox',placeholder: 'Checkbox',autofocus:'',disabled:false,required: true,default:'N' },
													
													//row two
													{key: 'ckeckbox',type: 'checkbox',inputSize:'md',inputSizeClass:"input-lg",col:'col-md-4',label: 'Checkbox',placeholder: 'Checkbox',autofocus:'',disabled:false,required: true,default:'N' },
													{key: 'texto',type: 'text',inputSize:'md',col:'col-md-8',label: 'Texto',placeholder: 'Texto',autofocus:'',required: true },
													
													//row three
													{key: 'texto',type: 'text',inputSize:'md',col:'col-md-4',label: 'Texto',placeholder: 'Texto',autofocus:'',required: true },
													{key: 'texto',type: 'text',inputSize:'md',col:'col-md-4',label: 'Texto',placeholder: 'Texto',autofocus:'',required: true },
													{key: 'texto',type: 'text',inputSize:'md',col:'col-md-4',label: 'Texto',placeholder: 'Texto',autofocus:'',required: true },
													
													
													//row four
													{key: 'texto2',type: 'text',inputSize:'sm',col:'col-md-12',label: 'Texto',placeholder: 'Texto',autofocus:'',required: true },
                                                    
													//row five
													{key: 'FECHA_ESTADO',type: 'date',col:'col-md-12', label: 'Fecha Estado',placeholder: '',autofocus:'autofocus',required:false, disabled:true}													
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
														
														// {key: 'autocompletalocal',type: 'autocomplete',col:'col-md-4',label: 'Autocomplete datos locales',autoclocaldata:$scope.municipios,autocsearchfields:"name",autocminlength:3,autocfieldtitle:"value,name",autocfielddescription:"",autocfieldvalue:"value",autocpause:300},
														// {key: 'autocompleteremoto',type: 'autocomplete',col:'col-md-4',label: 'Autocomplete datos remotos',autocurldata: 'api/v1/municipios?filter=',autocsearchfields:"name",autocminlength:3,autocfieldtitle:"value,name",autocfielddescription:"",autocfieldvalue:"value",autocpause:300},											   
														
														// {key: 'selectlocal',type: 'select',col:'col-md-4',label: 'Select datos locales',selecttypesource:'array',selectsource: $scope.municipios,optionname:"name",optionvalue:"value",selectconcatvaluename:true},
														// {key: 'selectremoto',type: 'select',col:'col-md-4',label: 'Select datos remotos',selecttypesource:'url',selectsource: 'api/v1/municipios',optionname:"name",optionvalue:"value",selectconcatvaluename:true},
														
														// {key: 'areatexto',type: 'textarea',col:'col-md-4',rows: 5,label: 'Área de texto',placeholder: 'Área de texto',autofocus:'',required: true	},
														// {key: 'areatextoedit',type: 'textedit',col:'col-md-4',rows: 5,label: 'Área de texto rico',placeholder: 'Área de texto rico',autofocus:'',required: true	}
											    ]
											  }
										 ]
							  }
							]
		}
    }
}])

