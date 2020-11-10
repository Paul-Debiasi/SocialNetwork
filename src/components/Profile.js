import React from "react";
import BioEditor from "./BioEditor";
import ProfilePic from "./ProfilePic";
// import OtherProfile from "./components/OtherProfile";
import { Link } from "react-router-dom";

const Profile = ({
    submitBio,
    handleBioChange,
    firstName,
    lastName,
    isBioVisible,
    imgUrl,
    toggleBio,
    bio,
}) => (
    <>
        <div>My profile</div>
        <span onClick={toggleBio}>
            Hello there {firstName} {lastName}
        </span>
        <span>{bio}</span>
        <ProfilePic
            imgUrl={imgUrl}
            triggerUploader={() => this.toggleUploader()}
        />
        {isBioVisible && (
            <BioEditor
                bio={bio}
                handleBioChange={handleBioChange}
                submitBio={submitBio}
            />
        )}
    </>
);

export default Profile;
