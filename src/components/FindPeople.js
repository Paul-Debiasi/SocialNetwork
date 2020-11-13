import { useStatefulFields } from "../useStatefulFields";

import React, {useState, useEffect } from "react";
// import { useAuthSubmit } from "../useAuthSubmit";
// import React from "react";
import axios from "axios";

export default function FindPeople(values) {
	const [values, handleChange] = useStatefulFields();
	const [error, setError] = useState();
    // const [error, handleSubmit] = useAuthSubmit("/users", values);
    useEffect(() => {
        let abort;
        (async () => {
            const { data } = await axios.get(`/api/users`, values);
            console.log("data");
            // if (!abort) {
            //     setUser(data.user);
            // }
        })();
        // return () => {
        //    let abort = true;
        //    (async()=>)
        // };
        // }, [id]);
    });

    /* ... */

    return (
        <div>
            {/* {error && <div>Oops! Something went wrong.</div>} */}
            <input
                onChange={handleChange}
                name="value"
                placeholder="Other users"
            />

            {/* <button onClick={handleSubmit}>submit</button> */}
        </div>
    );
}
return (
	<input onChange={handleChange} 
	       name="value"
	       placeholder="Other users">
</input>
		{users.map(
			user => (
				<div key={user.id}>
					{/* ... */}
				</div>
			)
		)}

		{/* ... */}
	</div>
);
