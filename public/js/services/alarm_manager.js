'use-strict';

angular.module('SmartAlarm.services')
    .factory('alarm_manager', function ($http, $q, $rootScope, $localStorage) {
        var _calculateAlarm = function (alarm) {
            var deferred = $q.defer();
            
            return deferred.promise;
        }

        return {
            calculateAlarm: _calculateAlarm
        }
    })