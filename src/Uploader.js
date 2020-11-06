import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidUpdate() {
        console.log("uploader just mounted");
    }
}
