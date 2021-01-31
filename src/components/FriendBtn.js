import React, { useEffect, useState } from "react";
import axios from "../axios";
// import OtherProf from "./OtherProf";

const FriendBtn = ({ id }) => {
    const [btnText, setBtnText] = useState("");
    // console.log("id", id);
    // (function () {
    useEffect(() => {
        if (id) {
            async function status() {
                let { data } = await axios.get(`/checkFriendStatus/${id}`);
                console.log("my button id:", data);
                setBtnText(data.status);
                console.log("setBtnText:", data.status);
            }
            status();
        }
    }, [btnText]);

    const submit = () => {
        (async () => {
            console.log("data on my submit:");
            let { data } = await axios.post(`/FriendStatus/${btnText}`, {
                id: id,
            });
            setBtnText();
            console.log("my submit:", setBtnText());
        })();
    };

    return (
        <>
            <button
                className="link-header"
                style={{
                    width: "100%",
                    height: "40px",
                    fontFamily: "sans-serif",
                    fontSize: "24px",
                }}
                onClick={submit}
            >
                {btnText}
            </button>
        </>
    );
};

export default FriendBtn;
