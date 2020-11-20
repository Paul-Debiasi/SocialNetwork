import React from "react";
import axios from "../axios";

const Uploader = ({ first, imgUrl, closeUploader, submit, handleChange }) => (
    <>
        <div className="uploader">
            <div style={{ textAlign: "center" }}>
                <h2
                    style={{
                        fontFamily: "sans-serif",
                        fontWeight: "100",
                        color: "white",
                    }}
                >
                    UPLOAD YOUR PIC
                </h2>
            </div>
            <div
                style={{
                    transform: "translateY(1px)",
                    color: "white",
                    fontWeight: "100",
                    fontSize: "24px",
                    cursor: "pointer",
                    margin: "8px",
                }}
                onClick={closeUploader}
            >
                X
            </div>
            <img style={{ width: "100%", borderRadius: "16px" }} src={imgUrl} />
            {/* <div>{first}</div> */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    width: "100%",
                    margin: "8px ",
                }}
            >
                <input
                    style={{ marginRight: "80px" }}
                    className="link-header"
                    type="file"
                    name="file"
                    onChange={handleChange}
                ></input>
                <button
                    style={{ marginRight: "80px" }}
                    className="link-header"
                    style={{}}
                    onClick={submit}
                >
                    SUBMIT
                </button>
            </div>
        </div>
    </>
);

export default Uploader;
