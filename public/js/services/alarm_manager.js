'use-strict';

angular.module('SmartAlarm.services')
    .factory('alarm_manager', function ($http, $q,$location, $rootScope, $localStorage) {
        
        var _calculateAlarm = function (user,time) {
            var deferred = $q.defer();
            var currentTime = new Date()
            var today = $rootScope.currentAlarm;
            var todayDate = parseTime(today.timeToWakeUp);

            if(currentTime.getDay()<today.dayIndex)
            	todayDate.setDate(todayDate.getDate()+1);
           
            var timetosleep = new Date(todayDate - today.timeToSleep);
            $rootScope.currentAlarm.tts = timetosleep;

            if((timetosleep - currentTime)>15000){
            	$rootScope.nightmode = true;

            	if((timetosleep - currentTime)<15000){

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
            }
            else if((todayDate - currentTime)>15000){
            	$rootScope.nightmode = false;
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
            else {
            	$rootScope.currentAlarm = user.alarms[time.getDay()+1];
            	todayDate = $rootScope.currentAlarm;
            	todayDate = parseTime(today.timeToWakeUp);
            	todayDate.setDate(todayDate.getDate()+1);
            }




/*

            if(today.mode===-1){
            	today = user.alarms[time.getDay()+1];
            	todayDate = parseTime(today.timeToWakeUp);
            	todayDate.setDate(todayDate.getDate()+1);
            }

           

            var diff = todayDate-currentTime;

            if(diff<1500){

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
            }*/
            
            
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