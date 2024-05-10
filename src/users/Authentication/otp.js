import React, { useEffect, useState } from 'react';
import "../assets/css/style.css";
import loginimg from "../assets/images/image.jpg";
import logoimg from "../assets/images/logo.png";
import loginicon from "../assets/images/login-icon.png";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function Otp() {
  const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
  const [email, setEmail] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpValueserr, setOtpValuesErr] = useState(['', '', '', '']);
  const [newPassworderr, setNewPasswordErr] = useState('');
  const [confirmPassworderr, setConfirmPasswordErr] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    setEmail(storedEmail);
  }, []);

  const handleChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    if (value && index < newOtpValues.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
    setOtpValues(newOtpValues);

  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    let formIsValid = true;
    if (!otpValues) {
      setOtpValuesErr("OTP is required");
      formIsValid = false;
    } else {
      setOtpValuesErr("");
    }
    if (!newPassword) {
      setNewPasswordErr("New Password is required");
      formIsValid = false;
    } else {
      setNewPasswordErr("");
    }
    if (!confirmPassword) {
      setConfirmPasswordErr("Confirm Password is required");
      formIsValid = false;
    } else {
      setConfirmPasswordErr("");
    }
    var UserLogin = {
      email: email,
      otp: otpValues.join(''),
      newpass: newPassword,
      conpass: confirmPassword
    };
    axios
      .post(`${backendUrl}/users/resetpassword`, UserLogin)
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('email')
          window.location.href = "/pswplain/student/done";
        }
      })
      .catch((error) => {
        setError("Invalid Email");
        if (error.response && error.response.status === 400) {
          setError(error.response.data.message);
        }
      });
  };

  const sendSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      setError("Enter email");
    } else {
      var UserLogin = { email: email };
      axios
        .post(`${backendUrl}/users/forgotpassword`, UserLogin)
        .then((response) => {
          if (response.status === 200) {
            navigate("/plain/student/done");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setError(error.response.data.messages);
          }
        });
    }
  };
  return (
    <div>
      <title>otp</title>
      <section className="login">
        <div className="row login-row">
          <div className="col-md-7 col-sm-12">
            <div className="login-image-div">
              <img className="w-100" src={loginimg} alt="" />
            </div>
          </div>
          <div className="col-md-5 col-sm-12 right-col">
            <div className="logo-div">
              <img src={logoimg} alt="" />
            </div>
            <div className="form-div">

              <form className="login-form">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="enter your mail"
                  value={email}
                  readOnly
                // onChange={(e) => setEmail(e.target.value)}
                />
                <p className="otp-title">Enter Verification Code</p>
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    className="otp-form"
                    type="text"
                    placeholder={value}
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                ))}
                {otpValueserr && <p style={{ color: "red" }}>{otpValueserr}</p>}
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {newPassworderr && <p style={{ color: "red" }}>{newPassworderr}</p>}
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassworderr && <p style={{ color: "red" }}>{confirmPassworderr}</p>}
                <p className="resend-para">If didn't receive a code <Link to="#" onClick={sendSubmit}>Resend</Link></p>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button
                  type="button"
                  className="btn btn-login"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Otp;
