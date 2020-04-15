import { me } from "companion";
import * as messaging from "messaging";

import { processStationList } from "./trains.js";

import { getLocation } from "./location.js";
import { getCoords } from "./location.js";

// Listen for the onopen event
messaging.peerSocket.onopen = function(){
    console.log("Hello from companion")
    getLocation();
    messaging.peerSocket.send(processStationList());
    getCoords();   
}

/*
function to send welcome message
function WelcomeFunction(){
    console.log("welcome function")
    var welcome = "Test 2.0"
    messaging.peerSocket.send(welcome);
}*/
;

