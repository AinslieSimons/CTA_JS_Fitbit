// arrivals functions go here
import { accessMapID } from "./trains.js";
import { localStorage } from "local-storage";


/*
creates the download URL, combining various aspects that are required for CTA API
retrives json from cta website, regexes and sets to local storage
local storage so far seems best way of keeping the json data 
will have to see about flushing it and refreshing etc...
*/
let download_url;

export function downloadUrl(){
    let cta_url = 'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx';
    let key_string = "6bae14d391f34dde9d9cc288fbb2a075";
    let output_type = '&outputType=JSON';
    let map_id = '&mapid=' + accessMapID();
    console.log("map_ID = " + map_id)
    let url_key = cta_url + '?key=' + key_string;
    let download_url = url_key + map_id + output_type
    console.log("downloadUrl check from:\n" + download_url)
    fetch(download_url)
            .then((response) => {
                //console.log("response test:" + response.json());
                return response.json();
            })
            .then((data) => {
            let arrivalString = JSON.stringify(data).replace("'", "\'");
            let jsonString = JSON.parse(arrivalString);
            let rootResponse = JSON.stringify(jsonString['ctatt']);
            //console.log("Root Response check:" + rootResponse)
            localStorage.setItem("arrival", rootResponse);
            //console.log("setItem arrival Test: " + localStorage.getItem("arrival"));
            })  
.catch(e => console.log("E-log" + e))
};

// extracts the timeStamp from the arrival json array
export function timeStamp(){
    let timeString = JSON.parse(localStorage.getItem("arrival"));
    //console.log("Time Stamp Test: " + timeString['tmst']);
    timeString = timeString['tmst']
    timeString = Date.parse(timeString)
    return timeString
};

// calculates arrival times of trains coming into station
export function arrivalTimes(){
    let counter = 0; 
    let estimateArr = JSON.parse(localStorage.getItem("arrival"));
    console.log("Arrival Time Check: " + localStorage.getItem("arrival"));
    estimateArr = estimateArr['eta'];
    Object.entries(estimateArr).forEach(
        ([key, value]) => {
            let stationTime = value['arrT']
            stationTime = Date.parse(stationTime)
            
            if (timeStamp() < stationTime) {
                               
                if (((stationTime - timeStamp())/1000) < 60 ) {
                    localStorage.setItem("arrivals_" + counter, value['destNm'] + " arriving now");
                    console.log(localStorage.getItem("arrivals_" + counter))
                    //console.log(counter)
                    counter++
                    //console.log("Train to: " + value['destNm'] + " arriving now")
                }
                else { 
                    let arrivalMins = ((stationTime - timeStamp())/60000)
                    localStorage.setItem("arrivals_" + counter, value['destNm'] + " in " + Math.round(arrivalMins) + " mins");
                    console.log(localStorage.getItem("arrivals_" + counter))
                    //console.log(counter)
                    counter++
                    //console.log("Train to: " + value['destNm'] + " arrives in " + Math.round(arrivalMins) + " mins")
                }
            }
            else { console.log(value['destNm'] + " running slow ")}
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