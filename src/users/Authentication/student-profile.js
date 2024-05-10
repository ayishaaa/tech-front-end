import React, { useEffect, useState } from 'react';
import "../assets/css/style.css";
import { Toaster, toast } from 'react-hot-toast';
import logoimg from "../assets/images/logo.png";
import dashboardimg from "../assets/images/dashboard-icon.png";
import studentimg from "../assets/images/student.png";
import paymentimg from "../assets/images/payment-icon.png";
import profileimg from "../assets/images/profile-icon.png";
import moreimg from "../assets/images/more-menu-icon.png";
import logoutimg from "../assets/images/logout-icon.png";
import batchimg from "../assets/images/batch.png";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Navigation/header';
import Footer from './Navigation/footer';

function AdminUserProfile() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const [userprofile, setUserProfile] = useState([]);
    const { id } = useParams();
    const currentDate = new Date();
    const navigate = useNavigate();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    useEffect(() => {
        const token = localStorage.getItem('usertoken');
        axios.defaults.headers.common["Authorization"] = token;

        axios
            .get(`${backendUrl}/users/homescreen`, {
                params: {
                    token: token,
                    deviceId: "123"
                }
            })
            .then((response) => {
                setUserProfile(response.data.userProfile);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

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
            <title>Dashboard-home</title>
            <section className="dashboard-home">
                <div className="row">
                    <div className="col-md-2 col-sm-12 dashboard-left-menu">
                        <Header />
                    </div>
                    <div className="col-md-10 col-sm-12 ">
                        <div className="dashboard-right-items row">
                            <div className="col-md-6">
                                <div className="right-content">
                                    <h3>Hello {userprofile.name} !</h3>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="user-info" onClick={goToStudentProfile}>
                                    <div className="user-image-div">
                                        <img alt="..."
                                            src={`${backendUrl}/${userprofile.image}`}
                                        />
                                    </div>
                                    <div className="user-text">
                                        <h6>{userprofile.name}</h6>
                                        <p>{userprofile.role && userprofile.role?.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-body">
                            <div className="row student-full-top">
                                <div className="col-lg-9 col-md-12 col-sm-12">
                                    <div className="student-full-outer">
                                        <div className="student-full-image-div">
                                            <img src={`${backendUrl}/${userprofile.image}`} style={{ width: "78%", height: "auto" }} alt />
                                        </div>
                                        <div className="student-full-text-div">
                                            <h5>{userprofile.name}</h5>
                                            <p>{userprofile.username}</p>
                                            <div className="btn-full-det-div">
                                                <button> <img src={batchimg} alt />{userprofile.role && userprofile.role?.role}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12">
                                    <div className="batch-card-outer">                                        <p>Description: </p><p>{userprofile.description}</p>
                                        <div className="time-div">
                                            <p>{formattedDate}</p>
                                            <p>{formattedTime}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-12 col-sm-12 mb-3 ">
                                    <div className="full-det-outer">
                                        <p> <span>Address :</span>{userprofile.address}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 mb-3 ">
                                    <div className="full-det-outer">
                                        <p> <span>Email :</span>{userprofile.email}</p>
                                        <p> <span>Contact No :</span>{userprofile.phone}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 mb-3 ">
                                    <div className="full-det-outer">
                                        <p> <span>State :</span>{userprofile.state}</p>
                                        <p> <span>Country :</span>{userprofile.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminUserProfile;
