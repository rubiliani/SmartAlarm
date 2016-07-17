'use-strict';

angular.module('SmartAlarm.services')
    .factory('alarm_manager', function ($http, $q,$location, $rootScope, $localStorage) {
        
        var _calculateAlarm = function (user,time) {
            var deferred = $q.defer();
            var today = user.alarms[time.getDay()];

            if(parseTime(today.timeToWakeUp)<new Date()){
            	if(today.mode===-1)
            		return;
            	if(today.mode === 0){
            		today.mode = 1;
            		$location.url( "/wake1" );
            	}
            	else if(today.mode===1){
            		today.mode = 2;
            		$location.url( "/wake2" );
            	}
            	else if(today.mode===2){
            		today.mode = 3;
            		$location.url( "/wake3" );
            	}
            }
            
            
            return deferred.promise;
        }

        var parseTime = function(timeStr) {
       
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

        return {
            calculateAlarm: _calculateAlarm
        }


        
    })