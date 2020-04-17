// arrivals functions go here
import { accessMapID } from "./trains.js";

import { localStorage } from "local-storage";


// creates the download URL, combining various aspects that are required for CTA API
function downloadUrl(){
    let cta_url = 'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx';
    let key_string = "6bae14d391f34dde9d9cc288fbb2a075";
    let output_type = '&outputType=JSON';
    let map_id = '&mapid=' + accessMapID();
    console.log("map_ID = " + map_id)
    let url_key = cta_url + '?key=' + key_string;
    let download_url = url_key + map_id + output_type
    console.log("Downloading Arrival Data from:\n" + download_url)
    return download_url
};

// retrives json from cta website, regexes and sets to local storage
// local storage so far seems best way of keeping the json data... 
// will have to see about flushing it and refreshing etc...
export function downloadArrivals(){
    fetch(downloadUrl())
            .then((response) => {
                return response.json();
            })
            .then((data) => {
            let arrivalString = JSON.stringify(data).replace("'", "\'");
            let jsonString = JSON.parse(arrivalString);
            let rootResponse = JSON.stringify(jsonString['ctatt']);
            localStorage.setItem("arrival", rootResponse);
            //console.log(localStorage.getItem("arrival"));
            })  
};

// extracts the timeStamp from the arrival json array
export function timeStamp(){
    let timeString = JSON.parse(localStorage.getItem("arrival"));
    timeString = timeString['tmst']
    timeString = Date.parse(timeString)
    return timeString
};

// calculates arrival times of trains coming into station
export function arrivalTimes(){
    let estimateArr = JSON.parse(localStorage.getItem("arrival"));
    estimateArr = estimateArr['eta']
    Object.entries(estimateArr).forEach(
        ([key, value]) => {
            let stationTime = value['arrT']
            stationTime = Date.parse(stationTime)
            if (timeStamp() < stationTime) {
                if ((stationTime - timeStamp()/1000) < 120 ) {
                    console.log("Train to: " + value['destNm'] + " arriving now")
                }
                else { 
                    let arrivalMins = ((stationTime - timeStamp())/60000)
                    console.log("Train to: " + value['destNm'] + " arrives in " + Math.round(arrivalMins) + " mins")}
            }
            else { console.log("Train to: " + value['destNm'] + " running slow ")}
        }
    );
};

export function currentTime(){
    let d = new Date();
    let t = d.toTimeString().substr(0, 8);
    console.log("Current Time is: " + t)
    return t
};
;