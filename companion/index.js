import { me } from "companion";
import * as messaging from "messaging";

import { processStationList } from "./trains.js";
import { distanceCalcExec } from "./trains.js";

import { getLocation } from "./location.js";

// Listen for the onopen event
messaging.peerSocket.onopen = function(){
    console.log("Hello from companion")
    getLocation();
    processStationList();
    distanceCalcExec();
    
}

/*
function to send welcome message
function WelcomeFunction(){
    console.log("welcome function")
    var welcome = "Test 2.0"
    messaging.peerSocket.send(welcome);
}*/
;

