import { useStatefulFields } from "../useStatefulFields";
// import db = require("../../db.js");
import React, { useState, useEffect } from "react";
// import { useAuthSubmit } from "../useAuthSubmit";
// import React from "react";
import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import axios from "axios";
import Logo from "./logo";
const FindPeople = () => {
    const [values, handleChange] = useStatefulFields();
    const [error, setError] = useState();
    const [users, setUsers] = useState([]);

    const { value } = values;

    useEffect(() => {
        let abort;
        if (value) {
            axios
                .get(`/api/users/${value}`)
                .then(({ data }) => {
                    setUsers(data);
                    console.log("Data on the II useEffect:", data);
                })
                .catch((err) => {
                    console.log(`THE ERROR: ${err}`);
                });
        } else {
            (async () => {
                // try {
                let { data } = await axios.get("/api/users");
                console.log("Data on my users route:", data);
                await setUsers(data);
                // } catch (err) {
                //     console.log("err in useEffect() axios /api/users", err);
                // }
            })();
        }
    }, [value]);
    console.log("users", users);
    /* ... */

    return (
        <>
            <input
                type="search"
                autoComplete="off"
                onChange={handleChange}
                name="value"
                placeholder="Other users"
            />{" "}
            <br></br>
            <div>
                {users.map((eachUser) => (
                    <Link
                        key={eachUser.id}
                        to={`/user/${eachUser.id}`}
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <Profile
                            key={eachUser.id}
                            title={`Profile: ${eachUser.last}`}
                            imgUrl={eachUser.image}
                            firstName={eachUser.first}
                            lastName={eachUser.last}
                        />
                    </Link>
                ))}
            </div>
        </>
    );
};

export default FindPeople;
