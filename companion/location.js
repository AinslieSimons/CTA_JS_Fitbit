// Location Functions Will Go Here
import { geolocation } from "geolocation";
import { localStorage } from "local-storage";

geolocation.getCurrentPosition(locationSuccess, locationError, {
  timeout: 60 * 1000
});

// set lat and long variables using position from phone
let lat;
let long;

export function locationSuccess(position) {
    localStorage.setItem("latStore", position.coords.latitude);
    localStorage.setItem("longStore", position.coords.longitude);
    console.log("Lat: " + localStorage.getItem("latStore"))
    console.log("Long: " + localStorage.getItem("longStore"))
    lat = position.coords.latitude;
    long = position.coords.longitude;
};

function locationError(error) {
    console.log("Error: " + error.code, "Message: " + error.message)
}

// exports lat and long variables 
export function exportLat(position){
    console.log("Lat Test: " + lat)
    return lat;
};

export function exportLong(position){
    console.log("Long Test: " + long)
    return long;
};

;