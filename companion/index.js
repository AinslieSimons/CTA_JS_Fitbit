import { me } from "companion";
import * as messaging from "messaging";
//import { locationSuccess } from "./location.js"
import { locationTest } from "./trains.js";
import { printTestStation } from "./trains.js";

// Listen for the onopen event
messaging.peerSocket.onopen = function(){
    //WelcomeFunction();
    //locationSuccess();
    //locationTest();
    printTestStation();
    
}

/*/ function to send welcome message
function WelcomeFunction(){
    console.log("welcome function")
    var welcome = "Test 2.0"
    messaging.peerSocket.send(welcome);
}*/
;

