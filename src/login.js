import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {};
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // console.log("e.target.value", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in the callback:", this.state)
        );
    }

    submit() {
        console.log("about to submit!!!");
        axios
            .post("/login", this.state)
            .then((response) => {
                console.log("response", response);
                if (response.data.success) {
                    // then we want to redirect the user to our social network
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((e) => console.log(e));
    }

    render() {
        console.log("this.state.error: ", this.state.error);
        return (
            <div>
                {/* <Logo /> */}
                <div className="updated">
                    <div></div>
                    <h2>LOG IN</h2>
                    {/* <Link to="/welcome#">Click here to Register!</Link> */}
                </div>
                {this.state.error && <div>Oops, something went wrong!</div>}
                <div className="reg-form">
                    <div className="first-form">
                        <input
                            name="email"
                            placeholder="email..."
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                        <input
                            name="password"
                            placeholder="password"
                            type="password"
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                        <button onClick={() => this.submit()}>LOG IN!</button>
                        <Link className="log-link" to="/ResetPassword">
                            Reset your Password!
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
