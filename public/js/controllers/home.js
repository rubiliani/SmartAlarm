'use strict';

angular.module('SmartAlarm')
  .controller('homeCtrl', function ($scope, $http,$location, $rootScope,$interval,$route, DB_queries, fbLogin,alarm_manager) {
    console.log("home controller",$scope.user)
    $scope.todayAlarm='';
    $scope.timeToWakeup = new Date();
    $scope.timeNow = new Date();

    $scope.swipeLeft = function(){

    }

     $scope.swipeRight = function(){
      
    }
    
    $interval(function(){
        $scope.timeNow = new Date();
       
    },10000);
   
    $scope.init = function () {
      if(!$scope.user)
        return;
      if($scope.user.alarms.length==0){
        //
        $scope.user.alarms = [
            {
                  "day": "Sunday",
                  "timeToArrive": "07:30",
                  "timeToWakeUp": "07:30"
              },
              {
                  "day": "Monday",
                  "timeToArrive": "07:30",
                  "timeToWakeUp": "07:30"
              },
              {
                  "day": "Tuesday",
                  "timeToArrive": "07:30",
                  "timeToWakeUp": "07:30"
              },
              {
                  "day": "Wednesday",
                  "timeToArrive": "07:30",
                  "timeToWakeUp": "07:30"
              },
              {
                  "day": "Thursday",
                  "timeToArrive": "07:30",
                  "timeToWakeUp": "07:30"
              },
              {
                  "day": "Friday",
                  "timeToArrive": "07:30",
                  "timeToWakeUp": "07:30"
              },
              {
                  "day": "Saturday",
                  "timeToArrive": "07:30",
                  "timeToWakeUp": "07:30"
              }
          ];

          DB_queries.updateUser($scope.user).then(function(user){
               console.log('update new user',user);
               $rootScope.user=user;
           })
      }
    	$scope.todayAlarm = $scope.user.alarms[$scope.timeToWakeup.getDay()];
      console.log($scope.todayAlarm);
      alarm_manager.calculateAlarm($scope.todayAlarm);

    }

    
    $scope.init();

    $scope.setAlarmPage = function(){
      $location.url( "/setalarm" );
    }

    $scope.disconnect = function(){
      fbLogin.logout();
    }

     $scope.settingsPage = function(){
        $location.url( "/settings" );
     }

  });
