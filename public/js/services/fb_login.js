'use-strict';
/**
 * https://github.com/GoDisco/ngFacebook
 */
angular.module('SmartAlarm.services',['ngResource','ngRoute','ngStorage','ngFacebook'])
.config( function( $facebookProvider ) {
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

  	$facebookProvider.setAppId('502560759944685');
  	$facebookProvider.setPermissions("public_profile,email");
	$facebookProvider.setVersion("v2.6");
  	$facebookProvider.setCustomInit({
  		xfbml:true,
		cookie:true
	});

})
.service('fbLogin', function($http, $q, $rootScope, $localStorage, $location,$facebook, DB_queries){
	var isLoggedIn = false;

	var _routeStatus = function(){
		var deferred = $q.defer();
		if (isLoggedIn){
			deferred.resolve();
		}
		$facebook.getLoginStatus().then(function(response){
			console.log('get route status',response);
			if (response.status === "connected"){
				isLoggedIn=true;
				deferred.resolve(true);
			}
			else{
				isLoggedIn=false;
				deferred.reject(false);
			}
		})
		return deferred.promise;
	}

  	var getStatus = function(){
  		console.log("getStatus")
		var deferred = $q.defer();
		$facebook.getLoginStatus().then(function(response){
  			console.log('getLoginStatus',response);
	    	if (response.status === "connected"){
				$rootScope.status=true;
	    		getUserData().then(function(user){
					deferred.resolve(user);
				})
	    	}
			else{
				$rootScope.status=false;
				deferred.reject(false);
			}
  		})
		return deferred.promise;
  	}

  	function getUserData(){
		var deferred = $q.defer();
  		$facebook.api('/me?fields=id,email,name,picture.type(large){url}').then(
	      function(response) {
				console.log('api',response)
				isLoggedIn=true;
				$rootScope.status=true;
				$localStorage.userID=response.id;

				 
			  	console.log(response)
				$http.defaults.headers.common.uid = response.id;
				DB_queries.updateUser(response).then(function(user){
					console.log('user from the server - ',user)
					$rootScope.user=user;
					deferred.resolve(user);
				});

		      },
		      function(err) {
		        	console.log("Please log in");
				  	$rootScope.status=false;
				    deferred.reject(err);
	      });
		return deferred.promise;
  	}

	

  	var login = function(){
		var deferred = $q.defer();
  		console.log("login")
		$facebook.login().then(function(response){
			console.log('login',response);
			if (response.authResponse) {
				getUserData().then(function(user){
					deferred.resolve(user);
				})
		  	}
		},function(err){
			$rootScope.status=false;
			console.log('User cancelled login or did not fully authorize.');
			deferred.reject(err);
		})
		return deferred.promise;
  	}

  	var logout = function(){
		isLoggedIn=false;
  		$rootScope.status=false;
  		delete $localStorage.userID;
  		$facebook.logout().then(function(response){ });
  	}


  	return{
  		getStatus:getStatus,
  		login:login,
  		logout:logout,
		routeStatus:_routeStatus
  	}
})