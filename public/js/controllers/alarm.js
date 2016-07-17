'use strict';

angular.module('SmartAlarm')
  .controller('alarmCtrl', function ($scope, $http,$location, $rootScope,$interval,$route, DB_queries,geolocation, fbLogin,$window) {
    console.log("alarm controller",$scope.user)
    $scope.todayAlarm='';
    $scope.timeToWakeup = new Date();
    $scope.timeNow = new Date();
    $scope.location = '';
    $scope.distance='';
    $scope.duration='';
    $scope.durationValue='';
    $scope.activities = $scope.user.activities;
    $scope.times = ['00:00','00:30','01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30','05:00','05:30','06:00','06:30',
    '07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
    '15:00','15:30','16:00','16:30','17:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30'];

    
    $interval(function(){
        $scope.timeNow = new Date();
       
    },10000);

    $scope.isActive = function(day){
      var active = (day === $scope.todayAlarm.dayIndex);
      return active;

    }

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
        if(!$scope.todayAlarm.location.data)
            return;
        geolocation.getDistanceFromPosition($scope.user.hometown,$scope.todayAlarm.location).then(function(data){
            $scope.distance = data.rows[0].elements[0].distance.text;
            $scope.duration = data.rows[0].elements[0].duration.text;
            $scope.durationValue = data.rows[0].elements[0].duration.value;

        });

    }

     $scope.addActivity = function(act){
        $scope.todayAlarm.activities.push(act);
         $scope.calculateAlarm();
    }


    $scope.calculateAlarm = function(){
    
        //ttwa = time to wake up
        var ttwa = $scope.parseTime($scope.todayAlarm.timeToArrive);
        
        ttwa.setSeconds(ttwa.getSeconds()-$scope.durationValue);
        //activities durations
        $scope.todayAlarm.activities.forEach(function(act,i){
            ttwa.setMinutes(ttwa.getMinutes()-act.duration);
        })

        //tts = time to sleep
        //var tts
        var tts = new Date(ttwa);
        tts.setHours(tts.getHours()-$scope.todayAlarm.sleepHours);

        $scope.todayAlarm.timeToWakeUp = ttwa.getHours()+":"+ttwa.getMinutes();
        $scope.todayAlarm.timeToSleep = ttwa - tts;// tts.getHours()+":"+tts.getMinutes();
           
       
    }

    $scope.parseTime = function(timeStr) {
       
        var dt = new Date();

        var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
        if (!time) {
                return NaN;
        }
        var hours = parseInt(time[1], 10);
        if (hours == 12 && !time[3]){
                hours = 12;
        }
        else {
                hours += (hours < 12 && time[3]) ? 12 : 0;
        }

        dt.setHours(hours);
        dt.setMinutes(parseInt(time[2], 10) || 0);
        dt.setSeconds(0, 0);
        return dt;
    }


    $scope.saveAlarm = function(){
         $scope.user.alarms[$scope.todayAlarm.dayIndex] = $scope.todayAlarm;

        DB_queries.updateUser($scope.user).then(function(user){
               console.log('update user',user);
               $rootScope.user=user;

               $location.url( "/" );
           });


    }
    
    $scope.init();

  });
