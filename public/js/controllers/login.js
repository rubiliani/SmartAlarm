'use strict';

angular.module('SmartAlarm')
.controller('loginCtrl', function($scope, $http, $rootScope, $location, fbLogin) {
	console.log('login controller')
	$scope.facebookLogin = function(){
		fbLogin.login().then(function(user){
			if (user.newUser){
				$location.url( "/home" );
			}
			else{
				$location.url( "/" );
			}
		});
	}
});
