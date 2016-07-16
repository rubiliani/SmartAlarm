'use strict';

angular.module('SmartAlarm.services')
.factory('geolocation', function ($q, $window,$http,$rootScope) {

    var getCurrentPosition = function () {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }

        return deferred.promise;
    }

    var getDistanceFromPosition = function (home,city) {
        //console.log($scope.user)

        
        var deferred = $q.defer();
        var service = new google.maps.DistanceMatrixService();
       
        var origin = new google.maps.LatLng(home.data.geometry.location.lat, home.data.geometry.location.lng);
        var dest = new google.maps.LatLng(city.data.geometry.location.lat(), city.data.geometry.location.lng());
        
        service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [dest],
          travelMode: google.maps.TravelMode.DRIVING,
        }, callback);

        function callback(response, status) {
          console.log(response);
          deferred.resolve(response);
        }
          
         return deferred.promise;
    }


    return {
        getCurrentPosition: getCurrentPosition,
        getDistanceFromPosition: getDistanceFromPosition
    };
});
