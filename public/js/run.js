'use strict';

angular.module('SmartAlarm')
.run(function($q, $rootScope, $window, $http, $localStorage, $route, $location,$document, $timeout, fbLogin){

    $rootScope.status=false;
    $rootScope.app = {
        name:'SmartAlarm',
        domain: (document.domain == 'localhost')?'http://localhost:1411/':'https://smrtalrm.herokuapp.com/'
    };

    fbLogin.getStatus().then(function(user){
        console.log('status received',user);
        if (user.newUser){
            $location.url( "/home" );
        }
        $route.reload();

    });

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        console.log("routeChangeStart next->",next.templateUrl)
        fbLogin.routeStatus().then(function(){
            console.log('route status connected')
        },function(){
            console.log('route status disconnected')
            event.preventDefault();
            $location.url('/login')
        })
    });


})