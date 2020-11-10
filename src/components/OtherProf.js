import React from "react";
import axios from "../axios";

export default class OtherProf extends React.Component {
    constructor() {
        super();
        this.state = {};
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
        console.log("OtherProf");
        return (
            <>
                <img src={this.state.image} />
                <p>
                    {this.state.first} {this.state.last}
                </p>

                <p>{this.state.bio}</p>
            </>
        );
    }
}
