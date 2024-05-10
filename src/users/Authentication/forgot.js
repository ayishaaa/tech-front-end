import React, { useEffect, useState } from 'react';
import "../assets/css/style.css";
import loginimg from "../assets/images/image.jpg";
import logoimg from "../assets/images/logo.png";
import loginicon from "../assets/images/login-icon.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const navigate = useNavigate();
  
  const sendSubmit = (event) => {
    event.preventDefault();
    console.log({ email });
    localStorage.setItem('email', email)
    if (email === "") {
      setError("Enter email");
    } else {
      var UserLogin = { email: email };
      axios
        .post(`${backendUrl}/users/forgotpassword`, UserLogin)
        .then((response) => {
          if (response.status === 200) {
            console.log("hello", response.data.email);
            navigate("/pswplain/student/otp", { state: { email } });

          }
        })
        .catch((error) => {
          setError("Invalid Email");
          if (error.response && error.response.status === 400) {
            setError(error.response.data.messages);
          }
        });
    }
  };

  return (
    <div>
      <title>forgot</title>
      <section className="login">
        <div className="row login-row">
          <div className="col-md-7 col-sm-12">
            <div className="login-image-div">
              <img className="w-100" src={loginimg} alt />
            </div>
          </div>
          <div className="col-md-5 col-sm-12 right-col rigt-res">
            <div className="logo-div">
              <img src={logoimg} alt />
            </div>
            <div className="form-div">
              <div className="login-icon-div">
                <img src={loginicon} alt />
              </div>
              <form className="login-form login-form-res">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="enter your mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="button" className="btn btn-login" onClick={sendSubmit}>Get Verification Code</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForgotPassword;