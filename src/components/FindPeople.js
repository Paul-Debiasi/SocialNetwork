import { useStatefulFields } from "../useStatefulFields";
// import db = require("../../db.js");
import React, { useState, useEffect } from "react";
// import { useAuthSubmit } from "../useAuthSubmit";
// import React from "react";
import Profile from "../components/Profile";
import axios from "axios";

const FindPeople = () => {
    const [values, handleChange] = useStatefulFields();
    const [error, setError] = useState();
    const [users, setUsers] = useState();

    const { value } = values;
    // console.log("values", value);
    useEffect(() => {
        let abort;

        axios
            .get(`/api/users/${value}`)
            .then(({ data }) => {
                console.log("mydata", data);
                if (!data.success) {
                    setError(data.error);
                } else {
                    setError(false);
                }

                setUsers(data);
            })
            .catch((err) => {
                console.log(`THE ERROR: ${err}`);
            });
    }, [value]);
    console.log("users", users);
    /* ... */

    return (
        <>
            <input
                onChange={handleChange}
                name="value"
                placeholder="Other users"
            />{" "}
            <br></br>
            <div>
                {users?.rows?.map(({ first, last, image }, index) => (
                    <Profile
                        key={index}
                        title={`Profile: ${last}`}
                        imgUrl={image}
                        firstName={first}
                        lastName={last}
                    />
                ))}
            </div>
        </>
    );
};

export default FindPeople;
