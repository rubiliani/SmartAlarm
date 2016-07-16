'use strict';

angular.module('SmartAlarm')
  .controller('settingsCtrl', function ($scope, $http, $rootScope,$interval,$route,$window, DB_queries, fbLogin) {
    console.log("settings controller",$scope.user)
    $scope.todayAlarm='';
    $scope.timeToWakeup = new Date();
    $scope.timeNow = new Date();
   
    $scope.init = function () {
    	$scope.todayAlarm = $scope.user.alarms[$scope.timeToWakeup.getDay()];
      console.log($scope.todayAlarm)
    }

    $scope.close = function(){
      $window.history.back();
    }

    $scope.saveSettings = function(){
        DB_queries.updateUser($scope.user).then(function(user){
               console.log('update user',user);
               $rootScope.user=user;
           })
        
    }

    
    $scope.init();

  });
