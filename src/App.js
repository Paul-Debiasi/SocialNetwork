import React from "react";
import Logo from "./components/logo";
import ProfilePic from "./components/ProfilePic";
import Uploader from "./components/Uploader";
import axios from "./axios";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // firstName: "Paulito",
            // lastName: "Debiasito",
            // imgUrl: "https://picsum.photos/200/300",
            uploaderIsVisible: false,
        };
    }
    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                const { first, last, email, id, image } = data;
                this.setState({
                    first: first,
                    last: last,
                    email: email,
                    id: id,
                    imgUrl: image,
                });
                console.log("this.state", this.state);
            })
            .catch((err) => {
                console.log("Err on my componentDidMount:", err);
            });
        console.log("App just mounted");
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
        // console.log("My Log");
        // // console.log("e", e.target.name);

        // // console.log("formData", formData);
        // axios
        //     .post("/images", formData)
        //     .then((res) => {
        //         console.log("Submit is running ");
        //         this.handleChange(e);
        //         console.log("res", res);
        //     })
        //     .catch(({ message }) => {
        //         console.log("err", message);
        //     });
    }

    render() {
        const { firstName, lastName, imgUrl, uploaderIsVisible } = this.state;

        return (
            <React.Fragment>
                <Logo />
                <ProfilePic
                    firstName={firstName}
                    lastName={lastName}
                    imgUrl={imgUrl}
                    triggerUploader={() => this.toggleUploader()}
                />
                {uploaderIsVisible && (
                    <Uploader
                        closeUploader={() => this.closeUploader()}
                        firstName={firstName}
                        // uploadImage={(e) => this.uploadImage(e)}
                        submit={() => this.submit()}
                        handleChange={(e) => this.handleChange(e)}
                    />
                )}
            </React.Fragment>
        );
    }
}
