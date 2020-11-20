import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getList, acceptFriend, unfriend } from "../actions";
import Profile from "./Profile";
export default function Friends() {
    const dispatch = useDispatch();

    console.log("My console");

    let friends = useSelector(
        (state) =>
            state.friendsList &&
            state.friendsList.filter((each) => each.accepted)
    );
    let wannabes = useSelector(
        (state) =>
            state.receivedRequests &&
            state.receivedRequests.filter((each) => each.accepted == false)
    );

    let sentRequests = useSelector(
        (state) =>
            state.sentRequests && state.sentRequests.filter((each) => each)
    );

    useEffect(() => {
        dispatch(getList());
    }, []);

    return (
        <>
            <div style={{}}>
                <div>
                    <h1
                        style={{
                            textAlign: "center",
                            fontWeight: "100",
                            fontFamily: "sans-serif",
                            letterSpacing: "3px",
                            color: "white",
                        }}
                    >
                        {" "}
                        Friends requests:{" "}
                    </h1>
                    <div>
                        {wannabes &&
                            wannabes.map((each) => (
                                <div
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: "center",
                                    }}
                                >
                                    <div
                                        // style={{
                                        //     width: "1100px",
                                        //     display: "flex",
                                        //     flexWrap: "wrap",
                                        //     justifyContent: "space-between",
                                        // }}
                                        key={each.id}
                                    >
                                        <div>
                                            <Link to={`/user/${each.id}`}>
                                                <Profile
                                                    key={each.id}
                                                    title={`Profile: ${each.last}`}
                                                    imgUrl={each.image}
                                                    firstName={each.first}
                                                    lastName={each.last}
                                                />
                                            </Link>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                <div style={{ margin: "5px" }}>
                                                    <button
                                                        className="link-header"
                                                        onClick={() =>
                                                            dispatch(
                                                                acceptFriend(
                                                                    each.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        {" "}
                                                        <div
                                                            style={{
                                                                marginTop:
                                                                    "4px",
                                                                fontFamily:
                                                                    "sans-serif",
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            Accept
                                                        </div>
                                                    </button>
                                                </div>
                                                <div style={{ margin: "5px" }}>
                                                    <button
                                                        className="link-header"
                                                        onClick={() =>
                                                            dispatch(
                                                                unfriend(
                                                                    each.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                marginTop:
                                                                    "4px",
                                                                fontFamily:
                                                                    "sans-serif",
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            {" "}
                                                            Reject
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div style={{}}>
                    {/* bjbKJBNFJSVJnjvnjdnvjnjdnvjJKNSDKJNCjhsnvjhdNFVKJDNFVJKNDFVKJDJKNVDJKNVDJFK>NVJDKNVKJDFNVK.JNDVJDV */}
                    <h1
                        style={{
                            textAlign: "center",
                            fontWeight: "100",
                            fontFamily: "sans-serif",
                            letterSpacing: "3px",
                            color: "white",
                        }}
                    >
                        {" "}
                        Sent requests:{" "}
                    </h1>
                    <div>
                        {sentRequests &&
                            sentRequests.map((each) => (
                                <div
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: "center",
                                    }}
                                >
                                    <div key={each.id}>
                                        <Link to={`/user/${each.id}`}>
                                            <Profile
                                                key={each.id}
                                                title={`Profile: ${each.last}`}
                                                imgUrl={each.image}
                                                firstName={each.first}
                                                lastName={each.last}
                                            />
                                        </Link>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <div>
                                                <button
                                                    className="link-header"
                                                    onClick={() =>
                                                        dispatch(
                                                            unfriend(each.id)
                                                        )
                                                    }
                                                >
                                                    {" "}
                                                    <div
                                                        style={{
                                                            marginTop: "4px",
                                                            fontFamily:
                                                                "sans-serif",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Cancel
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div>
                    {/* BUEVuwrbvbaenvjnadbkjvnadnvjanfiuchwIUFCHwIEfchJfcjvjdnvjndvjndjvndhfvhdfvbd.hjfvbhjdfvbhdfbv */}
                    {friends && (
                        <h1
                            style={{
                                textAlign: "center",
                                fontWeight: "100",
                                fontFamily: "sans-serif",
                                letterSpacing: "3px",
                                color: "white",
                            }}
                        >
                            {" "}
                            Friends:{" "}
                        </h1>
                    )}
                    <div>
                        {friends &&
                            friends.map((each) => (
                                <div
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: "center",
                                        marginBottom: "40px",
                                    }}
                                >
                                    <div key={each.id}>
                                        <Link to={`/user/${each.id}`}>
                                            <Profile
                                                key={each.id}
                                                title={`Profile: ${each.last}`}
                                                imgUrl={each.image}
                                                firstName={each.first}
                                                lastName={each.last}
                                            />
                                        </Link>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <div>
                                                <button
                                                    className="link-header"
                                                    onClick={() =>
                                                        dispatch(
                                                            unfriend(each.id)
                                                        )
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            marginTop: "4px",
                                                            fontFamily:
                                                                "sans-serif",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Remove
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
