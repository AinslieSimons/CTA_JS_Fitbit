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

import { calculateClosestStation } from "./distance"

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
    distanceCalcExec();
    sendMessage();
}

calculateClosestStation();
currentTime();
downloadUrl();
timeStamp();
arrivalTimes();

//processStationList();

;
