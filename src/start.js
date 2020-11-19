import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import App from "./App";
import App from "./App";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { init } from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
const userIsLoggedIn = location.pathname != "/welcome";
if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
// Is only call once per project (will appended my code to the DOM)
ReactDOM.render(
    //takes 2 argument my component and my 'main' refer to our HTML. My component will render our other component
    elem,
    document.querySelector("main")
);
