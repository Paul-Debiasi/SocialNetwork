import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import ResetPassword from "./ResetPassword";

export default function Welcome() {
    return (
        <div>
            <div className="my-title">
                <h1
                    style={{
                        marginTop: "16px",
                        marginBottom: "16px",
                        fontFamily: "sans-serif",
                        fontWeight: "200",
                        letterSpacing: "4px",
                    }}
                    className="title"
                >
                    Welcome To The Social-Dev
                </h1>
            </div>
            <div
                // style={{
                //     width: "400px",
                //     height: "400px",
                //     overflow: "hidden",
                //     borderRadius: "50%",
                // }}
                className="wrap-logo"
            >
                <img className="my-logo" src="static/images/logo.jpg" />
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/ResetPassword" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
