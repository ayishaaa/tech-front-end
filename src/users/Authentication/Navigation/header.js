import React, { useEffect, useState } from 'react';
import "../../assets/css/style.css";
import { Toaster, toast } from 'react-hot-toast';
import logoimg from "../../assets/images/logo.png";
import dashboardimg from "../../assets/images/dashboard-icon.png";
import studentimg from "../../assets/images/student.png";
import paymentimg from "../../assets/images/payment-icon.png";
import profileimg from "../../assets/images/profile-icon.png";
import moreimg from "../../assets/images/more-menu-icon.png";
import logoutimg from "../../assets/images/logout-icon.png";
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate("");
    const goToDashboardHome = () => {
        window.location.href = '/plain/student/dashboard-home';
    };

    const goToStudentListing = () => {
        window.location.href = '/plain/student/student-listing';
    };

    const goToPaymentListing = () => {
        window.location.href = '/plain/student/payment-details';
    };

    const goToStudentProfile = () => {
        window.location.href = '/plain/student/student-profile';
    };

    const goToLogOut = () => {
        toast((t) => (
            <span>
                <p>Are you sure you want to logout?</p>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <button style={{ padding: "4%", backgroundColor: "#4DBA61", color: "white" }} onClick={handleLogout}>Yes</button>
                    <button style={{ padding: "4%", backgroundColor: "#F62121", color: "white" }} onClick={() => toast.dismiss(t.id)}>
                        Dismiss
                    </button>
                </div>
            </span>
        ));
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem("usertoken");
            localStorage.removeItem("userProfile");

            navigate("/plain/student/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div>
            <Toaster />
            <title>Done</title>
            <section className="login">
                
                    <div className="dashboard-logo-div">
                        <img src={logoimg} alt />
                    </div>
                    <ul className="dashboard-menu-ul">
                        <li onClick={goToDashboardHome}><img src={dashboardimg} alt />Dashboard</li>
                        <li onClick={goToStudentListing}><img src={studentimg} alt />Students</li>
                        <li onClick={goToPaymentListing}><img src={paymentimg} alt />Payment</li>
                        <li onClick={goToStudentProfile}><img src={profileimg} alt /> Profile</li>
                        <li><img src={moreimg} alt />More Menu</li>
                        <li onClick={goToLogOut}><img src={logoutimg} alt />Log Out</li>
                    </ul>
                    <nav className="navbar1 navbar-expand-lg navbar-light bg-white">
                        <a className="navbar-brand" href="#"> <img src={logoimg} alt /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item active" onClick={goToDashboardHome}>
                                    <img className="mr-3" src={dashboardimg} alt="Dashboard" /> Dashboard
                                </li>
                                <li className="nav-item" onClick={goToStudentListing}>
                                    <img className="mr-3" src={studentimg} alt="Students" /> Students
                                </li>
                                <li className="nav-item" onClick={goToPaymentListing}>
                                    <img className="mr-3" src={paymentimg} alt="Payment" /> Payment
                                </li>
                                <li className="nav-item" onClick={goToStudentProfile}>
                                    <img className="mr-3" src={profileimg} alt="Profile" /> Profile
                                </li>
                                <li className="nav-item">
                                    <img className="mr-3" src={moreimg} alt />More Menu
                                </li>
                            </ul>
                        </div>
                    </nav>
            </section>
        </div>
    )
}

export default Header;

