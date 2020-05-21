// arrivals functions go here
import { accessMapID } from "./trains.js";
import { localStorage } from "local-storage";
import { calculateClosestStation } from "./distance"


// sets the download_url with the current station ID
function initUrl(){
    let cta_url = 'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx';
    let key_string = "6bae14d391f34dde9d9cc288fbb2a075";
    let output_type = '&outputType=JSON';
    let map_id = '&mapid=' + accessMapID();
    let url_key = cta_url + '?key=' + key_string;
    let download_url = url_key + map_id + output_type;
    console.log("downloadURL\n" + download_url)
    return download_url
};

function nullUrlCheck(){
    //console.log("null check " + (localStorage.getItem("arrival") == null));
    return localStorage.getItem("arrival") == null
};

async function fetchUrl(){
    let response = await fetch(initUrl());
    console.log("fetchUrl status: " + response.status);
    console.log("fetchUrl status: " + response.statusText);
    let data = await response.json();
    console.log("fetchURl: " + response)
    return data;
}

async function setArrival(){
    console.log("setArrival initialised");
    await fetchUrl()
        .then(
            function(data){
                let arrivalString = JSON.stringify(data).replace("'", "\'");
                let jsonString = JSON.parse(arrivalString);
                let rootResponse = JSON.stringify(jsonString['ctatt'])
                //console.log(rootResponse);
                localStorage.setItem("arrival", rootResponse);
            }
        )
};

//downloadURL() downloads the arrival data using the variables from initUrl
async function downloadUrl(){
    if (nullUrlCheck() == true){
        console.log("nullcheck is true")
        await setArrival();
        //console.log(JSON.parse(localStorage.getItem("arrival")))
        }
    else if (nullUrlCheck() == false){
        console.log("nullcheck is false")
        localStorage.removeItem("arrival");
        await setArrival();
        //console.log(JSON.parse(localStorage.getItem("arrival")))
        }  
};

// extracts the timeStamp from the arrival json array
function timeStampGet(){
    //downloadUrl();
    let timeJson = snagArrival();
    console.log("timeJson: " + timeJson);
    //let timeJson = JSON.parse(localStorage.getItem("arrival"));
    let timeString = timeJson.tmst
    timeString = Date.parse(timeString)
    console.log("timeString: " + timeString);
    return timeString
};


function snagArrival(){
    let arrival = JSON.parse(localStorage.getItem("arrival"))
    return arrival
}

/*
arrivalTimes() calculates arrival times of trains coming into station 
and also creates a localstorage array with those arrival times
*/
export async function arrivalTimes(){
    await downloadUrl();
    let counter = 0; 
    let estimateArr = snagArrival();
    let timeStamp = timeStampGet();
    //console.log(estimateArr);
    estimateArr = estimateArr['eta'];
    Object.entries(estimateArr).forEach(
        ([key, value]) => {
            let stationTime = value['arrT']
            stationTime = Date.parse(stationTime)
            
            if (timeStamp < stationTime) {
                               
                if (((stationTime - timeStamp)/1000) < 60 ) {
                    localStorage.setItem("arrivals_" + counter, value['destNm'] + " arriving now");
                    console.log("arrivals_" + counter, value['destNm'] + " arriving now");
                    counter++
                }
                else { 
                    let arrivalMins = ((stationTime - timeStamp)/60000)
                    localStorage.setItem("arrivals_" + counter, value['destNm'] + " in " + Math.round(arrivalMins) + " mins");
                    console.log("arrivals_" + counter, value['destNm'] + " in " + Math.round(arrivalMins) + " mins");
                    counter++
                }
            }
            else { 
                localStorage.setItem("arrivals_" + counter, value['destNm'] + " running slow");
                console.log(value['destNm'] + " running slow ")}
            })
};

export function currentTime(){
    let d = new Date();
    let t = d.toTimeString().substr(0, 8);
    console.log("Current Time is: " + t)
    return t
};
;