import React from "react";

const BioEditor = ({ handleChange, submit, toggleBio }) => (
    <>
        <form>
            <textarea name="Bio" onChange={handleChange}></textarea>
            <button onClick={toggleBio}></button>
        </form>
    </>
);

export default BioEditor;
