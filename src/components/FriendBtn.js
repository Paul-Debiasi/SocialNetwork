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
            let { data } = await axios.post(`/checkFriends/${btnText}`, {
                id: id,
            });
            console.log("data on my submit:", data);
            setBtnText();
            console.log("my submit:", setBtnText());
        })();
    };

    return (
        <>
            <button
                style={{ width: "100px", height: "40px" }}
                onClick={() => submit()}
            >
                {btnText}
            </button>
        </>
    );
};

export default FriendBtn;
