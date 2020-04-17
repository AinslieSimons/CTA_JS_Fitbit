// distance functions will go here

import { accessLat } from "./trains.js";
import { accessLong } from "./trains.js";
import { accessStation } from "./trains.js";
import { exportLat } from "./location.js";
import { exportLong } from "./location.js";

import { localStorage } from "local-storage";

// distcalc stuff 
  var EARTH_RADIUS = 6378137; //meters
  var RADIANS_PER_DEGREE = Math.PI / 180;
  var CIRCUMFERENCE_AT_EQUATOR = 2 * Math.PI * EARTH_RADIUS;
  
  function deg2rad(deg) {
    return deg * Math.PI / 180
  }
  
  var circumferenceAt = function (referenceDegree) {
      var referenceRadians = referenceDegree * RADIANS_PER_DEGREE;
      return Math.cos(referenceRadians) * CIRCUMFERENCE_AT_EQUATOR;
  };
  
  var metersToDegrees = function (meters, latitude) {
      var degreesPerMeter = (360 / circumferenceAt(latitude));
      return meters * degreesPerMeter;
  };
  
  var degreesToMeters = function (degrees, latitude) {
      var metersPerDegree = (circumferenceAt(latitude) / 360);
      return degrees * metersPerDegree;
  }
  
// execute distance calculation
function distance(userLat, userLong, stationLat, stationLong) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(stationLat - userLat); // deg2rad below
    var dLon = deg2rad(stationLong - userLong);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(userLat)) * Math.cos(deg2rad(stationLat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log("Distance to " + accessStation() + " is " + Math.round(d*1000) + " meters")
    localStorage.setItem("distance", (accessStation() + " " + Math.round(d*1000) + "m away"))
    return d;
}

//initiates the distance calculation to provide distance between companion and station
export function distanceCalcExec(){
    distance(exportLat(), exportLong(), accessLat(), accessLong());
};
;