// Will contain our action creator function. They returns object. The obj that is returned is called an action.
import axios from "./axios";

export async function getList() {
    const { data } = await axios.get("/getFriends");
    return {
        type: "GET_LIST",
        friendsList: data.rows,
        received: data.received,
        sent: data.sent,
    };
}

export async function acceptFriend(id) {
    const { data } = await axios.post(`/FriendStatus/Accept friend`, {
        id: id,
    });
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id: id,
    };
}

export async function unfriend(id) {
    const { data } = await axios.post(`/FriendStatus/Unfriend`, {
        id: id,
    });
    return {
        type: "UNFRIEND",
        id: id,
    };
}

export function chatHistory(messages) {
    // console.log("action: bringing up the list!");
    return {
        type: "RETRIEVED_MESSAGES",
        chatHistory: messages,
    };
}

export function chatNew(msg) {
    // console.log("action: adding a new message!");
    return {
        type: "NEW_MESSAGE",
        newMessage: message,
    };
}
// function reducer(state = {}, action) {
//     if (action.type == 'SHOW_BIO_EDITOR') {
//         return Object.assign({}, state, {
//             bioEditorTextareaIsVisible: true
//         });
//     }
//     if (action.type == 'UPDATE_BIO') {
//         const user = { ...state.user, bio: action.bio };
//         return { ...state, user };
//     }
//     return state;
// }
