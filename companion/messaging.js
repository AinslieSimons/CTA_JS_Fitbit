// messaging functions go here
import * as messaging from "messaging";

// Ready to send messages
export function sendMessage() {
        // Test data
        let data = {
        title: "Hello From Companion",
        body: "communication is working"
        }

        if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
            // Send the data to peer as a message
            messaging.peerSocket.send(data);
        }
};
;