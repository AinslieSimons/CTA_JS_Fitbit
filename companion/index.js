import { me } from "companion";
import * as messaging from "messaging";
import { geolocation } from "geolocation";

// Listen for the onopen event
messaging.peerSocket.onopen = function(){
    var welcome = "Location data sent"
    messaging.peerSocket.send(welcome);
    WelcomeFunction();
    //locationSuccess();
}

// function to send welcome message
function WelcomeFunction(){
    var welcome = "Test 2.0"
    messaging.peerSocket.send(welcome);
}

geolocation.getCurrentPosition(locationSuccess, locationError, {
  timeout: 60 * 1000
});

// following function sends co-ordinates to the device, seems to stop the other messages being sent
// ultimately won't need to send this data to device, as it will be quicker to process geodata on companion
function locationSuccess(position) {
    var coo_data = {
        lat : position.coords.latitude,
        long : position.coords.longitude
    }
    messaging.peerSocket.send(coo_data)
}

function locationError(error) {
  console.log("Error: " + error.code, "Message: " + error.message);
}

;

