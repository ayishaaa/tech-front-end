import React, { useEffect, useState } from 'react';
import "../assets/css/style.css";
import { Toaster, toast } from 'react-hot-toast';
import img1 from "assets/img/default-avatar.png";
import noimg from "assets/img/noimage.png"
import noimg1 from "assets/img/noimage.webp"
import logoimg from "../assets/images/logo.png";
import dashboardimg from "../assets/images/dashboard-icon.png";
import studentimg from "../assets/images/student.png";
import paymentimg from "../assets/images/payment-icon.png";
import profileimg from "../assets/images/profile-icon.png";
import moreimg from "../assets/images/more-menu-icon.png";
import logoutimg from "../assets/images/logout-icon.png";
import femaleimg from "../assets/images/female.png";
import maleimg from "../assets/images/man-icon.png";
import dobimg from "../assets/images/dob.png";
import batchimg from "../assets/images/batch.png";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Header from './Navigation/header';
import Footer from './Navigation/footer';

function AddUserProfile() {
  const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
  const [userprofile, setUserProfile] = useState([]);
  const [studentdetail, setStudentDetail] = useState([]);
  const [paymentdetail, setPaymentDetail] = useState([]);
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState("");
  const [passimgPreview, setPassImgPreview] = useState("");
  const [docimgPreview, setDocImgPreview] = useState("");
  const [balance, setBalance] = useState("");
  const currentDate = new Date();
  const navigate = useNavigate();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get the formatted time
  const [openDDialog, setOpenDDialog] = useState(false);

  const handleDDialogOpen = () => {
    setOpenDDialog(true);
  };

  const handleDDialogClose = () => {
    setOpenDDialog(false);
  };

  const fetchData = (id) => {
    const token = localStorage.getItem("usertoken");
    axios.defaults.headers.common["Authorization"] = token;
    axios.get(`${backendUrl}/users/getstudentdetail/${id}`, {
      params: {
        token: token,
        deviceId: "123"
      }
    })
      .then((response) => {
        setStudentDetail(response.data.student);
        setBalance(response.data.balance)
        setImagePreview(response.data.student.image ? `${backendUrl}/images/${response.data.student.image}` : img1);
        setPassImgPreview(response.data.student.passimg ? `${backendUrl}/images/${response.data.student.passimg}` : noimg1);
        setDocImgPreview(response.data.student.docimg ? `${backendUrl}/images/${response.data.student.docimg}` : noimg);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get(`${backendUrl}/users/getpaymentdetail/${id}`, {
      params: {
        token: token,
        deviceId: "123"
      }
    })
      .then((response) => {
        setPaymentDetail(response.data.payment);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
    fetchData(id)
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
                  <h3>Hello Student !</h3>
                  <p>Lorem Ipsum is simply dummy text.</p>
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
                      <img src={imagePreview} alt />
                    </div>
                    <div className="student-full-text-div">
                      <h5>{studentdetail.fullname}</h5>
                      <p>{studentdetail.course && studentdetail.course ? studentdetail.course.name : null}</p>
                      <div className="btn-full-det-div">
                        {studentdetail.gender === 'female' ? (
                          <button> <img src={femaleimg} alt />{studentdetail.gender}</button>
                        ) : (
                          <button> <img src={maleimg} alt />{studentdetail.gender}</button>
                        )}
                        <button> <img src={dobimg} alt />{studentdetail.dob ? new Date(studentdetail.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</button>
                        <button> <img src={batchimg} alt />{studentdetail.batch ? studentdetail.batch.batchname : null}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <div className="batch-card-outer">
                    <h5>{studentdetail.course?.name}</h5>
                    <p>Batch: {studentdetail.batch?.batchname}</p>
                    <div className="time-div">
                      <p>{formattedDate}</p>
                      <p>{formattedTime}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6 col-sm-12 mb-3 ">
                  <div className="full-det-outer">
                    <p> <span>Mobile Number :</span>{studentdetail.mobile}</p>
                    <p> <span>Marital Status :</span>{studentdetail.maritalstatus}</p>
                    <p> <span>Guardian Name :</span>{studentdetail.guardianname}</p>
                    <p> <span>Guardian Mobile No :</span>{studentdetail.guardianmob}</p>
                    <p> <span>Spouse Name :</span>{studentdetail.spousename}</p>
                    <p> <span>Spouse Mobile No :</span>{studentdetail.spousemob}</p>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 mb-3 ">
                  <div className="full-det-outer">
                    <p> <span>Address :</span>{studentdetail.address}</p>
                    <p> <span>P.o :</span>{studentdetail.postoffice}</p>
                    <p> <span>District :</span>{studentdetail.district}</p>
                    <p> <span>State :</span>{studentdetail.state?.name}</p>
                    <p> <span>Country :</span>{studentdetail.country?.name}</p>
                    <p> <span>Email :</span>{studentdetail.email}</p>
                    <p> <span>Identification :</span>{studentdetail.identity}</p>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 mb-3 ">
                  <div className="batch-card-outer">
                    <Row>
                      <Col>
                        <h5>Passport Size Photo</h5>
                        <p>Nov, 23, 2023</p>
                        <p>200/kb</p>
                      </Col>
                      <Col>
                        <div className="time-div">
                          <img src={passimgPreview} style={{ height: "auto", width: "150px" }} />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 mb-3 ">
                  <div className="batch-card-outer">
                    <Row>
                      <Col>
                        <h5>{studentdetail.identity}</h5>
                        <p>Nov, 23, 2023</p>
                        <p>200/kb</p>
                      </Col>
                      <Col>
                        <div className="time-div">
                          <img src={docimgPreview} onClick={handleDDialogOpen} style={{ height: "auto", width: "150px" }} />
                        </div>
                      </Col>
                    </Row>

                  </div>
                </div>
                <div className="col-md-6 col-sm-12 mb-3 ">
                  <div className="full-det-outer">
                    <p> <span>Education Qualification :</span>{studentdetail.highqual}</p>
                    <p> <span>Institution Name :</span>{studentdetail.institutename}</p>
                    <p> <span>Mark :</span>{studentdetail.mark}</p>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 mb-3 ">
                  <div className="full-det-outer">
                    <p> <span>Fee Status :</span>Installment {studentdetail.feestatus}</p>
                    <p> <span>Payment Status :</span>{studentdetail.paymentstatus}</p>
                    <p> <span>Payment Method :</span>{studentdetail.paymentmethod}</p>
                  </div>
                </div>
              </div>
              <h4><b>Payment Details</b></h4>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Date</th>
                    <th style={{ width: "20%" }}>Payment Method</th>
                    <th style={{ width: "10%" }}>Amount</th>
                    <th style={{ width: "40%" }}>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentdetail.map((item, index) => (
                    <tr key={index}>
                      <td style={{ width: "20%" }}>
                        {item.date}
                      </td>
                      <td style={{ width: "20%" }}>
                        {item.method}
                      </td>
                      <td style={{ width: "10%" }}>
                        {item.amount}
                      </td>
                      <td style={{ width: "40%" }}>
                        {item.comment}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td>
                      <b>Total:</b>
                    </td>
                    <td>{paymentdetail.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2)}</td>
                    <td colSpan={1} style={{ display: "flex", justifyContent: "space-between" }}>
                      <b>Balance: </b>{balance}
                      {balance === 0 && <span style={{ color: "green" }}><br /><b>Payment successful!</b></span>}
                      {balance !== 0 && studentdetail.coursefee > paymentdetail.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2) && <span style={{ color: "orange" }}><br /><b>Payment Pending!</b></span>}
                      {balance !== 0 && studentdetail.coursefee < paymentdetail.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2) && <span style={{ color: "red" }}><br /><b>Payment Overflow!</b></span>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Footer />
          </div>
        </div>
      </section>
      <Dialog open={openDDialog} onClose={handleDDialogClose}>
        <DialogTitle><h5>{studentdetail.identity} Proof</h5></DialogTitle>
        <DialogContent>
          <img src={docimgPreview} style={{ maxWidth: "100%" }} alt="Doc Proof" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddUserProfile;