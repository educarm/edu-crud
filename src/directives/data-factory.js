
eduCrudServices.factory('dataFactoryCrud', [ '$resource', function ( $resource) {
    return function (uri,actions) {
	    var defActions={
						getAll: {method:'GET', params:{}, withCredentials: true, isArray:true},
						getCount: {method:'GET', url: uri + '/count', params:{}, withCredentials: true, isArray:false},
						get: {method:'GET', params:{}, withCredentials: true, isArray:false},
						insert: {method:'POST', params:{}, withCredentials: true, isArray:false},
						update: {method:'PUT', params:{}, withCredentials: true, isArray:false},
						remove: {method:'DELETE', params:{}, withCredentials: true, isArray:false}
					};
		if (typeof actions!=='undefined' && actions!==''){
			for(keyAction in actions){
				for(keyDefAction in defActions){
					if(keyAction==keyDefAction){
						defActions[keyDefAction]=actions[keyAction];
					}
				}
			}
		}
    	return $resource(	uri ,
							{}, 
							defActions
		);        
    };
}]);





