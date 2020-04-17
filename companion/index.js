import { me } from "companion";
import * as messaging from "messaging";

import { processStationList } from "./trains.js";

import { distanceCalcExec } from "./distance.js";

import { exportLat } from "./location.js";
import { exportLong } from "./location.js";

import { downloadArrivals } from "./arrivals.js";
import { currentTime } from "./arrivals.js";
import { timeStamp } from "./arrivals.js";
import { arrivalTimes } from "./arrivals.js";

import { sendMessage } from "./messaging.js";

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
    console.log("Companion is at latitude " + exportLat() + " and longitude " + exportLong())
    distanceCalcExec();
    sendMessage();
}

processStationList();
downloadArrivals();
currentTime();
timeStamp();
arrivalTimes();


/*
messaging.peerSocket.onopen = function (WelcomeFunction){
    console.log("welcome function")
    var welcome = "Hello from companion"
    return messaging.peerSocket.send(welcome);
};*/

;
