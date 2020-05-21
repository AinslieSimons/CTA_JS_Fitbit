// messaging functions go here
import * as messaging from "messaging";
import { localStorage } from "local-storage";

// Ready to send messages
export function sendMessage() {
        // Test data
        let data = {
        train_0: localStorage.getItem("arrivals_0"),
        train_1: localStorage.getItem("arrivals_1"),
        train_2: localStorage.getItem("arrivals_2"),
        train_3: localStorage.getItem("arrivals_3"),
        distance: localStorage.getItem("closeStationString"),
        }

        if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
            // Send the data to peer as a message
            console.log("message_0: " + localStorage.getItem("arrivals_0"));
            console.log("message_1: " + localStorage.getItem("arrivals_1"));
            console.log("message_2: " + localStorage.getItem("arrivals_2"));
            console.log("message_3: " + localStorage.getItem("arrivals_3"));
            messaging.peerSocket.send(data);
            //localStorage.clear();
        }
};
;