#edu-form
##Introducci&oacute;n
edu-form es un formulario de datos desarrollado en [AngularJS](http://angularjs.org/) que permite la creación de formularios.



##Dependencias
edu-form est&aacute; construido utilizando varias librer&iacute;as javascript:
    
- [AngularJS](http://angularjs.org/)
Framework utilizado para desarrollar el componente.
- [Bootstrap](http://getbootstrap.com/)
Framework en el que se basa el aspecto del grid.
- [Angular-resource](https://docs.angularjs.org/api/ngResource)
Una factoria que crea un recurso que permite interactuar con fuentes de datos RESTful.
- [jQuery](http://jquery.com/)
Dependencia de Bootstrap
- [Angular-sanitize](https://docs.angularjs.org/api/ngSanitize)
Módulo que provee las funcionalidades para sanitize HTML.

***

##Utilizaci&oacute;n
####Importar el c&oacute;digo
Lo primero que hay que hacer es importar en la p&aacute;gina los ficheros javascript que forman el componente

    <style href="edu-form.css"></style>
    
    <script src="edu-form.js"></script>
####options
Como se ha escrito previamente, uno de los objetivos de edu-field es permitir el uso del componente sin tener que desarrollar
ning&uacute;n tipo de c&oacute;digo javascript, el uso m&aacute;s simple posible ser&aacute; utilizar el tag html <div edu-form /> junto con las opciones
donde parametrizaremos el componente.

    <div edu-form options={ ....} />

####edu-form options
Lo ideal es indicar los parámetros utilizando para ello el atributo options que contendr&aacute; un objeto json con la lista de propiedades necesarias para la correcta configuración del componente:
##Options
    $scope.options = {
       formListeners: {
                    onsave: function (data) {
                        console.log('grid form onsave()'+angular.toJson(data));
                    },
                    oncancel: function () {
                        console.log('grid form oncancel()');
                    }
                },
		
		formMetaData:{
		              tabsShow:true,
					  fieldSetShow:true,
		              name:"myFormName",
					  id:"myFormId"
		},
		formFields:{  tabsShow:true,
		              tabs:[ 
					        { tabname:"Pestaña 1",
							  active:true,
							  fieldSets:[
										{
										   fieldSetName:"fieldname1",
										   fields:[	  
													{key: 'oculto',type: 'hidden',value:"campo oculto",name:"nombre",id:"id" },
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
		},
        snippets: {
            showingItems: 'Filas',
            of: 'de',
            itemsPerPage: 'Filas por página:',
            search: 'Buscar:',
			buttonNew: 'Nuevo',
            buttonChangeItemsPerPage: 'Filas por página',
            buttonSearch: 'Buscar',
			
			formDeleteMessage:'¿Está seguro que quiere ELIMINAR el registro',
			formDeleteTitle:'Por favor confirme',
			formDeleteButtonCancel:'Cancelar',
			formDeleteButtonContinue:'Continuar',
			
			formUserMessage:'',
			formUserTitle:'Párametros de la consulta',
			formUserButtonCancel:'Cancelar',
			formUserButtonContinue:'Continuar'
        }
    }




      
##Desarrollo
    # Clone this repo (or your fork).
    git clone https://github.com/educarm/edu-form.git
    cd edu-form
    
    # Install all the dev dependencies
    $ npm install
    # Install bower components
    $ bower install
    
    # run the local server and the file watcher
    $ grunt dev

##Distribución

    # Build component
    $ grunt build

##Demo
[edu-form demo](https://raw.githack.com/educarm/edu-form/master/src/demo-dev.html)
