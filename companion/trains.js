// train related functions will go here
import * as messaging from "messaging";

// the below functions take the json data and creates an array of the stations
let json = '{"stop_id":{"0":30162,"1":30161,"2":30022,"3":30023,"4":30214,"5":30213,"6":30246,"7":30245,"8":30210,"9":30209},"map_id":{"0":40830,"1":40830,"2":40120,"3":40120,"4":41120,"5":41120,"6":41270,"7":41270,"8":41080,"9":41080},"station_name":{"0":"18th","1":"18th","2":"35th\/Archer","3":"35th\/Archer","4":"35th-Bronzeville-IIT","5":"35th-Bronzeville-IIT","6":"43rd","7":"43rd","8":"47th","9":"47th"},"lat":{"0":41.857908,"1":41.857908,"2":41.829353,"3":41.829353,"4":41.831677,"5":41.831677,"6":41.816462,"7":41.816462,"8":41.809209,"9":41.809209},"long":{"0":-87.669147,"1":-87.669147,"2":-87.680622,"3":-87.680622,"4":-87.625826,"5":-87.625826,"6":-87.619021,"7":-87.619021,"8":-87.618826,"9":-87.618826}}';
let list = JSON.parse(json);
const station_array = [list];

export function processStationList() {
        //let count = 7
        /*station_array.forEach(element => console.log(element.stop_id));
        station_array.forEach(element => console.log(element.map_id));
        station_array.forEach(element => console.log(element.station_name));
        station_array.forEach(element => console.log(element.lat));
        station_array.forEach(element => console.log(element.long));    */
        console.log(Object.keys(list));
        console.log("test station: " + list['station_name'][4]);
        let output_station = list['station_name'][0];
        let output_message = "Nearest Station " + output_station
        return output_message;
    };

export function locationTest(obj) {
    console.log("location test");
    for(var k in station_list) {
        if(station_list[k] instanceof Object) {
            console.log((station_list[k]));
        } else {
            console.log((station_list[k] + "<br>")); 
        };
    }
}
;