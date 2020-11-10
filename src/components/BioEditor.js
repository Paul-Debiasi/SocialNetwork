import React from "react";

const BioEditor = ({ handleBioChange, submitBio, bio }) => (
    <>
        <form>
            <textarea
                value={bio}
                name="bio"
                onChange={handleBioChange}
            ></textarea>
            <button onClick={submitBio}>SUBMIT</button>
        </form>
    </>
);

export default BioEditor;
