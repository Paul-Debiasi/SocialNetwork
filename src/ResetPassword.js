import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            ResetPassword: 0,
        };
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

    submit(path) {
        console.log("about to submit!!!");
        axios
            .post(`${path}`, this.state)
            .then((response) => {
                console.log("response", response);
                if (response.data.success) {
                    this.setState({
                        ResetPassword: this.state.ResetPassword + 1,
                        // errorMessage: null,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((e) => console.log(e));
    }

    handleState() {
        if (this.state.ResetPassword == 0) {
            return (
                <div>
                    <h2>Reset your Password</h2>
                    <h4>
                        Please enter the email address with which you registered
                    </h4>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        placeholder="Email"
                        name="email"
                    ></input>
                    <button
                        onClick={() => this.submit("/password/reset/start")}
                    >
                        SUBMIT
                    </button>
                </div>
            );
        } else if (this.state.ResetPassword == 1) {
            return (
                <div>
                    {/*  */}
                    <h2>Reset Password</h2>
                    <h4>Please enter the code you received</h4>
                    <input name="code" placeholder="code"></input>
                    <h4>Please enter a new Password</h4>
                    <input
                        name="password"
                        onChange={(e) => this.handleChange(e)}
                        type="password"
                        placeholder="Password"
                    ></input>
                    <button
                        onClick={() => this.submit("/password/reset/verify")}
                    >
                        SUBMIT
                    </button>
                </div>
            );
        } else if (this.state.ResetPassword == 2) {
            return (
                <div>
                    {/*  */}
                    <h4>Success!</h4>
                    <p>
                        You can now <Link to="/login">log in</Link> with your
                        new Password
                    </p>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                <h1>RESET YOUR PASSWORD</h1>
                {this.handleState()}
            </div>
        );
    }
}
