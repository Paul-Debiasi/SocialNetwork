import React from "react";
import ProfilePic from "./ProfilePic";
import { Link } from "react-router-dom";

const Welcome = () => (
    // Import result is the URL of your image
    <div>
        <div className="small-logo-box">
            <Link to="/">
                <img
                    className="s-logo"
                    src="static/images/logo.jpg"
                    alt="Logo"
                />
            </Link>
        </div>
    </div>
);

export default Welcome;
