import React, { useEffect, useState } from 'react';
import "assets/css/student.css";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    CardContent,
    DialogContentText,
} from '@mui/material';
import axios from 'axios';
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faBackspace, faCashRegister, faCheck, faChevronLeft, faChevronRight, faClose, faDeleteLeft, faPen, faRectangleList, faTrash, faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from "react-hot-toast";
import img1 from "assets/img/default-avatar.png";
import noimg from "assets/img/noimage.png"
import noimg1 from "assets/img/noimage.webp"
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    CardHeader,
    Form,
    FormGroup,
} from 'reactstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icons from '../Icons';
import { parse, format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import Select from "react-select"

function StudentView() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const { id } = useParams();
    const [studentdetail, setStudentDetail] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [passimgPreview, setPassImgPreview] = useState("");
    const [docimgPreview, setDocImgPreview] = useState("");
    const [openDDialog, setOpenDDialog] = useState(false);
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("");
    const [comment, setComment] = useState("");
    const [balance, setBalance] = useState("");
    const [totalpaid, setTotalPaid] = useState("");
    const [dateerr, setDateErr] = useState("");
    const [amounterr, setAmountErr] = useState("");
    const [methoderr, setMethodErr] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate("");
    const [editedRow, setEditedRow] = useState(null);

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

    useEffect(() => {
        fetchData();
        handleList();
    }, []);

    const paymentmethodoption = [
        { value: 'Cash', label: 'Cash' },
        { value: 'UPI', label: 'UPI' },
        { value: 'Bank Transfer', label: 'Bank Transfer' }
    ]

    const fetchData = () => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios.get(`${backendUrl}/admin/getstudentdetail/${id}`)
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
    };

    const handleSubmit = async (e) => {
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
    
        if (formIsValid) {
            const formData = {
                studentid: id,
                date,
                amount,
                method,
                comment,
            }
            try {
                const response = await axios.post(`${backendUrl}/admin/addpayment`, formData);
                setBalance(response.data.balance)
                setTotalPaid(response.data.totalAmountPaid)
                toast.success("Fee added successfully!", {
                    position: "top-right",
                    duration: 4000,
                });
                await axios.put(`${backendUrl}/admin/updateallpaymentstatus/${id}`); // Await here
                window.location.href = `/admin/viewstudent/${id}`;
            } catch (error) {
                console.error(error);
                toast.error("Error occurred", {
                    position: "top-right",
                    duration: 4000,
                });
                if (error.response && error.response.status === 400) {
                    console.log(error.response.data.message)
                    setError(error.response.data.message);
                }
            }
        }
    };    

    const handleList = () => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios.get(`${backendUrl}/admin/getpaymentdetail/${id}`)
            .then((response) => {
                setData(response.data.payment);
            })
            .catch((error) => {
                console.error(error);
            });
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
                    setBalance(response.data.balance)
                    toast.success("Payment edited successfully!", {
                        position: "top-right",
                        duration: 3000,
                    });
                    window.location.href = `/admin/viewstudent/${id}`;
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

    const previousPage = () => {
        navigate('/admin/studentlist');
        // navigate(-1);
    };

    const handleDDialogOpen = () => {
        setOpenDDialog(true);
    };

    const handleDDialogClose = () => {
        setOpenDDialog(false);
    };

    const handleDelete = async (did) => {
        const confirmation = window.confirm("Are you sure you want to delete this Payment?");
        if (confirmation) {
            try {
                await axios.delete(`${backendUrl}/admin/removepayment/${did}`);
                await axios.put(`${backendUrl}/admin/updateallpaymentstatus/${id}`); // Add await here

                window.location.href = `/admin/viewstudent/${id}`;
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card className='col-12' style={{ borderRadius: "15px" }}>
                            <CardBody className='col-12'>
                                <CardTitle tag="h4" className='text-dark px-5 cardtitle'>
                                    <div><FontAwesomeIcon icon={faRectangleList} /> Student View</div>
                                    <FontAwesomeIcon icon={faAnglesLeft} onClick={previousPage} />
                                </CardTitle>
                                <CardContent>
                                    <Row>
                                        <Col style={{ display: "flex", justifyContent: "space-between" }}>
                                            <h4><strong style={{ color: "#5ab769" }}>COURSE: {studentdetail.course ? studentdetail.course.name : null} </strong></h4>
                                            <h5><strong style={{ color: "#5ab769" }}>[{studentdetail.batch ? studentdetail.batch.batchname : null}]</strong></h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='col-3'>
                                            <img src={imagePreview} style={{ height: "150px", width: "150px", borderRadius: "50%" }} /><br />
                                        </Col>
                                        <Col className='col-3'>
                                            <div style={{ lineHeight: "180%" }}>
                                                <b style={{ color: "#5ab769" }}>Name:</b> {studentdetail.fullname}<br />
                                                <b style={{ color: "#5ab769" }}>Email:</b> {studentdetail.email}<br />
                                                <b style={{ color: "#5ab769" }}>Gender:</b> {studentdetail.gender}<br />
                                                <b style={{ color: "#5ab769" }}>Guardian's Name:</b> {studentdetail.guardianname}<br />
                                                <b style={{ color: "#5ab769" }}>Spouse's Name:</b> {studentdetail.spousename}<br />
                                            </div>
                                        </Col>
                                        <Col className='col-3'>
                                            <div style={{ lineHeight: "180%" }}>
                                                <b style={{ color: "#5ab769" }}>Date of Birth:</b> {studentdetail.dob ? new Date(studentdetail.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}<br />
                                                <b style={{ color: "#5ab769" }}>Mobile:</b> {studentdetail.mobile}<br />
                                                <b style={{ color: "#5ab769" }}>Marital Status: </b>{studentdetail.maritalstatus}<br />
                                                <b style={{ color: "#5ab769" }}>Guardian's Mobile:</b> {studentdetail.guardianmob}<br />
                                                <b style={{ color: "#5ab769" }}>Spouse's Mobile:</b> {studentdetail.spousemob}<br />
                                            </div>
                                        </Col>
                                        <Col className='col-3'>
                                            <img src={passimgPreview} style={{ height: "auto", width: "150px" }} /><br /><br />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='col-3'>
                                            <Row style={{ marginTop: "5%" }}>
                                                <Col className='col-6'>
                                                    <div style={{ lineHeight: "180%" }}>
                                                        <b style={{ color: "#5ab769" }}>Identity Card:</b> {studentdetail.identity}<br />
                                                        <b style={{ color: "#5ab769" }}>Proof:</b> <img src={docimgPreview} onClick={handleDDialogOpen} style={{ height: "auto", width: "150px" }} /><br /><br />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className='col-3'>
                                            <div style={{ lineHeight: "180%" }}>
                                                <b style={{ color: "#5ab769" }}>Address:</b> {studentdetail.address}<br />
                                                <b style={{ color: "#5ab769" }}>District:</b> {studentdetail.district}<br />
                                                <b style={{ color: "#5ab769" }}>PO:</b> {studentdetail.postoffice}<br />
                                                <b style={{ color: "#5ab769" }}>State:</b> {studentdetail.state?.name}<br />
                                                <b style={{ color: "#5ab769" }}>Country:</b> {studentdetail.country?.name}<br />
                                            </div>
                                        </Col>
                                        <Col className='col-3'>
                                            <div style={{ lineHeight: "180%" }}>
                                                <b style={{ color: "#5ab769" }}>Highest Qualification: </b> {studentdetail.highqual}<br />
                                                <b style={{ color: "#5ab769" }}>Institute Name:</b> {studentdetail.institutename}<br />
                                                <b style={{ color: "#5ab769" }}>Mark:</b> {studentdetail.mark}<br />
                                                <b style={{ color: "#5ab769" }}>Payment Method:</b> {studentdetail.paymentmethod}<br />
                                                <b style={{ color: "#5ab769" }}>Fee Status: </b> Installment {studentdetail.feestatus}<br />
                                                <b style={{ color: "#5ab769" }}>Payment Status: </b> {studentdetail.paymentstatus}<br />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className='col-12'>
                                        <div style={{ marginTop: "5%" }}>
                                            <b style={{ color: "#5ab769" }} className="title">Payment Details</b><br /><br />
                                            <div style={{ lineHeight: "180%" }}>
                                                <b style={{ color: "#5ab769" }}>Total Course Fee: </b> {studentdetail.coursefee}<br />
                                                <b style={{ color: "#5ab769" }}>Total no.Installment:</b> {studentdetail.noofinst}<br />
                                                <b style={{ color: "#5ab769" }}>Installment Bill Date:</b> {studentdetail.billdate}<br />
                                            </div>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "20%" }}>Date</th>
                                                        <th style={{ width: "20%" }}>Payment Method</th>
                                                        <th style={{ width: "10%" }}>Amount</th>
                                                        <th style={{ width: "50%" }}>Comment</th>
                                                        <th style={{ width: "20%" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((item, index) => (
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
                                                                <textarea
                                                                    className="input11st"
                                                                    type="text"
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                />
                                                            ) : item.comment}</td>
                                                            <td style={{ display: "flex", justifyContent: "space-between", width: "20%" }}>
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
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td colSpan="1"></td>
                                                        <td>
                                                            <b>Total:</b>
                                                        </td>
                                                        <td>{data.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2)}</td>
                                                        <td colSpan={1} style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                            <b>Balance: </b>{balance} 
                                                            <b style={{ color: studentdetail.feestatus === 'Unpaid' ? 'red' : 'green' }}>Installment {studentdetail.feestatus}</b>
                                                            <b style={{ color: studentdetail.paymentstatus === 'Pending' ? 'red' : 'green' }}>Payment {studentdetail.paymentstatus}</b>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ marginTop: "5%" }}>
                                            <b style={{ color: "#5ab769" }} className="title">Add payment</b><br /><br />
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
                                                        </td>
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
                                        </div>
                                    </div>
                                </CardContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Dialog open={openDDialog} onClose={handleDDialogClose}>
                <DialogTitle><h5>{studentdetail.identity} Proof</h5></DialogTitle>
                <DialogContent>
                    <img src={docimgPreview} style={{ maxWidth: "100%" }} alt="Doc Proof" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default StudentView;
