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
  /*
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
*/
//initiates the distance calculation to provide distance between companion and station
export function distanceCalcExec(){
    distance(exportLat(), exportLong(), accessLat(), accessLong());
};

import { list } from "./trains"

function distanceTest(userLat, userLong, stationLat, stationLong, statNum) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(stationLat - userLat); // deg2rad below
            var dLon = deg2rad(stationLong - userLong);
            var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(userLat)) * Math.cos(deg2rad(stationLat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            console.log("Distance to station is: " + Math.round(d*1000) + " meters")
}

export function calculateClosestStation() {
    let counter = 0;
    let loclat = localStorage.getItem("latStore");
    let loclong = localStorage.getItem("longStore");
    let distanceArray = [];
    while (counter < 300) {
            let listlat = list.lat[counter];
            let listlong = list.long[counter];
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(listlat - loclat); // deg2rad below
            var dLon = deg2rad(listlong - loclong);
            var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(loclat)) * Math.cos(deg2rad(listlat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            //console.log(counter + " Distance to " + list.station_name[counter] + " is: " + Math.round(d*1000) + " meters")
            distanceArray.push(d);
            counter++;
        }
    let closestDistance = Math.min.apply(null, distanceArray);
    let closestStation = (distanceArray.indexOf(closestDistance));
    let outputString = list.station_name[closestStation] + " " + Math.round((closestDistance*1000)*3.281) + "ft";
    //console.log("Min distance calc test: " + list.station_name[closestStation] + " is " + Math.round(closestDistance*1000) + " meters away")
    localStorage.setItem("closestID", closestStation)
    localStorage.setItem("closestName", list.station_name[closestStation])
    localStorage.setItem("closestMeters", Math.round(closestDistance*1000))
    localStorage.setItem("closeStationString", outputString);
    console.log("calculateClosestStation " + localStorage.getItem("closestID"))
    console.log("calculateClosestStation " + localStorage.getItem("closestName"))
    console.log("calculateClosestStation " + localStorage.getItem("closeStationString"))
    console.log("calculateClosestStation " + localStorage.getItem("closestMeters"))   
}
;