import React from "react";
// import logo from ""; // Tell webpack this JS file uses this image

// console.log(logo); // /logo.84287d09.png

export default function Welcome() {
    // Import result is the URL of your image

    return (
        <div className="small-logo">
            <img className="s-logo" src="static/images/logo.jpg" alt="Logo" />
        </div>
    );
}
