import React from "react";

const BioEditor = ({ handleChange, submit, isBioVisible, toggleBio }) => (
    <>
        <form>
            <textarea name="Bio" onChange={handleChange}></textarea>
            <button onClick={submit}>SUBMIT</button>
        </form>
    </>
);

export default BioEditor;
