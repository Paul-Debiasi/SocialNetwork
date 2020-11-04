import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";
if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    // elem = <div></div>;
    elem = <Logo />;
}
// Is only call once per project (will appended my code to the DOM)
ReactDOM.render(
    //takes 2 argument my component and my 'main' refer to our HTML. My component will render our other component
    elem,
    document.querySelector("main")
);
