import { me } from "companion";
import * as messaging from "messaging";

import { processStationList } from "./trains.js";
import { distanceCalcExec } from "./distance.js";

import { exportLat } from "./location.js";
import { exportLong } from "./location.js";

import { currentTime } from "./arrivals.js";
import { timeStamp } from "./arrivals.js";
//import { downloadArrivals } from "./arrivals.js";

// Listen for the onopen event
messaging.peerSocket.onopen = function(){
    console.log("Hello from companion")
    console.log("Companion is at latitude " + exportLat() + " and longitude " + exportLong())
    processStationList();
    distanceCalcExec();
    currentTime();
    //downloadArrivals();
    timeStamp();
    
    
}

/*
function to send welcome message
function WelcomeFunction(){
    console.log("welcome function")
    var welcome = "Test 2.0"
    messaging.peerSocket.send(welcome);
}*/
;

