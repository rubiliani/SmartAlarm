'use strict';

angular.module('SmartAlarm')
  .controller('homeCtrl', function ($scope, $http,$location, $rootScope,$interval,$route, DB_queries, fbLogin,alarm_manager) {
    console.log("home controller",$scope.user)
    $scope.todayAlarm='';
    $scope.timeToWakeup = new Date();
    $scope.timeNow = new Date();

    $scope.nextAlarm='';
  

    $rootScope.currentAlarm = '';
    $rootScope.nightmode = true;

    
    $scope.swipeLeft = function(){

    }

     $scope.swipeRight = function(){
      
    }
      

    $scope.isActive = function(day){
      var active = ($scope.timeNow === $scope.todayAlarm.dayIndex);
      return active;
    }

    $scope.isNight = function(){
      var currentHours = $scope.timeNow.getHours();
      if(currentHours>18 || currentHours<6){
          return true;
          
      }
      return false;
      }
    


    $scope.selectDay = function(day){
        $scope.todayAlarm = $scope.user.alarms[day];
    }
    
    $interval(function(){
        $scope.timeNow = new Date();
        alarm_manager.calculateAlarm($scope.user,$scope.timeNow);
    },1000);

    $scope.changeTheme = function(){

    }
   
    $scope.init = function () {
      if(!$scope.user)
        return;
      if($scope.user.alarms.length==0){
        //init
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

          alarm_manager.calculateAlarm($scope.user,$scope.timeNow);
      }

    	$scope.todayAlarm = $scope.user.alarms[$scope.timeToWakeup.getDay()];
      $rootScope.currentAlarm = $scope.todayAlarm;
      console.log($scope.todayAlarm);
      alarm_manager.calculateAlarm($scope.user,$scope.timeNow);
      

    }

    $scope.stopSnooze = function() {
      $scope.todayAlarm.mode = -1;
       DB_queries.updateUser($scope.user).then(function(user){
               console.log('update new user',user);
               $rootScope.user=user;
           })
      $location.url('/');
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
