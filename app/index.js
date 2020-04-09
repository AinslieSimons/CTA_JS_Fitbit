/*
 * Chicago Transit Tracker Ionic 0.01
 */
import document from "document";

// Get a handle on the <text> element
const myTitle = document.getElementById("myTitle");
const myBody = document.getElementById("myBody");

myTitle.text = "Train Tracker";
myBody.text = "This is a work in progress";

let marquee = document.getElementById("marquee");
marquee.text = "Data for this application provided by Chicago Transit Authority";

setTimeout(function() {
  marquee.state = "enabled";
}, 500);
