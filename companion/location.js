// Location Functions Will Go Here
import { geolocation } from "geolocation";

export function getLocation() {
    geolocation.getCurrentPosition(
      (position) => {
          console.log("Get Location: \n lat: " + position.coords.latitude + "\n long: " + position.coords.longitude)
          let coordinates = position.coords;
          return position;
      }, 
        (error) => { 
            console.log(error)
        return "error"
      }, 
        {"enableHighAccuracy" : false, "maximumAge" : 1000 * 1800});
}
;