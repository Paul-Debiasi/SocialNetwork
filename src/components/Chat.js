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
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: "40px",
                    marginBottom: "40px",
                }}
            >
                <div
                    style={{
                        marginTop: "30px",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderRadius: "16px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignContent: "center",
                        }}
                    >
                        <h1
                            style={{
                                fontFamily: "sans-serif",
                                fontWeight: "100",
                                letterSpacing: "3px",
                                color: "white",
                                marginBottom: "10px",
                            }}
                        >
                            Chat Room
                        </h1>
                    </div>
                    <div ref={elemRef}>
                        {/* <div> */}
                        {chatMessages &&
                            chatMessages.map((each) => (
                                <div key={each.id}>
                                    <Link
                                        style={{
                                            textDecoration: "none",
                                            color: "white",
                                            fontFamily: "sans-serif",
                                        }}
                                        to={`/user/${each.sender_id}`}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                        >
                                            <div style={{}}>
                                                <img
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        borderRadius: "50%",
                                                    }}
                                                    src={
                                                        each.image ||
                                                        "static/images/profile.png"
                                                    }
                                                    alt={
                                                        each.first +
                                                        "" +
                                                        each.last
                                                    }
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    borderRadius: "5px",
                                                    padding: "5px",
                                                    margin: "5px 10px",
                                                    backgroundColor:
                                                        " rgba(0,0,0,0.2)",
                                                }}
                                            >
                                                <p>
                                                    {each.first} {each.last}:
                                                </p>
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
                        style={{
                            marginTop: "10px",
                            width: "500px",
                            height: "120px",
                            backgroundColor: "black",
                            color: "#00FF41",
                            fontFamily: "sans-serif",
                            fontWeight: "bold",
                            fontSize: "15px",
                            borderRadius: "8px",
                        }}
                        onKeyDown={enterKey}
                        placeholder="Chat..."
                    />
                </div>
            </div>
        </>
    );
}
