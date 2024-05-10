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
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
} from 'reactstrap';
import ReactPaginate from 'react-paginate';

import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft, faChevronRight, faClose, faRectangleList, faTrash, faUserPen } from '@fortawesome/free-solid-svg-icons';
import Header from './Navigation/header';
import Footer from './Navigation/footer';

function AdminUserProfile() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const [userprofile, setUserProfile] = useState([]);
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [dateerr, setDateErr] = useState("");
    const [amounterr, setAmountErr] = useState("");
    const [methoderr, setMethodErr] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("");
    const [comment, setComment] = useState("");
    const [studentlist, setStudentList] = useState([]);
    const [editedRow, setEditedRow] = useState(null);
    const navigate = useNavigate();
    const [totalamountpaid, setTotalAmountPaid] = useState(null);
    console.log(page, limit, totalPages);

    const handleEdit = (rowId) => {
        const selectedItem = data.find(item => item._id === rowId);
        const selectedDate = selectedItem.date ? parse(selectedItem.date, 'dd/MM/yyyy', new Date()) : null;
        setEditedRow(rowId);
        setDate(selectedDate);
        setAmount(selectedItem.amount);
        setMethod(selectedItem.method);
        setComment(selectedItem.comment);
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

    const paymentmethodoption = [
        { value: 'Cash', label: 'Cash' },
        { value: 'UPI Id', label: 'UPI Id' },
        { value: 'Bank Transfer', label: 'Bank Transfer' }
    ]

    const handlePageChange = (selectedPage) => {
        setPage(selectedPage.selected + 1);
    };

    useEffect(() => {
        const token = localStorage.getItem("usertoken");
        axios.defaults.headers.common["Authorization"] = token;
        axios
            .get(`${backendUrl}/admin/liststudent`)
            .then((response) => {
                setStudentList(response.data.elements);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("usertoken");
        axios.defaults.headers.common["Authorization"] = token;
        axios
            .get(`${backendUrl}/admin/listpayment?page=${page}&limit=${limit}`)
            .then((response) => {
                setData(response.data.elements);
                setTotalPages(response.data.totalPages);
                const totalPaid = response.data.elements.reduce((total, item) => total + parseFloat(item.amount), 0);
                setTotalAmountPaid(totalPaid);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [page, limit]);

    const handleUpdate = (eid, id) => {
        const token = localStorage.getItem("usertoken");
        axios.defaults.headers.common["Authorization"] = token;
        
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
        if (formIsValid) {

            const formData = {
                studentid: id,
                date,
                amount,
                method,
                comment,
            }
            axios
                .put(`${backendUrl}/admin/updatepayment/${eid}`, formData)
                .then((response) => {
                    console.log(response);
                    toast.success("Payment edited successfully!", {
                        position: "top-right",
                        duration: 3000,
                    });
                    window.location.href = `/admin/paymentlist`;
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Error occured", {
                        position: "top-right",
                        duration: 3000,
                    });
                    if (error.response && error.response.status === 400) {
                        console.log(error.response.data.message);
                        setError(error.response.data.message);
                    } else if (error.response && error.response.status === 402) {
                        console.log(error.response.data.message);
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
                await axios.delete(`${backendUrl}/admin/removepayment/${did}`);
                window.location.href = `/admin/paymentlist`;
            } catch (error) {
                console.error(error);
            }
        }
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
                            <Row>
                                <Col xs={12}>
                                    <Card className='col-12' style={{ borderRadius: "15px" }}>
                                        <CardBody className='col-12'>
                                            <CardTitle tag="h4" className='text-dark px-5 cardtitle'>
                                                <div><FontAwesomeIcon icon={faRectangleList} /> Payment List</div>
                                            </CardTitle>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "15%" }}>Date</th>
                                                        <th style={{ width: "20%" }}>Student Name</th>
                                                        <th style={{ width: "20%" }}>Course</th>
                                                        <th style={{ width: "10%" }}>Amount</th>
                                                        <th style={{ width: "40%" }}>Comment</th>
                                                        {/* <th style={{ width: "20%" }}>Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((item, index) => {
                                                        return (
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
                                                                <td style={{ width: "10%" }}>{editedRow === item._id ? `${item.studentid.fullname}` : `${item.studentid.fullname}`}</td>
                                                                <td style={{ width: "10%" }}>{editedRow === item._id ? `${item.studentid.course.name}` : `${item.studentid.course.name}`}</td>
                                                                <td style={{ width: "20%" }}>{editedRow === item._id ? (
                                                                    <>
                                                                        <Select
                                                                            options={paymentmethodoption}
                                                                            className="selectst"
                                                                            value={method ? { value: method, label: method } : null}
                                                                            onChange={(selectedOption) => {
                                                                                setMethod(selectedOption ? selectedOption.value : "");
                                                                            }}
                                                                        />
                                                                        <input
                                                                            className="input11st"
                                                                            type="number"
                                                                            value={amount}
                                                                            onChange={(e) => setAmount(e.target.value)}
                                                                        />
                                                                    </>

                                                                ) : `${item.amount} [${item.method}]`}</td>
                                                                <td style={{ width: "40%" }}>{editedRow === item._id ? (
                                                                    <textarea
                                                                        className="input11st"
                                                                        type="text"
                                                                        value={comment}
                                                                        onChange={(e) => setComment(e.target.value)}
                                                                    />
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
                                                                                onClick={() => handleUpdate(item._id, student._id)}
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
                                                        );
                                                    })}
                                                    <tr>
                                                        <td colSpan="1"></td>
                                                        <td><b>Total:</b></td>
                                                        <td>{data.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </CardBody>
                                    </Card>
                                    <ReactPaginate
                                        previousLabel={
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        }
                                        nextLabel={
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        }
                                        pageCount={totalPages}
                                        onPageChange={handlePageChange}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active-page'}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <Footer />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminUserProfile;
