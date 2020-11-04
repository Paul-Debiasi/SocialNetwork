import React from "react";
import Registration from "./registration";
// import Logo from "./images/logo.jpg";

export default function Welcome() {
    return (
        <div>
            <div className="my-title">
                <h1 className="title">Welcome To The Social-Dev</h1>
            </div>
            <div className="wrap-logo">
                <img className="my-logo" src="static/images/logo.jpg" />
            </div>
            <Registration />
        </div>
    );
}
