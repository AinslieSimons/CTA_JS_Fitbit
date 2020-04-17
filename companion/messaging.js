// messaging functions go here
import * as messaging from "messaging";
import { localStorage } from "local-storage";

// Ready to send messages
export function sendMessage() {
        // Test data
        let data = {
        train_0: localStorage.getItem("arrivals_0"),
        train_1: localStorage.getItem("arrivals_1"),
        distance: localStorage.getItem("distance")
        }

        if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
            // Send the data to peer as a message
            messaging.peerSocket.send(data);
        }
};
;