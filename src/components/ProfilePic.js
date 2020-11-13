import React from "react";

const ProfilePic = ({ firstName, lastName, imgUrl, triggerUploader }) => (
    <>
        <img
            src={imgUrl || "static/images/profile.png"}
            alt={`${firstName} ${lastName}`}
            onClick={triggerUploader}
        />
    </>
);

export default ProfilePic;
