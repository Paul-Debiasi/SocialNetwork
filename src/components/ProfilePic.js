import React from "react";

const ProfilePic = ({
    firstName,
    lastName,
    imgUrl,
    triggerUploader,
    classValue,
}) => (
    <>
        <img
            src={imgUrl || "static/images/profile.png"}
            alt={`${firstName} ${lastName}`}
            onClick={triggerUploader}
            className={classValue}
            // style={{
            //     height: "100px",
            //     boxShadow: "0px 4px 16px 4px #000000",
            //     borderRadius: "24px",
            // }}
        />
    </>
);

export default ProfilePic;
