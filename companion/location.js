// Location Functions Will Go Here
import { geolocation } from "geolocation";

geolocation.getCurrentPosition(locationSuccess, locationError, {
  timeout: 60 * 1000
});

// This function grabs the cordinates and stores them as variables
export function locationSuccess(position) {
    var coo_data = {
        lat : position.coords.latitude,
        long : position.coords.longitude
    }
    console.log("locationSuccess function called")
    console.log("Current latitude is: " + coo_data.lat)
    console.log("Current longitude is: " + coo_data.long)
    console.log(coo_data.lat + " & " + coo_data.long)
}

function locationError(error) {
  console.log("Error: " + error.code, "Message: " + error.message);
}
;
