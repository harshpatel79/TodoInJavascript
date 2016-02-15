myapp.factory('forms',['$http','$q',function($http,$q) {
	var credentials = {
            "site_api_key": "bltc4b6cf9e9af8e0d5",
            "authtoken": "blt4c1bba96f240c092b54bbdc2"
        };
    var urlPath= 'https://api.contentstack.io:443/v2/forms/harshaltodo/entries';
    var forms = {};
    forms.add =function(){
    	var addReq ={
    		method:'POST',
    		url:'https://api.contentstack.io/v2/forms',
    		headers:credentials,
    		contentType: 'application/json',
    		data:{
		          "form": {
				    "title": "harshaltodo",
				    "uid": "harshaltodo",
				    "schema": [
				      {
				        "display_name": "Title",
				        "uid": "title",
				        "data_type": "text",
				        "field_metadata": {
				          "_default": true
				        },
				        "unique": "global",
				        "mandatory": true,
				        "multiple": false
				      },
				      {
				        "display_name": "URL",
				        "uid": "url",
				        "data_type": "text",
				        "field_metadata": {
				          "_default": true
				        },
				        "unique": null,
				        "mandatory": true,
				        "multiple": false
				      },
				      {
				        "display_name": "todoDescription",
				        "uid": "tododescription",
				        "data_type": "text",
				        "field_metadata": {
				          "_default": true
				        },
				        "unique": null,
				        "mandatory": true,
				        "multiple": false
				      }
				    ],
				    "options": {
				      "title": "title",
				      "publishable": true,
				      "is_page": true,
				      "description": "",
				      "sub_title": [
				        "url"
				      ]
				    }
				  }
    		}
    	};
    	$http(addReq).then(function successCallback(res){
    		console.log("form added");
    	},function errorCallback(err){
    		console.log(err);
    	});
    }
    forms.getentries =function(){
    	var deferred = $q.defer();
    	var addReq ={
    		method:'GET',
    		url:urlPath,
    		headers:credentials
    	};
    	$http(addReq).then(function successCallback(res){
    		deferred.resolve(res);
    	},function errorCallback(err){
    		console.log(err);
    	});
    	return deferred.promise;    
    }
    forms.postNewEnteries = function(todo){
    	var deferred = $q.defer();
    	var addReq ={
    		method:'POST',
    		url:urlPath,
    		headers:credentials,
    		contentType: 'application/json',
    		data:{
			  "entry": {
			    "title": todo.todoTitle,
			    "url": "/todo",
			    "tododescription": todo.todoText,
			    "status":false
			  }
			}
    	};
    	$http(addReq).then(function successCallback(res){
    		 deferred.resolve(res);
    	},function errorCallback(err){
    		console.log(err);
    	});
    	return deferred.promise; 
    }
    forms.completeEnteries = function(uid){
    	var deferred = $q.defer();
    	var addReq ={
    		method:'PUT',
    		url:urlPath+ '/'+uid,
    		headers:credentials,
    		contentType: 'application/json',
    		data:{
			  "entry": {
			    "status":true
			  }
			}
    	};
    	$http(addReq).then(function successCallback(res){
    		 deferred.resolve(res);
    	},function errorCallback(err){
    		console.log(err);
    	});
    	return deferred.promise; 
    }
    forms.editEnteries = function(todo){
    	var deferred = $q.defer();
    	var addReq ={
    		method:'PUT',
    		url:urlPath+ '/'+todo.uid,
    		headers:credentials,
    		contentType: 'application/json',
    		data:{
			  "entry": {
			    "title": todo.todoTitle,
			    "url": "/todo",
			    "tododescription": todo.todoText,
			    "status":false
			  }
			}
    	};
    	$http(addReq).then(function successCallback(res){
    		 deferred.resolve(res);
    	},function errorCallback(err){
    		console.log(err);
    	});
    	return deferred.promise; 
    }
    forms.deleteEnteries = function(uid){
    	var deferred = $q.defer();
    	var addReq ={
    		method:'DELETE',
    		url:urlPath+ '/'+uid,
    		headers:credentials,
    	};
    	$http(addReq).then(function successCallback(res){
    		 deferred.resolve(res);
    	},function errorCallback(err){
    		console.log(err);
    	});
    	return deferred.promise; 
    }
    return forms;
 }]);

