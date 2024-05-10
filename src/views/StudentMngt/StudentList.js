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
import Select from 'react-select';

function StudentList() {
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
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("");
  const [selectedFeeFilter, setSelectedFeeFilter] = useState("");
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSort = (field, type) => {
    const newSortOrder = field === sortBy ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';

    setSortBy(field);
    setSortOrder(newSortOrder);

    ListStudent(page, limit, search, selectedCourseFilter, selectedFeeFilter, type, field, newSortOrder);
  };


  const handleSortN = (field) => handleSort(field, 'N');
  const handleSortM = (field) => handleSort(field, 'M');
  const handleSortF = (field) => handleSort(field, 'F');
  const handleSortC = (field) => handleSort(field, 'C');

  const handleCourseFilterChange = (selectedCourse) => {
    setSelectedCourseFilter(selectedCourse);
  };
  const handleFeeFilterChange = (selectedFee) => {
    setSelectedFeeFilter(selectedFee);
  };

  const feestatusoption = [
    { value: 'Paid', label: 'Paid' },
    { value: 'Unpaid', label: 'Unpaid' }
  ]

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected + 1); // Adjust the page number (0-based index)
  };

  const calculateSerialNumber = (currentIndex) => {
    return (page - 1) * limit + currentIndex + 1;
  };

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
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get(`${backendUrl}/admin/listbatch`)
      .then((response) => {
        setBatchList(response.data.elements);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    ListStudent(page, limit, search, selectedCourseFilter, selectedFeeFilter);
  }, [page, limit, search, selectedCourseFilter, selectedFeeFilter]);

  const ListStudent = (page, limit, search) => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .get(`${backendUrl}/admin/liststudent?page=${page}&limit=${limit}&search=${search}&courseFilter=${selectedCourseFilter}&feeFilter=${selectedFeeFilter}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
      .then((response) => {
        setData(response.data.elements);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const EditStudent = (id) => {
    navigate(`/admin/editstudent/${id}`);
  };

  const deleteStudent = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this Student?");
    if (confirmation) {
      try {
        await axios.delete(`${backendUrl}/admin/removestudent/${id}`);
        window.location.href = "/admin/studentlist";
      } catch (error) {
        console.error(error);
      }
    }
  };

  const viewStudent = (id) => {
    navigate(`/admin/viewstudent/${id}`);
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
                </InputGroup>
                <CardTitle tag="h4" className='text-dark px-5 cardtitle'>
                  <div><FontAwesomeIcon icon={faRectangleList} /> Student List</div>
                  <Link style={{ margin: "-2% 0% 0% 0%" }} to="/admin/addstudent">
                    <Button className='btn' style={{ borderRadius: "25px", backgroundColor: "#3a7945", width: "130%", marginLeft: "-25%" }}>Add Student</Button>
                  </Link>
                </CardTitle>
                <Table responsive>
                  <thead className="text-dark">
                    <tr>
                      <th className='sth1'>Sl. no</th>
                      <th className='sth2' onClick={() => handleSortN('fullname')}>
                        Name <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th className='sth3' onClick={() => handleSortM('email')}>
                        Contact <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th className='sth4'>
                        <select
                          // className="form-select"
                          style={{ borderColor: "white" }}
                          value={selectedCourseFilter}
                          onChange={(e) => handleCourseFilterChange(e.target.value)}
                        >
                          <option value="">Course & Batch</option>
                          {courselist && courselist.map((course) => (
                            <option key={course._id} value={course._id}>
                              {course.name}
                            </option>
                          ))}
                        </select>
                        <FontAwesomeIcon icon={faSort} onClick={() => handleSortC('course')} />
                      </th>
                      <th className='sth6'>
                        <select
                          style={{ borderColor: "white" }}
                          value={selectedFeeFilter}
                          onChange={(e) => handleFeeFilterChange(e.target.value)}
                        >
                          <option value="">Fee Status</option>
                          {feestatusoption.map((fee) => (
                            <option key={fee.value} value={fee.value}>
                              {fee.label}
                            </option>
                          ))}
                        </select>
                        <FontAwesomeIcon icon={faSort} onClick={() => handleSortF('feestatus')} />
                      </th>
                      <th className='cth7'>View</th>
                      <th className='cth8'>Edit</th>
                      <th className='cth9'>Delete</th>
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
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td className='std1'>{calculateSerialNumber(index)}</td>
                          <td className='std2'>
                            <img className='adminimage' src={item.image ? `${backendUrl}/images/${item.image}` : img1} alt="User" /> <br />
                            <strong style={{ color: "#5ab769" }}> {item.fullname}</strong>
                          </td>
                          <td className='std3'>
                            <ul className='adminul'>
                              <li>{item.email}</li>
                              <li>{item.mobile}</li>
                            </ul>
                          </td>
                          <td className='std4'>
                            <ul className='adminul'>
                              <li>
                                <strong>{item.course.name}</strong>
                              </li>
                              <li>
                                {item.batch.batchname}
                              </li>
                            </ul>
                          </td>
                          <td className='ctd6'>
                            <span style={{ color: item.feestatus === 'Paid' ? '#5ab769' : '#e05757' }}>
                              Installment <strong>{item.feestatus}</strong>
                            </span><br />
                            <span style={{ color: item.paymentstatus === 'Completed' ? '#5ab769' : '#e05757' }}>
                              Payment <strong>{item.paymentstatus}</strong>
                            </span>
                          </td>
                          <td className='ctd7'>
                            <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#f6bf61" }} onClick={() => viewStudent(item._id)}>View</button>
                          </td>
                          <td className='ctd8'>
                            <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#5ab769" }} onClick={() => EditStudent(item._id)}>Edit</button>
                          </td>
                          <td className='ctd9'>
                            <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#e05757" }} onClick={() => deleteStudent(item._id)}>Delete</button>
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

export default StudentList;
