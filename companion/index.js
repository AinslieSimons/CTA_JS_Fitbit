import { me } from "companion";
import * as messaging from "messaging";
const notification = document.getElementById("notification");

// Listen for the onopen event
messaging.peerSocket.onopen = function(){
    
    messaging.peerSocket.send("This is a companion test!");
}
    
function TestFunction(){
    
    "This is a test!";
};

