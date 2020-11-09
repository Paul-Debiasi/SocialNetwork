import React from "react";
import BioEditor from "./BioEditor";
import ProfilePic from "./ProfilePic";
import { Link } from "react-router-dom";

const Profile = ({ firstName, lastName, isBioVisible, imgUrl, toggleBio }) => (
    <>
        <div>My profile</div>
        <span onClick={toggleBio}>
            Hello there {firstName} {lastName}
        </span>
        <ProfilePic imgUrl={imgUrl} />
        {isBioVisible && <BioEditor />}
    </>
);

export default Profile;
