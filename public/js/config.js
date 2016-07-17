'use strict';

angular.module('SmartAlarm')
.config(function($routeProvider, $locationProvider, $httpProvider) {
   
    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope,fbLogin){
        // Initialize a new promise
        var deferred = $q.defer();
        fbLogin.routeStatus().then(function(){
            deferred.resolve();
        },function(){
            deferred.reject();
        })
        //if($rootScope.status) {
        //    deferred.resolve();
        //}
        //else {
        //    deferred.reject();
        //}
        return deferred.promise;
    };

    //================================================
    // Add an interceptor for AJAX errors
    //================================================

    $httpProvider.interceptors.push(function($q, $location, $localStorage) {
        return {
            response: function(response) {
                // do something on success
                return response;
            },
            responseError: function(response) {
                if (response.status === 401 || response.status === 404)
                    console.log("http error, http config, http routeProvider")
                return $q.reject(response);
            }
        };
    });

    //================================================
    // Define all the routes
    //================================================
    $routeProvider
        .when('/',{
            templateUrl: 'views/home.html',
            controller: 'homeCtrl',
            resolve:{
                loggedin : checkLoggedin
            }
        })
        .when('/setalarm',{
            templateUrl: 'views/set_alarm.html',
            controller: 'alarmCtrl',
            resolve:{
                loggedin : checkLoggedin
            }
        })
         .when('/settings',{
            templateUrl: 'views/settings.html',
            controller: 'settingsCtrl',
            resolve:{
                loggedin : checkLoggedin
            }
        })
        .when('/wake1',{
            templateUrl: 'views/wake1.html',
            controller: 'homeCtrl',
            resolve:{
                loggedin : checkLoggedin
            }
        })
        .when('/wake2',{
            templateUrl: 'views/wake2.html',
            controller: 'homeCtrl',
            resolve:{
                loggedin : checkLoggedin
            }
        })
        .when('/wake3',{
            templateUrl: 'views/wake3.html',
            controller: 'homeCtrl',
            resolve:{
                loggedin : checkLoggedin
            }
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl',
            resolve:{
                loggedin : function($rootScope,$location){
                    if (!$rootScope.status){
                        $location.url('/login')
                    }
                    else{
                        $location.url('/')
                    }
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });

});