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
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "40px",
                marginBottom: "40px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "white",
                    fontFamily: "sans-serif",
                    fontWeight: "100",
                    backgroundColor: "rgba(0,0,0,0.3)",
                    padding: "40px 0",
                    width: "500px",
                    borderRadius: "24px",
                }}
            >
                <h1 style={{ marginBottom: "16px" }}>
                    {firstName} {lastName}
                </h1>
                <ProfilePic
                    classValue="Maxi"
                    imgUrl={imgUrl}
                    triggerUploader={() => this.toggleUploader()}
                />

                <h2 onClick={toggleBio}>BYO</h2>
                <h3 style={{ margin: "10px 15px" }}>{bio}</h3>
                {isBioVisible && (
                    <BioEditor
                        bio={bio}
                        handleBioChange={handleBioChange}
                        submitBio={submitBio}
                    />
                )}
            </div>
        </div>
    </>
);

export default Profile;
