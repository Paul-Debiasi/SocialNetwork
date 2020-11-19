import React, { useEffect, useRef } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("chatMessages", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        console.log("chat mounted");

        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const enterKey = (e) => {
        if (e.key === "Enter") {
            console.log("user want to send message");
            e.preventDefault();
            socket.emit("newMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <div>
                <h1>Chat Room</h1>
                <div ref={elemRef}>
                    {/* <div> */}
                    {chatMessages &&
                        chatMessages.map((each) => (
                            <div key={each.id}>
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/user/${each.sender_id}`}
                                >
                                    <div>
                                        <div style={{}}>
                                            <img
                                                src={
                                                    each.image ||
                                                    "./no-user-image.jpg"
                                                }
                                                alt={
                                                    each.first + "" + each.last
                                                }
                                            />
                                            <p>
                                                {each.first} {each.last}:
                                            </p>
                                        </div>
                                        <div key={each.id}>
                                            <p style={{}}>{each.message}</p>
                                        </div>
                                    </div>
                                </Link>

                                {/* <p style={{ border: "1px solid #3d3b3b" }}>
                                        {each.message}
                                    </p> */}
                            </div>
                        ))}
                    {/* </div> */}
                </div>
                <textarea
                    // name="message"
                    // type="text"
                    onKeyDown={enterKey}
                    placeholder="type message..."
                />
            </div>
        </>
    );
}
