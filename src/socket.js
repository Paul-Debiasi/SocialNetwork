// client-side socket
import * as io from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        // receiving message from server

        socket.on("welcome", (msg) => {
            console.log("hopefully we see this", msg);
        });
        socket.on("messageIoEmit", (payload) => {
            console.log("payload from messageIoEmit", payload);
        });
        // sending message from the client to server
        socket.emit("messageFromClient", [1, 2, 3]);
    }
};
