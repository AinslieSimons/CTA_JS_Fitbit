/*
 * Chicago Transit Tracker Ionic 0.01
 */
import document from "document";
import * as messaging from "messaging";

// Get a handle on the <text> element
const myTitle = document.getElementById("myTitle");
const myBody = document.getElementById("myBody");
const notification = document.getElementById("notification");

myTitle.text = "Train Tracker";
myBody.text = "Hello from Brackets!";
notification.text = "test local"

// Listen for the onopen event
messaging.peerSocket.onopen = function(){
};

notification.text = function(TestFunction){
};

//notification.text =  messaging.peerSocket.function();

let marquee = document.getElementById("marquee");
marquee.text = "Data for this application provided by Chicago Transit Authority";

setTimeout(function() {
  marquee.state = "enabled";
}, 500);
