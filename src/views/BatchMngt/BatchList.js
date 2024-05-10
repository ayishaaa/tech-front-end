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
import { faCheck, faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faClose, faPen, faRectangleList, faSort, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from "react-hot-toast";

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
  InputGroupAddon,
  Input,
  InputGroupText,
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from 'react-router-dom';
import Icons from '../Icons';
import ReactPaginate from 'react-paginate';

function BatchList() {
  const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [sortByB, setSortByB] = useState('');
  const [sortOrderB, setSortOrderB] = useState('');
  const [sortByS, setSortByS] = useState('');
  const [sortOrderS, setSortOrderS] = useState('');
  const [sortByT, setSortByT] = useState('');
  const [sortOrderT, setSortOrderT] = useState('');
  const [sortByC, setSortByC] = useState('');
  const [sortOrderC, setSortOrderC] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [batchname, setBatchName] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [timing, setTiming] = useState("");
  const [course, setCourse] = useState("");
  const [courselist, setCourseList] = useState([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("");
  const [selectedstartDate, setSelectedStartDate] = useState("");
  const [selectedendDate, setSelectedEndDate] = useState("");

  const handleSortB = (field) => {
    const newSortOrderB = field === sortByB ? (sortOrderB === 'asc' ? 'desc' : 'asc') : 'asc';

    setSortByB(field);
    setSortOrderB(newSortOrderB);
    setSortByS("");
    setSortOrderS("");
    setSortByT("");
    setSortOrderT("");
    setSortByC("");
    setSortOrderC("");

    if (sortByB) {
      ListBatch(page, limit, searchTerm, selectedCourseFilter, selectedstartDate, selectedendDate, 'batchname', newSortOrderB);
    }
  };

  const handleSortS = (field) => {
    const newSortOrderS = field === sortByS ? (sortOrderS === 'asc' ? 'desc' : 'asc') : 'asc';

    setSortByB("");
    setSortOrderB("");
    setSortByS(field);
    setSortOrderS(newSortOrderS);
    setSortByT("");
    setSortOrderT("");
    setSortByC("");
    setSortOrderC("");

    if (field) {
      ListBatch(page, limit, searchTerm, selectedCourseFilter, selectedstartDate, selectedendDate, 'startdate', newSortOrderS);
    }
  };

  const handleSortT = (field) => {
    const newSortOrderT = field === sortByT ? (sortOrderT === 'asc' ? 'desc' : 'asc') : 'asc';

    setSortByB("");
    setSortOrderB("");
    setSortByS("");
    setSortOrderS("");
    setSortByT(field);
    setSortOrderT(newSortOrderT);
    setSortByC("");
    setSortOrderC("");

    if (field) {
      ListBatch(page, limit, searchTerm, selectedCourseFilter, selectedstartDate, selectedendDate, 'enddate', newSortOrderT);
    }
  };

  const handleSortC = (field) => {
    const newSortOrderC = field === sortByC ? (sortOrderC === 'asc' ? 'desc' : 'asc') : 'asc';

    setSortByB("");
    setSortOrderB("");
    setSortByS("");
    setSortOrderS("");
    setSortByT("");
    setSortOrderT("");
    setSortByC(field);
    setSortOrderC(newSortOrderC);

    if (field) {
      ListBatch(page, limit, searchTerm, selectedCourseFilter, selectedstartDate, selectedendDate, 'course', newSortOrderC);
    }
  };

  const handleCourseFilterChange = (selectedCourse) => {
    setSelectedCourseFilter(selectedCourse);
  };

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected + 1);
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
    ListBatch(page, limit, searchTerm, selectedCourseFilter, selectedstartDate, selectedendDate);
  }, [page, limit, searchTerm, selectedCourseFilter, selectedstartDate, selectedendDate]);

  const ListBatch = (page, limit, search) => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;

    const startDateString = selectedstartDate ? selectedstartDate.toISOString() : "";
    const endDateString = selectedendDate ? selectedendDate.toISOString() : "";
    axios
      .get(`${backendUrl}/admin/listbatch?page=${page}&limit=${limit}&search=${search}&courseFilter=${selectedCourseFilter}&startDate=${startDateString}&endDate=${endDateString}&sortByB=${sortByB}&sortOrderB=${sortOrderB}&sortByS=${sortByS}&sortOrderS=${sortOrderS}&sortByT=${sortByT}&sortOrderT=${sortOrderT}&sortByC=${sortByC}&sortOrderC=${sortOrderC}`)
      .then((response) => {
        console.log(response.data.elements);
        setData(response.data.elements);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const EditBatch = (id) => {
    navigate(`/admin/editbatch/${id}`);
  };

  const deleteBatch = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this Batch?");
    if (confirmation) {
      try {
        await axios.delete(`${backendUrl}/admin/removebatch/${id}`);
        // setList((prevList) => prevList.filter((item) => item._id !== id));
        window.location.href = "/admin/batchlist";
      } catch (error) {
        console.error(error);
      }
    }
  };

  const viewBatch = (id) => {
    const selectedProduct = data.find((item) => item._id === id);
    setSelectedProduct(selectedProduct);
    setBatchName(selectedProduct.batchname);
    setStartDate(selectedProduct.startdate);
    setEndDate(selectedProduct.enddate);
    setTiming(selectedProduct.timing);
    setCourse(selectedProduct.course);
    openViewDialog();
  };

  const openViewDialog = (id) => {
    setIsViewDialogOpen(true);
  };

  const closeViewDialog = () => {
    setIsViewDialogOpen(false);
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card className='col-12' style={{ borderRadius: "15px" }}>
              <CardBody className='col-12'>
                <div className='d-flex'>
                  <InputGroup className="no-border col-6">
                    <Input
                      className='inputsearch'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_zoom-bold" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <InputGroup className="no-border col-6">
                    <DatePicker
                      id="startDate"
                      placeholderText="Start Date"
                      selected={selectedstartDate}
                      onChange={(date) => setSelectedStartDate(date)}
                      dateFormat="dd - MM - yyyy"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      className="form-control"
                    />
                    <DatePicker
                      placeholderText="End Date"
                      id="endDate"
                      selected={selectedendDate}
                      onChange={(date) => setSelectedEndDate(date)}
                      dateFormat="dd - MM - yyyy"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      className="form-control"
                    />
                  </InputGroup>
                </div>
                <CardTitle tag="h4" className='text-dark px-5 cardtitle'>
                  <div><FontAwesomeIcon icon={faRectangleList} /> Batch List</div>
                  <Link style={{ margin: "-2% 0% 0% 0%" }} to="/admin/addbatch">
                    <Button className='btn' style={{ borderRadius: "25px", backgroundColor: "#3a7945", width: "130%", marginLeft: "-25%" }}>Add Batch</Button>
                  </Link>
                </CardTitle>
                <Table responsive>
                  <thead className="text-dark">
                    <tr>
                      <th className='bth1'>Sl. no</th>
                      <th className='bth2' onClick={() => handleSortB('batchname')}>
                        Batch Name <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th className='bth3' onClick={() => handleSortS('startdate')}>
                        Batch Duration <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th className='bth4' onClick={() => handleSortT('timing')}>
                        Timing <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th className='bth5'>
                        <select
                          className="form-select"
                          style={{ borderColor: "white" }}
                          value={selectedCourseFilter}
                          onChange={(e) => handleCourseFilterChange(e.target.value)}
                        >
                          <option value="">Courses</option>
                          {courselist.map((course) => (
                            <option key={course._id} value={course._id}>
                              {course.name}
                            </option>
                          ))}
                        </select>
                        <FontAwesomeIcon icon={faSort} onClick={() => handleSortC('course')} />
                      </th>
                      <th className='bth6'>View</th>
                      <th className='bth7'>Edit</th>
                      <th className='bth8'>Delete</th>
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
                          <td className='btd1'>{calculateSerialNumber(index)}</td>
                          <td className='btd2'>
                            <strong style={{ color: "#5ab769" }}>{item.batchname}</strong>
                          </td>
                          <td className='btd3'>
                            {item.startdate} to {item.enddate}
                          </td>
                          <td className='btd4'>
                            {item.timing}
                          </td>
                          <td className='btd5'>
                            {courselist.find(course => course._id === item.course)?.name}
                          </td>
                          <td className='btd6'>
                            <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#f6bf61" }} onClick={() => viewBatch(item._id)}>View</button>
                          </td>
                          <td className='btd7'>
                            <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#5ab769" }} onClick={() => EditBatch(item._id)}>Edit</button>
                          </td>
                          <td className='btd8'>
                            <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#e05757" }} onClick={() => deleteBatch(item._id)}>Delete</button>
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
      <Dialog open={isViewDialogOpen} onClose={closeViewDialog} style={{ height: "100%" }}>
        <DialogTitle><strong>View Batch</strong></DialogTitle>
        <DialogContent>
          <DialogContentText><strong>Batch name:</strong> {batchname}</DialogContentText>
          <DialogContentText><strong>Start Date:</strong> {startdate}</DialogContentText>
          <DialogContentText><strong>End Date:</strong> {enddate}</DialogContentText>
          <DialogContentText><strong>Timing:</strong> {timing}</DialogContentText>
          <DialogContentText><strong>Course:</strong> {courselist.find(courseItem => courseItem._id === course)?.name}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeViewDialog} style={{ backgroundColor: "#e05757" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BatchList;
