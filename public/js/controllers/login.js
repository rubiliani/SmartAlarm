'use strict';

angular.module('SmartAlarm')
.controller('loginCtrl', function($scope, $http, $rootScope, $location, fbLogin) {
	console.log('login controller')
	 $scope.timeNow = new Date();
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



    $scope.isNight = function(){
      var currentHours = $scope.timeNow.getHours();
      if(currentHours>18 || currentHours<6){
          return true;
          
      }
      return false;
      }
});
