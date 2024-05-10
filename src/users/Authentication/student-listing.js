import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
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
import infoimg from "../assets/images/info.png";
import warningimg from "../assets/images/warning.png";
import successimg from "../assets/images/success.png";
import addstudentimg from "../assets/images/add-student-icon.png";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { parse } from 'date-fns';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faTrash, faUserPen } from '@fortawesome/free-solid-svg-icons';
import Select from "react-select"
import { Col, Input, InputGroup, Row } from 'reactstrap';
import Header from './Navigation/header';
import Footer from './Navigation/footer';

function UserStudentList() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const [userprofile, setUserProfile] = useState([]);
    const [studentlist, setStudentList] = useState([]);
    const [paymentlist, setPaymentList] = useState([]);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearchTerm] = useState("");
    const [courselist, setCourseList] = useState([]);
    const [batchlist, setBatchList] = useState([]);
    const [selectedCourseFilter, setSelectedCourseFilter] = useState("");
    const [selectedBatchFilter, setSelectedBatchFilter] = useState("");
    const [studentdetail, setStudentDetail] = useState("");
    const [paymentdetail, setPaymentDetail] = useState([]);
    const [balance, setBalance] = useState("");
    const [instModalOpen, setInstModalOpen] = useState(false);
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [openid, setOpenId] = useState(false);
    const [addPaymentModalOpen, setAddPaymentModalOpen] = useState(false);
    const [editedRow, setEditedRow] = useState(null);
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("");
    const [comment, setComment] = useState("");
    const [dateerr, setDateErr] = useState("");
    const [amounterr, setAmountErr] = useState("");
    const [methoderr, setMethodErr] = useState("");
    const [commenterr, setCommentErr] = useState("");
    const [error, setError] = useState("");
    const [installmentamount, setInstallmentAmount] = useState("");
    const [installmenttillamount, setInstallmentTillAmount] = useState("");
    const [remainingamount, setRemainingAmount] = useState("");
    const [balanceamount, setBalanceAmount] = useState("");
    const navigate = useNavigate("");

    useEffect(() => {

        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios
            .get(`${backendUrl}/admin/listcourse`)
            .then((response) => {
                setCourseList(response.data.elements);
            })
            .catch((error) => {
                console.error(error);
            });

        axios
            .get(`${backendUrl}/admin/listbatch`)
            .then((response) => {
                setBatchList(response.data.elements);
            })
            .catch((error) => {
                console.error(error);
            });

        fetchData2(page, limit, search, selectedCourseFilter, selectedBatchFilter);
    }, [page, limit, search, selectedCourseFilter, selectedBatchFilter]);

    const handleEdit = (rowId) => {
        const selectedItem = paymentdetail.find(item => item._id === rowId);
        const selectedDate = selectedItem.date ? parse(selectedItem.date, 'dd/MM/yyyy', new Date()) : null;
        setEditedRow(rowId);
        setDate(selectedDate);
        setAmount(selectedItem.amount);
        setMethod(selectedItem.method);
        setComment(selectedItem.comment);
    };
    const handleCourseFilterChange = (selectedCourse) => {
        setSelectedCourseFilter(selectedCourse);
    };

    const handleBatchFilterChange = (selectedBatch) => {
        setSelectedBatchFilter(selectedBatch);
    };
    const HandleUpdateStudent = (pageId) => {
        navigate(`/plain/student/edit-student/${pageId}`);
    };
    const handleDetail = (pageId) => {
        navigate(`/plain/student/student-details/${pageId}`);
    };
    const handleCancelEdit = () => {
        setEditedRow(null);
        resetForm();
    };
    const resetForm = () => {
        setDate("");
        setAmount("");
        setMethod("");
        setComment("");
    };

    const handleUpdate = (eid) => {
        var formIsValid = true;
        if (!date) {
            setDateErr("Date is required");
            formIsValid = false;
        } else {
            setDateErr("");
        }
        if (!amount) {
            setAmountErr("Amount is required");
            formIsValid = false;
        } else {
            setAmountErr("");
        }
        if (!method) {
            setMethodErr("Method is required");
            formIsValid = false;
        } else {
            setMethodErr("");
        }
        if (!comment) {
            setCommentErr("Comment is required");
            formIsValid = false;
        } else {
            setCommentErr("");
        }
        if (formIsValid) {

            const formData = {
                studentid: openid,
                date,
                amount,
                method,
                comment,
            }
            const token = localStorage.getItem("usertoken");
            axios.defaults.headers.common["Authorization"] = token;
            axios
                .put(`${backendUrl}/users/updatepayment/${eid}`, formData, {
                    params: {
                        token: token,
                        deviceId: "123"
                    }
                })
                .then((response) => {
                    setBalance(response.data.balance)
                    toast.success("Payment edited successfully!", {
                        position: "top-right",
                        duration: 3000,
                    });
                    openInfoModal(openid);
                })
                .catch((error) => {
                    toast.error("Error occured", {
                        position: "top-right",
                        duration: 3000,
                    });
                    if (error.response && error.response.status === 400) {
                        setError(error.response.data.message);
                    } else if (error.response && error.response.status === 402) {
                        setError(error.response.data.message);
                    }
                });
        }
    };

    const handleDelete = async (did) => {
        const token = localStorage.getItem("usertoken");
        axios.defaults.headers.common["Authorization"] = token;

        const confirmation = window.confirm("Are you sure you want to delete this Payment?");
        if (confirmation) {
            try {
                await axios.delete(`${backendUrl}/users/removepayment/${did}`);
                openInfoModal(openid);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const paymentmethodoption = [
        { value: 'Cash', label: 'Cash' },
        { value: 'UPI', label: 'UPI' },
        { value: 'Bank Transfer', label: 'Bank Transfer' }
    ]

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
                calculateInstallmentAmount(response.data.student)
                setBalance(response.data.balance)
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
    const openInfoModal = (student) => {
        fetchData1();
        fetchData2();
        fetchData(student);
        setInfoModalOpen(true);
        setOpenId(student);
        handleCancelEdit();
    };
    const closeInfoModal = () => {
        fetchData1();
        fetchData2();
        setInfoModalOpen(false);
    };
    const openInstModal = (student) => {
        fetchData1();
        fetchData2();
        fetchData(student);
        setInstModalOpen(true);
        setOpenId(student);
    };

    const closeInstModal = () => {
        fetchData1();
        fetchData2();
        setInstModalOpen(false);

    };

    const openAddPaymentModal = (student) => {
        fetchData(student);
        fetchData1();
        fetchData2();
        setAddPaymentModalOpen(true);
        setOpenId(student);
        handleCancelEdit();
    };

    const closeAddPaymentModal = () => {
        fetchData1();
        fetchData2();
        setAddPaymentModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var formIsValid = true;
        if (!date) {
            setDateErr("Date is required");
            formIsValid = false;
        } else {
            setDateErr("");
        }
        if (!amount) {
            setAmountErr("Amount is required");
            formIsValid = false;
        } else {
            setAmountErr("");
        }
        if (!method) {
            setMethodErr("Method is required");
            formIsValid = false;
        } else {
            setMethodErr("");
        }
        if (!comment) {
            setCommentErr("Comment is required");
            formIsValid = false;
        } else {
            setCommentErr("");
        }

        if (formIsValid) {
            const formData = {
                studentid: openid,
                date,
                amount,
                method,
                comment,
            }
            const token = localStorage.getItem("usertoken");
            axios.defaults.headers.common["Authorization"] = token;
            axios
                .post(`${backendUrl}/users/addpayment`, formData, {
                    params: {
                        token: token,
                        deviceId: "123"
                    }
                })
                .then((response) => {
                    setBalance(response.data.balance)
                    toast.success("Fee added successfully!", {
                        position: "top-right",
                        duration: 4000,
                    });
                    openAddPaymentModal(openid)
                })
                .catch((error) => {
                    toast.error("Error occured", {
                        position: "top-right",
                        duration: 4000,
                    });
                    if (error.response && error.response.status === 400) {
                        setError(error.response.data.message);
                    }
                });
                
        }
    };


    const fetchData1 = async () => {
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
        ListPayment();
    };

    const fetchData2 = async () => {
        const token = localStorage.getItem('usertoken');
        axios.defaults.headers.common["Authorization"] = token;

        axios
            .get(`${backendUrl}/users/liststudent`, {
                params: {
                    token: token,
                    deviceId: "123",
                    search,
                    courseFilter: selectedCourseFilter,
                    batchFilter: selectedBatchFilter
                }
            })
            .then((response) => {
                setStudentList(response.data.elements);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const ListPayment = (page, limit, search) => {
        const token = localStorage.getItem("usertoken");
        axios.defaults.headers.common["Authorization"] = token;
        axios
            .get(`${backendUrl}/users/listaccount`, {
                params: {
                    token: token,
                    deviceId: "123"
                }
            })
            .then((response) => {
                setData(response.data.elements);
                setPaymentList(response.data.payments);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        data.forEach(async (item) => {
            const totalAmount = calculateTotalPayment(item._id);
            updatePaymentStatusIfNeeded(item._id, totalAmount, item.coursefee);
            const installmentStatus = await calculateInstallmentStatus(item);
            updateFeeStatusIfNeeded(item._id, totalAmount, installmentStatus);
        });
    }, [data]);

    const updatePaymentStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("usertoken");
            axios.defaults.headers.common["Authorization"] = token;
            await axios.put(`${backendUrl}/users/updatepaymentstatus/${id}`, {
                paymentstatus: status,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const calculateTotalPayment = (studentId) => {
        const totalAmount = paymentlist
            .filter((payment) => payment.studentid === studentId)
            .reduce((sum, payment) => sum + parseInt(payment.amount), 0);

        return totalAmount;
    };

    const updatePaymentStatusIfNeeded = async (id, totalAmount, courseFee) => {
        try {
            const token = localStorage.getItem("usertoken");
            axios.defaults.headers.common["Authorization"] = token;

            const currentPaymentStatus = data.find((item) => item._id === id).paymentstatus;

            if (parseInt(totalAmount) === parseInt(courseFee)) {
                if (currentPaymentStatus === "Pending") {
                    await updatePaymentStatus(id, 'Completed');
                }
            } else {
                if (currentPaymentStatus === "Completed") {
                    await updatePaymentStatus(id, 'Pending');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const calculateInstallmentStatus = async (item) => {
        const installmentDates = item.billdate.split(',');
        const installmentAmount = parseInt(item.coursefee) / parseInt(item.noofinst);
        const currentDate = new Date();

        const billdatesBeforeCurrentDate = installmentDates
            .map((date) => {
                const [day, month, year] = date.trim().split('/').map(Number);

                if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                    const billdate = new Date(year, month - 1, day);
                    return billdate < currentDate ? billdate : null;
                }
                return null;
            })
            .filter(Boolean);
        const calculateInstallment = billdatesBeforeCurrentDate.length * installmentAmount;
        return calculateInstallment;
    };

    const updateFeeStatus = async (id, feestatus) => {
        try {
            const token = localStorage.getItem("usertoken");
            axios.defaults.headers.common["Authorization"] = token;

            await axios.put(`${backendUrl}/admin/updatefeestatus/${id}`, {
                feestatus,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const updateFeeStatusIfNeeded = async (id, totalAmount, calculateInstallment) => {
        try {
            const token = localStorage.getItem("usertoken");
            axios.defaults.headers.common["Authorization"] = token;

            const currentFeeStatus = data.find((item) => item._id === id).feestatus;

            if (totalAmount >= calculateInstallment) {
                if (currentFeeStatus === "Unpaid") {
                    await updateFeeStatus(id, 'Paid');
                }
            } else if (totalAmount < calculateInstallment) {
                if (currentFeeStatus === "Paid") {
                    await updateFeeStatus(id, 'Unpaid');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData1();
        fetchData2();
    }, []);

    const calculateRemainingAmount = (student) => {
        const installmentAmount = parseInt(student.coursefee) / parseInt(student.noofinst);
        const currentDate = new Date();
        const installmentDates = student.billdate.split(',');
        const paidInstallments = installmentDates
            .map((date) => {
                const [day, month, year] = date.trim().split('/').map(Number);

                if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                    const billdate = new Date(year, month - 1, day);
                    return billdate < currentDate ? billdate : null;
                }

                return null;
            })
            .filter(Boolean);
        const instlength = paidInstallments.length;
        const totalAmount = calculateTotalPayment(student._id);
        const remainingAmount = (parseInt(instlength * installmentAmount) - (totalAmount)).toFixed(1);
        return remainingAmount > 0 ? remainingAmount : remainingAmount;
    };
    const calculateInstallmentAmount = (studentdetail) => {
        const installmentAmount = parseInt(studentdetail.coursefee) / parseInt(studentdetail.noofinst);
        setInstallmentAmount(installmentAmount)
        const currentDate = new Date();
        const installmentDates = studentdetail.billdate.split(',');
        const paidInstallments = installmentDates.filter((date) => {
            const [day, month, year] = date.trim().split('/').map(Number);
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                const billdate = new Date(year, month - 1, day);
                return billdate < currentDate;
            }
            return false;
        });
        const instlength = paidInstallments.length;
        const totalAmount = calculateTotalPayment(studentdetail._id);
        const installmentTillAmount = (parseInt(instlength) * (installmentAmount))
        setInstallmentTillAmount(installmentTillAmount)
        const remainingAmount = (parseInt(totalAmount) % (installmentAmount));
        setRemainingAmount(remainingAmount);
        const balanceAmount = installmentTillAmount - remainingAmount;
        setBalanceAmount(balanceAmount)
    };
    
    
    
    const goToAddSudent = () => {
        window.location.href = '/plain/student/add-student';
    };

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
                                    <p>{userprofile.role && userprofile.role?.role}.</p>
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
                            <InputGroup className="no-border">
                                <Input
                                    className='inputsearch'
                                    value={search}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search..."
                                />
                                <select
                                    style={{ borderColor: "white" }}
                                    value={selectedCourseFilter}
                                    onChange={(e) => handleCourseFilterChange(e.target.value)}
                                >
                                    <option value="">Course</option>
                                    {courselist.map((course) => (
                                        <option key={course._id} value={course._id}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    style={{ borderColor: "white" }}
                                    value={selectedBatchFilter}
                                    onChange={(e) => handleBatchFilterChange(e.target.value)}
                                >
                                    <option value="">Batch</option>
                                    {batchlist.map((batch) => (
                                        <option key={batch._id} value={batch._id}>
                                            {batch.batchname}
                                        </option>
                                    ))}
                                </select>
                            </InputGroup>
                            <button type="button" onClick={goToAddSudent} style={{ marginLeft: "85%" }} className="btn btn-primary add-student-btn"> <img src={addstudentimg} alt />Add Student</button>
                            <div className="row">
                                {studentlist.map((student) => (
                                    <div className="col-lg-4 col-md-6 col-sm-12" key={student._id}>
                                        <div className="student-list-card-outer">
                                            <div className="row">
                                                <div className="col-md-7 col-sm-12 student-det">
                                                    <div onClick={() => handleDetail(student._id)} className="student-list-image-div">
                                                        <img src={student.image ? `${backendUrl}/images/${student.image}` : `${img1}`} alt="Student" />
                                                    </div>
                                                    <div className="student-name-div">
                                                        <h5 onClick={() => handleDetail(student._id)}><b>{student.fullname.toUpperCase()}</b></h5>
                                                        <p>{student.course.name.toUpperCase()}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 col-sm-12 student-right-det">
                                                    <h6>{student.feestatus === 'Unpaid' ? calculateRemainingAmount(student) : calculateRemainingAmount(student)} <img src={infoimg} alt onClick={() => openInfoModal(student._id)} /></h6>
                                                    <p>Installment {student.feestatus} {student.feestatus === 'Paid' ? <img src={successimg} onClick={() => openInstModal(student._id)} alt="Success" /> : <img src={warningimg} alt="Warning" onClick={() => openInstModal(student._id)} />} </p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6 col-sm-12">
                                                    <button className="btn-update-list" onClick={() => HandleUpdateStudent(student._id)}>Update Student Details</button>
                                                </div>
                                                <div className="col-md-6 col-sm-12">
                                                    <button className="btn-payment-list" onClick={() => openAddPaymentModal(student._id)}>Add Payment</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                        <Modal id='modal-info' isOpen={infoModalOpen} onRequestClose={closeInfoModal}>
                            <div>
                                <Row className='row' style={{ textAlign: "left" }}>
                                    <Col style={{ lineHeight: "180%" }}>
                                        <b style={{ color: "#5ab769" }} className="title"><h3><b>Payment Details of {studentdetail.fullname}</b></h3></b>
                                        <b style={{ color: "#5ab769" }}>Total Course Fee: </b> {studentdetail.coursefee}<br />
                                        <b style={{ color: "#5ab769" }}>Fee Status: </b> Installment {studentdetail.feestatus}<br />
                                        <b style={{ color: "#5ab769" }}>Payment Status: </b> {studentdetail.paymentstatus}<br />
                                        <b style={{ color: "#5ab769" }}>Total no.Installment:</b> {studentdetail.noofinst}<br />
                                        <b style={{ color: "#5ab769" }}>Installment Bill Date:</b> {studentdetail.billdate}
                                    </Col><br />
                                </Row><br />
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
                                                <b style={{ color: studentdetail.feestatus === 'Unpaid' ? 'red' : 'green' }}>Installment {studentdetail.feestatus}</b>
                                                <b style={{ color: studentdetail.paymentstatus === 'Pending' ? 'orange' : 'green' }}>Payment {studentdetail.paymentstatus}</b>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Modal>
                        <Modal id='modal-info' isOpen={instModalOpen} onRequestClose={closeInstModal}>
                            <div>
                                <Row className='row' style={{ textAlign: "left" }}>
                                    <Col style={{ lineHeight: "180%" }}>
                                        <b style={{ color: "#5ab769" }} className="title"><h3><b>Payment Details of {studentdetail.fullname}</b></h3></b>
                                        <b style={{ color: "#5ab769" }}>Total Course Fee: </b> {studentdetail.coursefee}<br />
                                        <b style={{ color: "#5ab769" }}>Fee Status: </b> Installment {studentdetail.feestatus}<br />
                                        <b style={{ color: "#5ab769" }}>Payment Status: </b> {studentdetail.paymentstatus}<br />
                                        <b style={{ color: "#5ab769" }}>Total no.Installment:</b> {studentdetail.noofinst}<br />
                                        <b style={{ color: "#5ab769" }}>Installment Bill Date:</b> {studentdetail.billdate}
                                    </Col><br />
                                </Row><br />
                                <Row>
                                    <Col>
                                        <h4><b>Current Installment Status</b></h4>
                                        <div style={{ textAlign: 'left' }}>
                                            <div>
                                                <b>Installment Amount Per Month:</b> <span style={{ float: 'right' }}>{parseFloat(installmentamount).toFixed(2)}</span>
                                            </div>
                                            <div>
                                                <b>Installment Amount Till Today:</b> <span style={{ float: 'right' }}>{parseFloat(installmenttillamount).toFixed(2)}</span>
                                            </div>
                                            {/* <div>
                                                <b>Installment Paid:</b> <span style={{ float: 'right' }}>{parseFloat(remainingamount).toFixed(2)}</span>
                                            </div> */}
                                            <div>
                                                <b>Installment Paid Till Today:</b> <span style={{ float: 'right' }}>{parseFloat(paymentdetail.reduce((total, item) => total + parseFloat(item.amount), 0)).toFixed(2)}</span>
                                            </div>
                                            <div>
                                            <b>Installment Balance:</b> <span style={{ float: 'right' }}>{(parseFloat(installmenttillamount).toFixed(2) - parseFloat(paymentdetail.reduce((total, item) => total + parseFloat(item.amount), 0))).toFixed(2)}</span>
                                            </div>
                                            <div>
                                                {/* <b>Balance Amount: </b><span style={{ float: 'right' }}>{parseFloat(balanceamount).toFixed(2)}</span> */}
                                                {/* {remainingamount === 0 && <span style={{ color: "green" }}><br /><b>Installment Completed!</b></span>}
                                                {remainingamount !== 0 && installmenttillamount > balanceamount && <span style={{ color: "orange" }}><br /><b>Installment Pending!</b></span>}
                                                {remainingamount !== 0 && installmenttillamount < balanceamount && <span style={{ color: "red" }}><br /><b>Installment Overflow!</b></span>} */}
                                                <b style={{ color: studentdetail.feestatus === 'Unpaid' ? 'red' : 'green' }}>Installment {studentdetail.feestatus}</b>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <h4><b>Total Payment Status</b></h4>
                                        <div style={{ textAlign: 'left' }}>
                                            <div>
                                                <b>Total: </b> <span style={{ float: 'right' }}>{parseFloat(studentdetail.coursefee).toFixed(2)}</span>
                                            </div>
                                            <div>
                                                <b>Total Paid:</b> <span style={{ float: 'right' }}>{parseFloat(paymentdetail.reduce((total, item) => total + parseFloat(item.amount), 0)).toFixed(2)}</span>
                                            </div>
                                            <div>
                                                <b>Balance: </b> <span style={{ float: 'right' }}>{parseFloat(balance).toFixed(2)}</span><br/>
                                                <b style={{ color: studentdetail.paymentstatus === 'Pending' ? 'orange' : 'green' }}>Payment {studentdetail.paymentstatus}</b>
                                            </div>
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        </Modal>
                        <Modal id="modal-payment" isOpen={addPaymentModalOpen} onRequestClose={closeAddPaymentModal}>
                            <div>
                                <Row className='row' style={{ textAlign: "left" }}>
                                    <Col style={{ lineHeight: "180%" }}>
                                        <b style={{ color: "#5ab769" }} className="title"><h3><b>Payment Details of {studentdetail.fullname}</b></h3></b>
                                        <b style={{ color: "#5ab769" }}>Total Course Fee: </b> {studentdetail.coursefee}<br />
                                        <b style={{ color: "#5ab769" }}>Fee Status: </b> Installment {studentdetail.feestatus}<br />
                                        <b style={{ color: "#5ab769" }}>Payment Status: </b> {studentdetail.paymentstatus}<br />
                                        <b style={{ color: "#5ab769" }}>Total no.Installment:</b> {studentdetail.noofinst}<br />
                                        <b style={{ color: "#5ab769" }}>Installment Bill Date:</b> {studentdetail.billdate}
                                    </Col><br />
                                </Row><br />
                                <b>Add Payment</b>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Payment Method</th>
                                            <th>Comment</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <DatePicker
                                                    selected={date}
                                                    id="Date"
                                                    onChange={(date) => setDate(date)}
                                                    dateFormat="dd - MM - yyyy"
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    dropdownMode="select"
                                                />
                                                {dateerr && <p style={{ color: "red" }}>{dateerr}</p>}
                                            </td>
                                            <td>
                                                <input
                                                    className="input11st"
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                                {amounterr && <p style={{ color: "red" }}>{amounterr}</p>}
                                            </td>
                                            <td>
                                                <Select
                                                    options={paymentmethodoption}
                                                    className="selectst"
                                                    value={method ? { value: method, label: method } : null}
                                                    onChange={(selectedOption) => {
                                                        setMethod(selectedOption ? selectedOption.value : "");
                                                    }}
                                                />
                                                {methoderr && <p style={{ color: "red" }}>{methoderr}</p>}
                                            </td>
                                            <td>
                                                <textarea
                                                    className="input11st"
                                                    type="text"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                                {commenterr && <p style={{ color: "red" }}>{commenterr}</p>}
                                            </td>
                                            {error && <p style={{ color: "red" }}>{error}</p>}
                                            <td style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Button
                                                    style={{
                                                        backgroundColor: "white",
                                                        marginTop: "5%",
                                                        color: "#5ab769",
                                                        border: "1px solid #5ab769",
                                                        borderRadius: "25px",
                                                    }}
                                                    onClick={handleSubmit}
                                                >
                                                    <FontAwesomeIcon icon={faCheck} /> Save
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "20%" }}>Date</th>
                                            <th style={{ width: "20%" }}>Payment Method</th>
                                            <th style={{ width: "10%" }}>Amount</th>
                                            <th style={{ width: "40%" }}>Comment</th>
                                            {/* <th style={{ width: "20%" }}>Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentdetail.map((item, index) => (
                                            <tr key={index}>
                                                <td style={{ width: "20%" }}>{editedRow === item._id ? (
                                                    <DatePicker
                                                        selected={editedRow === item._id ? date : new Date(item.date)}
                                                        id="Date"
                                                        onChange={(date) => setDate(date)}
                                                        dateFormat="dd - MM - yyyy"
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        dropdownMode="select"
                                                    />
                                                ) : item.date}</td>
                                                <td style={{ width: "20%" }}>{editedRow === item._id ? (
                                                    <Select
                                                        options={paymentmethodoption}
                                                        className="selectst"
                                                        value={method ? { value: method, label: method } : null}
                                                        onChange={(selectedOption) => {
                                                            setMethod(selectedOption ? selectedOption.value : "");
                                                        }}
                                                    />
                                                ) : item.method}</td>
                                                <td style={{ width: "10%" }}>{editedRow === item._id ? (
                                                    <input
                                                        className="input11st"
                                                        type="number"
                                                        value={amount}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                    />
                                                ) : item.amount}</td>
                                                <td style={{ width: "40%" }}>{editedRow === item._id ? (
                                                    <>
                                                    <textarea
                                                        className="input11st"
                                                        type="text"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    />
                                                    {commenterr && <p style={{ color: "red" }}>{commenterr}</p>}
                                                    </>
                                                ) : item.comment}</td>
                                                {/* <td style={{ display: "flex", justifyContent: "space-between", width: "20%" }}>
                                                    {editedRow === item._id ? (
                                                        <>
                                                            <Button
                                                                style={{
                                                                    backgroundColor: "white",
                                                                    marginTop: "5%",
                                                                    color: "#e05757",
                                                                    border: "1px solid #e05757",
                                                                    borderRadius: "25px",
                                                                }}
                                                                onClick={handleCancelEdit}
                                                            >
                                                                <FontAwesomeIcon icon={faClose} />
                                                            </Button>
                                                            <Button
                                                                style={{
                                                                    backgroundColor: "white",
                                                                    marginTop: "5%",
                                                                    color: "#5ab769",
                                                                    border: "1px solid #5ab769",
                                                                    borderRadius: "25px",
                                                                }}
                                                                onClick={() => handleUpdate(item._id)}
                                                            >
                                                                <FontAwesomeIcon icon={faCheck} />
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Button
                                                                style={{
                                                                    backgroundColor: "white",
                                                                    marginTop: "5%",
                                                                    color: "#5ab769",
                                                                    border: "1px solid #5ab769",
                                                                    borderRadius: "25px",
                                                                }}
                                                                onClick={() => handleEdit(item._id)}
                                                            >
                                                                <FontAwesomeIcon icon={faUserPen} />
                                                            </Button>
                                                            <Button
                                                                style={{
                                                                    backgroundColor: "white",
                                                                    marginTop: "5%",
                                                                    color: "#5ab769",
                                                                    border: "1px solid #5ab769",
                                                                    borderRadius: "25px",
                                                                }}
                                                                onClick={() => handleDelete(item._id)}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </Button>
                                                        </>
                                                    )}
                                                </td> */}
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="1"></td>
                                            <td>
                                                <b>Total:</b>
                                            </td>
                                            <td>{paymentdetail.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2)}</td>
                                            <td colSpan={1} style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                <b>Balance: </b>{balance}
                                                <b style={{ color: studentdetail.feestatus === 'Unpaid' ? 'red' : 'green' }}>Installment {studentdetail.feestatus}</b>
                                                <b style={{ color: studentdetail.paymentstatus === 'Pending' ? 'orange' : 'green' }}>Payment {studentdetail.paymentstatus}</b>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Modal>
                        <Footer />
                    </div>
                </div >
            </section >
        </div >
    )
}

export default UserStudentList;
