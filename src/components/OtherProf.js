import React from "react";
import axios from "../axios";
import FriendBtn from "./FriendBtn";

export default class OtherProf extends React.Component {
    constructor() {
        super();
        this.state = {
            id: null,
        };
    }
    componentDidMount() {
        console.log("PROPS");
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then((response) => {
                if (response.data.denied) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        first: response.data.first,
                        last: response.data.last,
                        image: response.data.image,
                        bio: response.data.bio,
                        id: response.data.id,
                    });
                }
            })
            .catch((err) => {
                console.log("error in obtaining individual user data: ", err);
            });
    }
    render() {
        // console.log("OtherProf");
        const { id, image, first, last, bio, btnText, submit } = this.state;
        return (
            <>
                <FriendBtn id={id} key={id} btnText={btnText} submit={submit} />
                <img src={image} />
                <p>
                    {first} {last}
                </p>

                <p>{bio}</p>
            </>
        );
    }
}
