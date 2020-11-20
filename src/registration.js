import React from "react";
// import axios from "axios";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
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
            .post("/register", this.state)
            .then((response) => {
                console.log("response", response);
                if (response.data.success) {
                    // then we want to redirect the user to our social network
                    location.replace("/logo");
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
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="updated">
                    <h2 style={{ fontFamily: "sans-serif", fontWeight: "100" }}>
                        Keep Updated on the tech News !
                    </h2>
                </div>
                {this.state.error && <div>Oops, something went wrong!</div>}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "560px",
                        alignContent: "center",
                    }}
                    className="reg-form"
                >
                    <div className="first-form" style={{ width: "100%" }}>
                        <div className="fist-name">
                            <input
                                autoComplete="off"
                                style={{
                                    width: "100%",
                                    height: "35px",
                                    backgroundColor: "black",
                                    color: "#00FF41",
                                    fontSize: "24px",
                                }}
                                name="first"
                                placeholder="first name..."
                                onChange={(e) => this.handleChange(e)}
                            ></input>
                        </div>
                        <div className="last-name">
                            <input
                                autoComplete="off"
                                style={{
                                    width: "100%",
                                    height: "35px",
                                    backgroundColor: "black",
                                    color: "#00FF41",
                                    fontSize: "24px",
                                }}
                                name="last"
                                placeholder="last name..."
                                onChange={(e) => this.handleChange(e)}
                            ></input>
                        </div>
                        <div className="email-inp">
                            <input
                                style={{
                                    width: "100%",
                                    height: "35px",
                                    backgroundColor: "black",
                                    color: "#00FF41",
                                    fontSize: "24px",
                                }}
                                name="email"
                                placeholder="email..."
                                onChange={(e) => this.handleChange(e)}
                            ></input>
                        </div>
                        <div className="psw-inp">
                            <input
                                style={{
                                    width: "100%",
                                    height: "35px",
                                    backgroundColor: "black",
                                    color: "#00FF41",
                                    fontSize: "24px",
                                }}
                                name="password"
                                placeholder="password"
                                type="password"
                                onChange={(e) => this.handleChange(e)}
                            ></input>
                        </div>
                        <button
                            style={{
                                width: "100%",
                                letterSpacing: "8px",
                                fontSize: "20px",
                                marginTop: "8px",
                                marginBottom: "8px",
                            }}
                            className="link-header"
                            onClick={() => this.submit()}
                        >
                            <div style={{ marginTop: "2px" }}> Register!</div>
                        </button>
                        <div className="login-link">
                            <Link className="log-link" to="/login">
                                <div
                                    style={{
                                        fontSize: "16px",
                                        fontFamily: "sans-serif",
                                    }}
                                >
                                    {" "}
                                    onClick => logIn!
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
