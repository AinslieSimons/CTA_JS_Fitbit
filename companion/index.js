import { me } from "companion";
import * as messaging from "messaging";
import { localStorage } from "local-storage";
import { processStationList } from "./trains.js";
import { distanceCalcExec } from "./distance.js";
import { exportLat } from "./location.js";
import { exportLong } from "./location.js";
import { currentTime } from "./arrivals.js";
import { timeStamp } from "./arrivals.js";
import { arrivalTimes } from "./arrivals.js";
import { sendMessage } from "./messaging.js";
import { downloadUrl } from "./arrivals.js";
import { calculateClosestStation } from "./distance.js";

// Listen for the onopen event
messaging.peerSocket.onopen = async function() {
    //distanceCalcExec();
    calculateClosestStation();
    processStationList();
    currentTime();
    //downloadUrl();
    //timeStamp();
    await arrivalTimes();
    sendMessage();
    //localStorage.clear();
    
}
;
