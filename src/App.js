import React from "react";
import Logo from "./components/logo";
import ProfilePic from "./components/ProfilePic";
import Uploader from "./components/Uploader";
import axios from "./axios";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Profile from "./components/Profile";
import OtherProf from "./components/OtherProf";
import FindPeople from "./components/FindPeople";
// import BioEditor from "./components/BioEditor";
// import { response } from "express";
import Friends from "./components/Friends";
import Chat from "./components/Chat";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            isBioVisible: false,
        };
    }
    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                const { first, last, email, id, image, bio } = data;
                this.setState({
                    first: first,
                    last: last,
                    email: email,
                    id: id,
                    imgUrl: image,
                    bio: bio,
                });
                console.log("this.state", this.state);
            })
            .catch((err) => {
                console.log("Err on my componentDidMount:", err);
            });
        console.log("App just mounted");
    }

    toggleBio() {
        console.log("isBioVisible", this.state.isBioVisible);
        this.setState({
            isBioVisible: !this.state.isBioVisible,
        });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: true,
        });
        console.log(this.state.uploaderIsVisible);
    }

    closeUploader() {
        this.setState({
            uploaderIsVisible: false,
        });
    }
    handleChange(e) {
        // console.log("e.target.value", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.files[0],
            },
            () => console.log("this.state in the callback:", this.state)
        );
    }
    handleBioChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        () => console.log("this.state on handleBioChange:", this.state);
    }
    submitBio() {
        axios
            .post("/bio", this.state)
            .then((response) => {
                console.log("The post is working!");
                this.setState({
                    bio: response.data.bio,
                    isBioVisible: true,
                });
            })
            .catch((err) => {
                console.log("Error on submitBio:", err);
            });
    }

    submit() {
        let formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("id", this.state.id);
        console.log("Submit:", this.state.file);
        console.log("formData:", formData);

        axios
            .post("/images", formData)
            .then((response) => {
                console.log("Running!");
                this.setState({
                    imgUrl: response.data.image,
                    uploaderIsVisible: false,
                });
                console.log("ImgUrl:", response);
            })
            .catch((err) => {
                console.log("Catch my err:", err);
            });
    }

    render() {
        const {
            first,
            last,
            imgUrl,
            uploaderIsVisible,
            isBioVisible,
            bio,
        } = this.state;
        <div className="header">
            <Logo />
            <ProfilePic
                firstName={first}
                lastName={last}
                imgUrl={imgUrl}
                triggerUploader={() => this.toggleUploader()}
            />
        </div>;

        return (
            <React.Fragment>
                <BrowserRouter>
                    <div className="header">
                        {/* <div> */}
                        <Logo />
                        {/* </div> */}
                        <div
                            className="header-links"
                            style={{ paddingTop: "16px" }}
                        >
                            <div className="link-header">
                                <Link to="/chat">CHAT</Link>
                            </div>
                            <div className="link-header link-header-users">
                                <Link to="/users">FIND MORE USERS</Link>
                            </div>
                            <div className="link-header">
                                <Link to="/friend">FRIENDS</Link>
                            </div>
                        </div>
                        <div>
                            <ProfilePic
                                classValue="Mini"
                                firstName={first}
                                lastName={last}
                                imgUrl={imgUrl}
                                triggerUploader={() => this.toggleUploader()}
                            />
                        </div>
                    </div>
                    <Route path="/friend" component={Friends} />
                    <Route path="/users" component={FindPeople} />

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                title="My profile"
                                triggerUploader={() => this.toggleUploader()}
                                handleBioChange={(e) => this.handleBioChange(e)}
                                submitBio={() => this.submitBio()}
                                toggleBio={() => this.toggleBio()}
                                isBioVisible={isBioVisible}
                                firstName={first}
                                lastName={last}
                                imgUrl={imgUrl}
                                bio={bio}
                            />
                        )}
                    />

                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProf
                                key={props.match.image}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <Route path="/chat" component={Chat} />
                </BrowserRouter>
                {/* <ProfilePic
                        imgUrl={imgUrl}
                        triggerUploader={() => this.toggleUploader()}
                    />
                    <BioEditor
                        Bio={bio}
                        handleBioChange={(e) => this.handleBioChange(e)}
                        submitBio={() => this.submitBio()}
                    />
                </Profile> */}

                {uploaderIsVisible && (
                    <Uploader
                        closeUploader={() => this.closeUploader()}
                        firstName={first}
                        imgUrl={imgUrl}
                        submit={() => this.submit()}
                        handleChange={(e) => this.handleChange(e)}
                    />
                )}
            </React.Fragment>
        );
    }
}
