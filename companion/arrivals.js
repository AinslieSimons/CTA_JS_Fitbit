// arrivals functions go here
import { accessMapID } from "./trains.js";
import { localStorage } from "local-storage";


/*
downloadURL() creates the download URL, combining various aspects that are required for CTA API
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
    let url_key = cta_url + '?key=' + key_string;
    let download_url = url_key + map_id + output_type
    fetch(download_url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
            let arrivalString = JSON.stringify(data).replace("'", "\'");
            let jsonString = JSON.parse(arrivalString);
            let rootResponse = JSON.stringify(jsonString['ctatt']);
            localStorage.setItem("arrival", rootResponse);
            })  
.catch(e => console.log("E-log" + e))
};

// extracts the timeStamp from the arrival json array
export function timeStamp(){
    let timeString = JSON.parse(localStorage.getItem("arrival"));
    timeString = timeString['tmst']
    timeString = Date.parse(timeString)
    return timeString
};

/*
arrivalTimes() calculates arrival times of trains coming into station 
and also creates a localstorage array with those arrival times
*/
export function arrivalTimes(){
    let counter = 0; 
    let estimateArr = JSON.parse(localStorage.getItem("arrival"));
    estimateArr = estimateArr['eta'];
    Object.entries(estimateArr).forEach(
        ([key, value]) => {
            let stationTime = value['arrT']
            stationTime = Date.parse(stationTime)
            
            if (timeStamp() < stationTime) {
                               
                if (((stationTime - timeStamp())/1000) < 60 ) {
                    localStorage.setItem("arrivals_" + counter, value['destNm'] + " arriving now");
                    counter++
                }
                else { 
                    let arrivalMins = ((stationTime - timeStamp())/60000)
                    localStorage.setItem("arrivals_" + counter, value['destNm'] + " in " + Math.round(arrivalMins) + " mins");
                    counter++
                }
            }
            else { 
                localStorage.setItem("arrivals_" + counter, value['destNm'] + " running slow");
                //console.log(value['destNm'] + " running slow ")}
            }
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