'use strict';

angular.module('SmartAlarm')
  .controller('settingsCtrl', function ($scope, $http,$location, $rootScope,$interval,$route,$window, DB_queries, fbLogin) {
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

               $location.url( "/" );
           })
        
    }
    $scope.addActivity = function(title,duration){
        var act={"name":title,"duration":duration};
        $scope.user.activities.push(act);
        $scope.activityText = "";
        $scope.activityDuration=0;
    }

    
    $scope.init();

  });
