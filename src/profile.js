import React from "react";

export default function Profile(props) {
    return (
        <>
            <div>My profile component</div>
            <span>
                Hello there {props.first} {props.last}
            </span>
        </>
    );
}
