import React, { useEffect, useState } from 'react';
import "../assets/css/style.css";
import loginimg from "../assets/images/image.jpg";
import logoimg from "../assets/images/logo.png";

function Reset() {
  return (
    <div>
      <title>Reset</title>
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
              <form className="login-form login-form-res">
                <input className="form-control form-control-lg" type="text" placeholder="new password" />
                <input className="form-control form-control-lg" type="text" placeholder="confirm password" />
                <a href="done.html"> <button type="button" className="btn btn-login">Reset Password</button></a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reset;
