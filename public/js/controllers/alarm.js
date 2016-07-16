'use strict';

angular.module('SmartAlarm')
  .controller('alarmCtrl', function ($scope, $http, $rootScope,$interval,$route, DB_queries,geolocation, fbLogin,$window) {
    console.log("alarm controller",$scope.user)
    $scope.todayAlarm='';
    $scope.timeToWakeup = new Date();
    $scope.timeNow = new Date();
    $scope.location = '';
    $scope.times = ['00:00','00:30','01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30','05:00','05:30','06:00','06:30',
    '07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
    '15:00','15:30','16:00','16:30','17:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30'];

    
    $interval(function(){
        $scope.timeNow = new Date();
       
    },10000);

    $scope.close = function(){
      $window.history.back();
    }

     $scope.selectDay = function(day){
        $scope.todayAlarm = $scope.user.alarms[day];
    }
   
    $scope.init = function () {
    	$scope.todayAlarm = $scope.user.alarms[$scope.timeToWakeup.getDay()];
      console.log($scope.todayAlarm)
    }

    $scope.calculateDistance = function(){
        geolocation.getDistanceFromPosition($scope.user.hometown,$scope.todayAlarm.location);
    }

    $scope.saveAlarm = function(){
        $scope.calculateDistance();
    }
    
    $scope.init();

  });
