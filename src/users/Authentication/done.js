import React, { useEffect, useState } from 'react';
import "../assets/css/style.css";
import loginimg from "../assets/images/image.jpg";
import logoimg from "../assets/images/logo.png";
import doneimg from "../assets/images/done.png";
import { Link } from 'react-router-dom';
function Done() {
  return (
    <div>
      <title>Done</title>
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
            <div className="done-image-div">
              <img src={doneimg} alt />
            </div>
            <div className="done-content">
              <h5 className="done-title">Done..!!</h5>
              <p className="done-para">Offering a wide range of Digital Marketing and
                Web Development Courses, build your career with
                Kerala’s most trusted Agency Based Digital Academy.</p>
              <p className="done-para">Go to <Link to={"/plain/student/login"} className="text-success">Login</Link></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Done;