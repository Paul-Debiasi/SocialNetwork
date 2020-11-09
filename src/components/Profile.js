import React from "react";
import BioEditor from "./BioEditor";
import { Link } from "react-router-dom";

const Profile = ({ firstName, lastName, profilePic, toggleBio }) => (
    <>
        <div>My profile </div>
        <span onClick={toggleBio}>
            Hello there {firstName} {lastName}
        </span>
        {profilePic}
        {/* <ProfilePic /> */}
        <BioEditor toggleBio={toggleBio} />
    </>
);

export default Profile;
