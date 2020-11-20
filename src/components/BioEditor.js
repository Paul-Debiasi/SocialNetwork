import React from "react";

const BioEditor = ({ handleBioChange, submitBio, bio }) => (
    <>
        <form>
            <textarea
                style={{
                    width: "400px",
                    height: "160px",
                    backgroundColor: "black",
                    color: "#00FF41",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: "15px",
                    marginTop: "16px",
                }}
                value={bio}
                name="bio"
                onChange={handleBioChange}
            ></textarea>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <button
                    style={{
                        width: "400px",
                        marginTop: "8px",
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        letterSpacing: "4px",
                    }}
                    className="link-header"
                    onClick={submitBio}
                >
                    <p style={{ marginTop: "4px" }}> SUBMIT</p>
                </button>
            </div>
        </form>
    </>
);

export default BioEditor;
