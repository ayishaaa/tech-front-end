import React, { useEffect, useState } from 'react';
import "../assets/css/style.css";
import coursecardimg from "../assets/images/course-card-image.png";
import coursecardpenimg from "../assets/images/course-card-pending.png";
import addstudentimg from "../assets/images/add-student-icon.png";
import notiimg from "../assets/images/noti-image.jpg";
import nusrathimg from "../assets/images/nusrath 1.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Navigation/footer';
import Header from './Navigation/header';

function DashboardHome() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const navigate = useNavigate();
    const [userprofile, setUserProfile] = useState([]);
    const [bannerdetails, setBannerDetails] = useState([]);
    const [coursecountactive, setCourseCountActive] = useState([]);
    const [studentcount, setStudentCount] = useState([]);
    const [batchcount, setBatchCount] = useState([]);
    const [feependingcount, setFeePendingCount] = useState([]);
    const [paymentpendingcount, setPaymentPendingCount] = useState([]);
    const [paymentpendingdetails, setPaymentPendingDetails] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("usertoken");
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
                setBannerDetails(response.data.bannerDetails);
                setCourseCountActive(response.data.courseCountActive);
                setStudentCount(response.data.studentCount);
                setBatchCount(response.data.batchCount);
                setFeePendingCount(response.data.feePendingCount);
                setPaymentPendingCount(response.data.paymentPendingCount);
                setPaymentPendingDetails(response.data.paymentPendingDetails);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const goToAddSudent = () => {
        window.location.href = '/plain/student/add-student';
    };

    const goToStudentProfile = () => {
        window.location.href = '/plain/student/student-profile';
    };


    return (
        <div>
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
                                    <p>{userprofile.role && userprofile.role?.role}.</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="user-info" onClick={goToStudentProfile}>
                                    <div className="user-image-div">
                                        <img
                                            alt="..."
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
                            <div className="row">
                                <div className="col-md-3 col-sm-12 course-col-res">
                                    <div className="course-card">
                                        <div className="course-card-image-div">
                                            <img src={coursecardimg} alt />
                                        </div>
                                        <div className="course-card-content-div">
                                            <p>Total Active Courses</p>
                                            <h5>{coursecountactive.toString().padStart(2, '0')}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12 course-col-res">
                                    <div className="course-card">
                                        <div className="course-card-image-div">
                                            <img src={coursecardimg} alt />
                                        </div>
                                        <div className="course-card-content-div">
                                            <p>Total Number of Batches</p>
                                            <h5>{batchcount.toString().padStart(2, '0')}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12 course-col-res">
                                    <div className="course-card-pending">
                                        <div className="course-card-image-div">
                                            <img src={coursecardpenimg} alt />
                                        </div>
                                        <div className="course-card-content-div">
                                            <p>Installment Pending</p>
                                            <h5>{feependingcount.toString().padStart(2, '0')}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12 course-col-res">
                                    <div className="course-card-pending">
                                        <div className="course-card-image-div">
                                            <img src={coursecardpenimg} alt />
                                        </div>
                                        <div className="course-card-content-div">
                                            <p>Payment Pending</p>
                                            <h5>{paymentpendingcount.toString().padStart(2, '0')}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="student-button">
                                <button type="button" onClick={goToAddSudent} className="btn btn-primary add-student-btn"> <img src={addstudentimg} alt />Add Student</button>
                            </div>
                            <div className="row">
                                <div className="col-lg-5 col-md-12">
                                    <div className="notification-card-outer">
                                        <div className="notification-div mb-3">
                                            <div className="noti-image-div">
                                                <img src={notiimg} alt />
                                            </div>
                                            <div className="noti-content-div">
                                                <h5>You have earned cashback!</h5>
                                                <p>Congratulations! Your purchases at Starbucks using Snapay have earned you some sweet $5 cashback.</p>
                                            </div>
                                        </div>
                                        <div className="notification-div mb-3">
                                            <div className="noti-image-div">
                                                <img src={notiimg} alt />
                                            </div>
                                            <div className="noti-content-div">
                                                <h5>You have earned cashback!</h5>
                                                <p>Congratulations! Your purchases at Starbucks using Snapay have earned you some sweet $5 cashback.</p>
                                            </div>
                                        </div>
                                        <div className="notification-div">
                                            <div className="noti-image-div">
                                                <img src={notiimg} alt />
                                            </div>
                                            <div className="noti-content-div">
                                                <h5>You have earned cashback!</h5>
                                                <p>Congratulations! Your purchases at Starbucks using Snapay have earned you some sweet $5 cashback.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-12">
                                    <div className="welcome-banner-outer">
                                        <div className="col-md-7 col-sm-12">
                                            <div className="welcome-content">
                                                <h3 style={{ marginBottom: "20px" }}>Welcome !</h3>
                                                <p style={{ textAlign: "justify" }}>Techoriz Web Academy is an Agency Based Web Academy
                                                    that offers Web Development courses. We, at Techoriz
                                                    Web Academy, believe to provide world-class training with
                                                    experts handling guidance. Techoriz Web Academy is one of
                                                    its kind Agency Based Web Academy in Calicut that not only
                                                    guides you in your career but also promises 100% placement
                                                    assistance. Techoriz Web Academy is powered by Techoriz
                                                    Digital Solutions Pvt. Ltd. that has served its services
                                                    in 14+ countries and has successfully been a part of 100+
                                                    projects.
                                                </p><p><span style={{ textAlign: "justify", fontWeight: "bold" }}>Our vision </span>
                                                    is to groom the students perfectly in their careers in
                                                    Web Development and to build their dreams. Assure the
                                                    assurance in Kerala's most liked Agency Based Web Academy,
                                                    Techoriz Web Academy.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-12">
                                            <div className="welcome-image">
                                                <img src={nusrathimg} alt />
                                            </div>
                                        </div>
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

export default DashboardHome;