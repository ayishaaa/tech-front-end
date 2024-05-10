import React, { useEffect, useState } from 'react';
import "assets/css/admin.css";
import "assets/css/student.css";
import axios from 'axios';
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft, faChevronRight, faClose, faPen, faRectangleList, faTrash, faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons';
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
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from 'react-router-dom';
import Icons from '../Icons';
import { parse, format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import Select from "react-select"


function PaymentList() {
  const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(false);
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
  // const total = data.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2);
  console.log(totalamountpaid, "ttttttttttt")


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
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get(`${backendUrl}/admin/listpayment?page=${page}&limit=${limit}`)
      .then((response) => {
        setData(response.data.elements);
        console.log(response.data.elements, "daaaaaaaatttttttaaaaaaa");
        setTotalPages(response.data.totalPages);
        const totalPaid = response.data.elements.reduce((total, item) => total + parseFloat(item.amount), 0);
        setTotalAmountPaid(totalPaid);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page, limit]);

  const handleUpdate = (eid, id) => {
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

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
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
                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      const student = studentlist.find(studentItem => studentItem._id === item.studentid);
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
                                  onClick={() => handleUpdate(item._id, item.studentid._id)}
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
                      )
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
    </>
  );
}

export default PaymentList;
