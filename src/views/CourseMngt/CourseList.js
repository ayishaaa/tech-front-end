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
import { faCheck, faChevronLeft, faChevronRight, faClose, faPen, faRectangleList, faXmark } from '@fortawesome/free-solid-svg-icons';
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
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Icons from '../Icons';
import ReactPaginate from 'react-paginate';

function CourseList() {
  const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [price, setPrice] = useState("");
  const [offerprice, setOfferprice] = useState("");
  const [status, setStatus] = useState("");
  const [resource, setResource] = useState([]);
  const [resourceerr, setResourceErr] = useState("");
  const [banner, setBanner] = useState("");
  const [icon, setIcon] = useState("");
  const [resourcelist, setResourceList] = useState([]);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log(page, limit, totalPages);

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
      .get(`${backendUrl}/admin/listresource`)
      .then((response) => {
        setResourceList(response.data.elements);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get(`${backendUrl}/admin/listallcourse?page=${page}&limit=${limit}`)
      .then((response) => {
        setData(response.data.elements);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page, limit]);

  const EditCourse = (id) => {
    navigate(`/admin/editcourse/${id}`);
  };

  const deleteCourse = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this Course?");
    if (confirmation) {
      try {
        await axios.delete(`${backendUrl}/admin/removecourse/${id}`);
        // setList((prevList) => prevList.filter((item) => item._id !== id));
        window.location.href = "/admin/courselist";
      } catch (error) {
        console.error(error);
      }
    }
  };

  const viewCourse = (id) => {
    navigate(`/admin/viewcourse/${id}`);
  };


  function getResourceNames(resourceIds) {
    return resourceIds.map((resourceId) => {
      const resource = resourcelist.find((resourceItem) => resourceItem._id === resourceId);
      return resource ? resource.name : "";
    });
  }


  const toggleStatus = async (id) => {
    try {
      const updatedData = data.map((item) => {
        if (item._id === id) {
          return { ...item, status: item.status === 'Active' ? 'Deactive' : 'Active' };
        }
        return item;
      });
      setData(updatedData);

      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      await axios.put(`${backendUrl}/admin/updatestatus/${id}`, {
        status: updatedData.find((item) => item._id === id).status,
      });
    } catch (error) {
      console.error(error);
      const previousStatus = updatedData.find((item) => item._id === id).status === 'Active' ? 'Deactive' : 'Active';
      const revertedData = data.map((item) => (item._id === id ? { ...item, status: previousStatus } : item));
      setData(revertedData);
    }
  };


  const toggleEditMode = () => {
    setEditMode(!editMode);
    setIsEditing(!isEditing);
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
                  <div><FontAwesomeIcon icon={faRectangleList} /> Course List</div>
                  <Link style={{ margin: "-2% 0% 0% 0%" }} to="/admin/addcourse">
                    <Button className='btn' style={{ borderRadius: "25px", backgroundColor: "#3a7945", width: "130%", marginLeft: "-25%" }}>Add Course</Button>
                  </Link>
                </CardTitle>
                <Table responsive>
                  <thead className="text-dark">
                    <tr>
                      <th className='cth1'>Sl. no</th>
                      <th className='cth2'>Name</th>
                      <th className='cth3'>Description</th>
                      <th className='cth4'>Resource Team</th>
                      <th className='cth5'>Status</th>
                      <th className='cth6'>View</th>
                      <th className='cth7'>Edit</th>
                      <th className='cth8'>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className='ctd1'>{calculateSerialNumber(index)}</td>
                        <td className='ctd2'>
                          <strong style={{ color: "#5ab769" }}>{item.name}</strong>
                          <img className='courseimage' src={`${backendUrl}/${item.banner}`} />

                        </td>
                        <td className='ctd3'>
                          <ul className='adminul'>
                            <div dangerouslySetInnerHTML={{ __html: item.description }} />
                            <li><strong style={{ color: "#5ab769" }}>Duration:</strong> {item.duration}</li>
                            <li style={{ display: "flex" }}>
                              <strong style={{ color: "#5ab769" }}>Price:</strong>
                              <p style={{ textDecoration: "line-through", margin: "0 5px 0 5px" }}> ₹{item.price} </p>
                              <strong style={{ color: "#5ab769" }}> ₹{item.offerprice}</strong>
                            </li>
                          </ul>
                        </td>
                        <td className='ctd4'>
                          {getResourceNames(item.resource).map((resourceName, index) => (
                            <div key={index}>{resourceName}</div>
                          ))}
                        </td>
                        <td className='ctd5'>
                          <Switch
                            checked={item.status === 'Active'}
                            onChange={() => toggleStatus(item._id)}
                            color={item.status === 'Active' ? 'success' : 'error'}
                            style={{
                              color: item.status === 'Active' ? '#5ab769' : '#e05757',
                            }}
                          />
                          <span style={{ color: item.status === 'Active' ? '#5ab769' : '#e05757' }}>
                            {item.status}
                          </span>
                        </td>
                        <td className='ctd6'>
                          <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#f6bf61" }} onClick={() => viewCourse(item._id)}>View</button>
                        </td>
                        <td className='ctd7'>
                          <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#5ab769" }} onClick={() => EditCourse(item._id)}>Edit</button>
                        </td>
                        <td className='ctd8'>
                          <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#e05757" }} onClick={() => deleteCourse(item._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
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

export default CourseList;
