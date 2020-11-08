import React from "react";
import axios from "../axios";

const Uploader = ({ first, closeUploader, submit, handleChange }) => (
    <div className="uploader">
        <h2>IM UPLOADER</h2>
        <div onClick={closeUploader}>X</div>
        <div>{first}</div>
        <input type="file" name="file" onChange={handleChange}></input>
        <button onClick={submit}>SUBMIT</button>
    </div>
);

export default Uploader;
