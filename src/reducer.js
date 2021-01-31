export default function reducer(state = {}, action) {
    //Here we will be updating the old state (Use map in the first part and filter in the other)
    if (action.type == "GET_LIST") {
        state = Object.assign({}, state, {
            friendsList: action.friendsList,
            receivedRequests: action.received,
            sentRequests: action.sent,
        });
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            friendsList: state.friendsList.map((user) => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
            receivedRequests: state.receivedRequests.filter((user) => {
                if (user.id == action.id) {
                    return;
                } else {
                    return user;
                }
            }),
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friendsList: state.friendsList.filter((user) => {
                if (user.id == action.id) {
                    return;
                } else {
                    return user;
                }
            }),
            receivedRequests: state.receivedRequests.filter((user) => {
                if (user.id == action.id) {
                    return;
                } else {
                    return user;
                }
            }),
            sentRequests: state.sentRequests.filter((user) => {
                if (user.id == action.id) {
                    return;
                } else {
                    return user;
                }
            }),
        };
    }
    if (action.type == "RETRIEVED_MESSAGES") {
        state = Object.assign({}, state, {
            chatMessages: action.chatHistory,
        });
    }

    if (action.type == "NEW_MESSAGE") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, ...action.newMessage],
        };
    }
    return state;
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
