import React, { useEffect, useState } from 'react';
import "../assets/css/style.css";
import loginimg from "../assets/images/image.jpg";
import logoimg from "../assets/images/logo.png";
import loginicon from "../assets/images/login-icon.png";
import axios from "axios";

function Login() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailerr, setEmailErr] = useState("");

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setError("Invalid email format");
            return;
        }
        if (email === "" || password === "") {
            setError("Enter email and password");
        } else {
            const UserLogin = { email: email, password };
            axios
                .post(`${backendUrl}/users/userlogin`, UserLogin)
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem("usertoken", response.data.token);
                        window.location.href = "/plain/student/dashboard-home";
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.data && error.response.data.messages) {
                        setError(error.response.data.messages);
                    }
                });
        };
    }

    return (
        <div>
            <title>login</title>
            <section className="login">
                <div className="row login-row">
                    <div className="col-md-7 col-sm-12">
                        <div className="login-image-div">
                            <img className="w-100" src={loginimg} alt />
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-12 right-col">
                        <div className="logo-div">
                            <img src={logoimg} alt />
                        </div>
                        <div className="form-div">
                            <div className="login-icon-div">
                                <img src={loginicon} alt />
                            </div>
                            <form className="login-form" onSubmit={handleSubmit}>
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="Email"
                                />
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    name="psw"
                                />
                                <div className="d-flex">
                                    <a className="ml-auto forgot-link" href="/pswplain/student/forgot"><p className="forgot-text">Forgot Password?</p></a>
                                </div>
                                {error && <p style={{ color: "red" }}>{error}</p>}
                                <button type="submit" className="btn btn-login">Log in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;
