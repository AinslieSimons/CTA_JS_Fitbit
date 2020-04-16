// arrivals functions go here
import { accessMapID } from "./trains.js";

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

const jsonString = "test";
/*
function downloadArrivals(){
    fetch(downloadUrl())
            .then((response) => {
                return response.json();
            })
            .then((data) => {
            let arrivalString = JSON.stringify(data).replace("'", "\'");
            let jsonString = JSON.parse(arrivalString);
            //rootResponse = JSON.stringify(jsonString['ctatt']);
            //console.log("logged in downloadArrivals: " + rootResponse)
            return jsonString
            })  
};*/

const doStuff = async () => {
    const response = await fetch(downloadUrl());
    const data = await response.json();
    console.log(data.ctatt);
}

doStuff();

export function timeStamp(){
    console.log("timeStamp: " + doStuff());
    //let timestamp = downloadArrivals();
    //console.log(timestamp['tmst'])
};

export function currentTime(){
    let d = new Date();
    let t = d.toTimeString().substr(0, 8);
    console.log("Current Time is: " + t)
    return t
};
;