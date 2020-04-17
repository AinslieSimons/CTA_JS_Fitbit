/*
 * Chicago Transit Tracker Ionic 0.01
 */
import document from "document";
import * as messaging from "messaging";

// Get a handle on the <text> element
const myTitle = document.getElementById("myTitle");
const train_0 = document.getElementById("train_0");
const train_1 = document.getElementById("train_1");
const notification = document.getElementById("notification");
const lat = document.getElementById("lat");
const long = document.getElementById("long");

console.log("app console log test")

myTitle.text = "Train Tracker";
train_0.text = "Waiting for Train Times";
notification.text = "Waiting for Distance Data";

// initiate message open
// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
}

// recieve messages
messaging.peerSocket.onmessage = function(evt) {
    let data = evt.data
    train_0.text = (JSON.stringify(data.train_0));
    train_1.text = (JSON.stringify(data.train_1));
    notification.text = (JSON.stringify(data.distance));
    console.log(JSON.stringify(evt.data));
}

/*
//get location data from the companion app
messaging.peerSocket.onmessage = function(evt) {
  //Output the message to the notification element
  let data = evt.data
  lat.text = (JSON.stringify(evt.data.lat));
  long.text = (JSON.stringify(evt.data.long));
}*/


let marquee = document.getElementById("marquee");
marquee.text = "Data for this application provided by Chicago Transit Authority";

setTimeout(function() {
  marquee.state = "enabled";
}, 500);
;
