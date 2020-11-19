import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getList, acceptFriend, unfriend } from "../actions";

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
            <h1 style={{ textAlign: "center" }}> Friends requests: </h1>
            <div>
                {wannabes &&
                    wannabes.map((each) => (
                        <div key={each.id}>
                            <Link to={`/user/${each.id}`}>
                                <img
                                    style={{
                                        maxWidth: "110px",
                                    }}
                                    src={
                                        each.image ||
                                        "static/images/profile.png"
                                    }
                                />
                                <br />
                                <p style={{ marginTop: "5px" }}>
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button
                                onClick={() => dispatch(acceptFriend(each.id))}
                            >
                                Accept
                            </button>
                            <br></br>
                            <button onClick={() => dispatch(unfriend(each.id))}>
                                Reject
                            </button>
                        </div>
                    ))}
            </div>

            <h1 style={{ textAlign: "center" }}> Sent requests: </h1>
            <div>
                {sentRequests &&
                    sentRequests.map((each) => (
                        <div key={each.id} className="section">
                            <Link to={`/user/${each.id}`}>
                                <img
                                    style={{
                                        maxWidth: "110px",
                                    }}
                                    src={
                                        each.image ||
                                        "static/images/profile.png"
                                    }
                                />
                                <br />
                                <p>
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button onClick={() => dispatch(unfriend(each.id))}>
                                Cancel
                            </button>
                        </div>
                    ))}
            </div>

            {friends && <h1 style={{ textAlign: "center" }}> Friends: </h1>}
            <div>
                {friends &&
                    friends.map((each) => (
                        <div key={each.id}>
                            <Link to={`/user/${each.id}`}>
                                <img
                                    src={
                                        each.image ||
                                        "static/images/profile.png"
                                    }
                                />
                                <br />
                                <p>
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button onClick={() => dispatch(unfriend(each.id))}>
                                Remove
                            </button>
                        </div>
                    ))}
            </div>
        </>
    );
}
