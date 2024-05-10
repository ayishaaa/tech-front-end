import React, { useEffect, useState } from 'react';
import "assets/css/admin.css";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Switch,
    TextField,
} from '@mui/material';
import axios from 'axios';
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft, faChevronRight, faClose, faPen, faRectangleList, faSort, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from "react-hot-toast";
import img1 from "assets/img/default-avatar.png";

import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Row,
    Col,
    Button,
    Pagination,
    InputGroup,
    Input,
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Icons from '../Icons';
import ReactPaginate from 'react-paginate';
import { format, parseISO } from 'date-fns';

function AccountList() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const [isEditing, setIsEditing] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearchTerm] = useState("");
    const [courselist, setCourseList] = useState([]);
    const [batchlist, setBatchList] = useState([]);
    const [paymentlist, setPaymentList] = useState([]);
    const [selectedCourseFilter, setSelectedCourseFilter] = useState("");
    const [selectedBatchFilter, setSelectedBatchFilter] = useState("");
    const [selectedFeeFilter, setSelectedFeeFilter] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const handleSort = (field, type) => {
        const newSortOrder = field === sortBy ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
        setSortBy(field);
        setSortOrder(newSortOrder);
        ListStudent(page, limit, search, selectedCourseFilter, selectedBatchFilter, selectedFeeFilter, type, field, newSortOrder);
    };

    const handleSortN = (field) => handleSort(field, 'N');
    const handleSortM = (field) => handleSort(field, 'M');
    const handleSortF = (field) => handleSort(field, 'F');
    const handleSortC = (field) => handleSort(field, 'C');
    const handleCourseFilterChange = (selectedCourse) => {
        setSelectedCourseFilter(selectedCourse);
    };

    const handleBatchFilterChange = (selectedBatch) => {
        setSelectedBatchFilter(selectedBatch);
    };
    const handleFeeFilterChange = (selectedFee) => {
        setSelectedFeeFilter(selectedFee);
    };

    const handlePageChange = (selectedPage) => {
        setPage(selectedPage.selected + 1);
    };

    const calculateSerialNumber = (currentIndex) => {
        return (page - 1) * limit + currentIndex + 1;
    };

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

        ListStudent(page, limit, search, selectedCourseFilter, selectedBatchFilter, selectedFeeFilter);
    }, [page, limit, search, selectedCourseFilter, selectedBatchFilter, selectedFeeFilter]);

    const ListStudent = (page, limit, search) => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios
            .get(`${backendUrl}/admin/listaccount?page=${page}&limit=${limit}&search=${search}&courseFilter=${selectedCourseFilter}&batchFilter=${selectedBatchFilter}&feeFilter=${selectedFeeFilter}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
            .then((response) => {
                setData(response.data.elements);
                setTotalPages(response.data.totalPages);
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
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            await axios.put(`${backendUrl}/admin/updatepaymentstatus/${id}`, {
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
            const token = localStorage.getItem("token");
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
            const token = localStorage.getItem("token");
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
            const token = localStorage.getItem("token");
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

    const viewStudent = (id) => {
        navigate(`/admin/viewaccount/${id}`);
    };

    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card className='col-12' style={{ borderRadius: "15px" }}>
                            <CardBody className='col-12'>
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
                                <CardTitle tag="h4" className='text-dark px-5 cardtitle'>
                                    <div><FontAwesomeIcon icon={faRectangleList} /> Account Management</div>
                                </CardTitle>
                                <Table responsive>
                                    <thead className="text-dark">
                                        <tr>
                                            <th className='cth1'>Sl. no</th>
                                            <th className='cth2' onClick={() => handleSortN('fullname')}>
                                                Name <FontAwesomeIcon icon={faSort} />
                                            </th>
                                            <th className='cth3'>
                                                Course & Batch <FontAwesomeIcon icon={faSort} onClick={() => handleSortC('course')} />
                                            </th>
                                            <th className='ath4' style={{ width: "8%" }}>Bill Dates</th>
                                            <th className='cth5' style={{ width: "20%" }}>Payment Details</th>
                                            <th className='ath8'>Payment Status</th>
                                            <th className='cth7'>View</th>
                                        </tr>
                                    </thead>
                                    {data.length === 0 ? (
                                        <tbody>
                                            <tr>
                                                <td colSpan="8">
                                                    <div className="text-center mt-4">Nothing to show</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            {data.slice().reverse().map((item, index) => (
                                                <tr key={index}>
                                                    <td className='std1'>{calculateSerialNumber(index)}</td>
                                                    <td className='std2'>
                                                        <img className='adminimage' src={item.image ? `${backendUrl}/images/${item.image}` : img1} alt="User" />
                                                        <ul className='adminul'>
                                                            <li><strong style={{ color: "#5ab769" }}> {item.fullname}</strong></li>
                                                            <li>{item.email}</li>
                                                            <li>{item.mobile}</li>
                                                        </ul>
                                                    </td>
                                                    <td className='std3'>
                                                        <ul className='adminul' style={{ width: "80%" }}>
                                                            <li>
                                                                {/* <strong>{courselist.find(course => course._id === item.course)?.name}</strong> */}
                                                                <strong>{item.course.name}</strong>
                                                            </li>
                                                            <li>
                                                                <strong>Batch:</strong>
                                                                {/* {batchlist.find(batch => batch._id === item.batch)?.batchname} */}
                                                                {item.batch.batchname}
                                                            </li>
                                                            <li><strong>No. of Installation:</strong> {item.noofinst}</li>
                                                            <li><strong style={{ color: "#5ac769" }}>Course fee:</strong>₹ {item.coursefee}</li>
                                                        </ul>
                                                    </td>
                                                    <td className='atd4' style={{ width: "8%" }}>
                                                        {item.billdate && item.billdate.split(',').map((word, index) => (
                                                            <div key={index}>
                                                                {word.trim()}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className='std5' style={{ width: "20%" }}>
                                                        {paymentlist
                                                            .filter((payment) => payment.studentid === item._id)
                                                            .map((payment) => (
                                                                <div key={payment._id} style={{ display: "flex", justifyContent: "space-between" }}>
                                                                    {payment.date}<br /><br />
                                                                    <strong>₹ {payment.amount}</strong>
                                                                </div>
                                                            ))}
                                                        <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                                                            <strong style={{ color: "#5ac769" }}>Total paid: </strong><strong style={{ color: "#5ac769" }}>₹ {calculateTotalPayment(item._id, "hiii")}</strong>
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <strong style={{ color: "#5ac769" }}>Course fee:</strong><strong style={{ color: "#5ac769" }}>₹ {item.coursefee}</strong>
                                                        </div>
                                                    </td>
                                                    <td className='atd8'>
                                                        <span style={{ color: item.feestatus === 'Paid' ? '#5ab769' : '#e05757' }}>
                                                            Installment <strong>{item.feestatus}</strong>
                                                        </span><br /><br />
                                                        <br />
                                                        <span style={{ color: item.paymentstatus === 'Completed' ? '#5ab769' : '#e05757' }}>
                                                            Payment <strong>{item.paymentstatus}</strong>
                                                        </span>
                                                    </td>
                                                    <td className='ctd7'>
                                                        <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#f6bf61" }} onClick={() => viewStudent(item._id)}>View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                </Table>
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
        </>
    );
}

export default AccountList;
