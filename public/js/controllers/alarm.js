'use strict';

angular.module('SmartAlarm')
  .controller('alarmCtrl', function ($scope, $http, $rootScope,$interval,$route, DB_queries, fbLogin) {
    console.log("alarm controller",$scope.user)
    $scope.todayAlarm='';
    $scope.timeToWakeup = new Date();
    $scope.timeNow = new Date();

    
    $interval(function(){
        $scope.timeNow = new Date();
       
    },10000);



   /*
    $scope.init = function () {
    	$scope.todayAlarm = $scope.user.alarms[$scope.timeToWakeup.getDay()];
      console.log($scope.todayAlarm)
    }

    
    $scope.init();*/

  });
