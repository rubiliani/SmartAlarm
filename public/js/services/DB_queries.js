'use-strict';

angular.module('SmartAlarm.services')
    .factory('DB_queries', function ($http, $q, $rootScope, $localStorage) {
        var _getAlarms = function () {
            var deferred = $q.defer();
            $http.get($rootScope.app.domain + 'users/other/' + $rootScope.user.id)
                .success(function (data) {
                    console.log("get events success", data)
                    deferred.resolve(data);
                }).error(function (err) {
                console.log("get events err", err)
                deferred.reject(err);
            })
                ['finally'](function () {

            });
            return deferred.promise;
        }

        var _updateUser = function (user) {
            var deferred = $q.defer();
            $http.post($rootScope.app.domain + 'users/update_user', {user: user})
                .success(function (data) {
                    console.log("update user success", data.user)
                    if (data.newUser) {
                        data.user.newUser = data.newUser;
                    }
                    deferred.resolve(data.user);
                }).error(function (err) {
                console.log("update user err", err)
                deferred.reject(err);
            })
                ['finally'](function () {

            });
            return deferred.promise;
        }


        var _getWeather = function (city) {
            var deferred = $q.defer();
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            //$http.defaults.headers.post["Access-Control-Allow-Origin"] ="*";
            $http.defaults.headers.post["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, uid";
            $http.post("http://api.openweathermap.org/data/2.5/weather?q='"+city+"'&appid=f21144f24555f14ce6ecc33a4490b044")
                .success(function (data) {
                    console.log("get weather success", data)
                    
                    deferred.resolve(data);
                }).error(function (err) {
                console.log("get weather err", err)
                deferred.reject(err);
            })
                ['finally'](function () {

            });
            return deferred.promise;
        }


        return {
            getAlarms: _getAlarms,
            updateUser: _updateUser,
            getWeather:_getWeather
        }
    })