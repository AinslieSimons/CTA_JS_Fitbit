import { me } from "companion";
import * as messaging from "messaging";
//const notification = document.getElementById("notification");

// Listen for the onopen event
messaging.peerSocket.onopen = function(){
    var welcome = "This is a companion test!"
    messaging.peerSocket.send(welcome);
    return ("This is a companion test!");
}
    
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data && evt.data.command == "WelcomeFunction") {
    // The device requested welcome data
    WelcomeFunction();
  }
}

function WelcomeFunction(){
    var welcome = "This is a companion test!"
    messaging.peerSocket.send(welcome);
}
;

