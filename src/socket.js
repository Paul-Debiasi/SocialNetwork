// client-side socket
import * as io from "socket.io-client";
import { chatHistory, chatNew } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatHistory", (messages) => {
            store.dispatch(chatHistory(messages));
        });

        socket.on("chatNew ", (message) => {
            store.dispatch(chatNew(message));
        });
    }
};
