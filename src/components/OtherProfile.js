import React from "react";
import axios from "../axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("PROPS");
        console.log("otherprofile props ", this.props);
        axios
            .get(`/api/user/${this.props.key.params.id}`)
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
        return (
            <>
                <h1>Im an Evil-component</h1>
            </>
        );
    }
}
