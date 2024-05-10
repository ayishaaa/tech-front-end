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
import { faChevronLeft, faChevronRight, faRectangleList } from '@fortawesome/free-solid-svg-icons';
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

function AdminList() {
  const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [rolelist, setRoleList] = useState([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log(backendUrl, "rrrrffffffffeee");

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
      .get(`${backendUrl}/admin/listrole`)
      .then((response) => {
        setRoleList(response.data.elements);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get(`${backendUrl}/admin/listadmin?page=${page}&limit=${limit}`)
      .then((response) => {
        setData(response.data.elements);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page, limit]);

  const editAdmin = (id) => {
    navigate(`/admin/editadmin/${id}`);
  };

  const deleteAdmin = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this admin?");
    if (confirmation) {
      try {
        await axios.delete(`${backendUrl}/admin/removeadmin/${id}`);
        // setList((prevList) => prevList.filter((item) => item._id !== id));
        window.location.href = "/admin/adminlist";
      } catch (error) {
        console.error(error);
      }
    }
  };

  const viewAdmin = (id) => {
    const selectedProduct = data.find((item) => item._id === id);
    setSelectedProduct(selectedProduct);
    setName(selectedProduct.name);
    setUsername(selectedProduct.username);
    setEmail(selectedProduct.email);
    setAddress(selectedProduct.address);
    setCountry(selectedProduct.country);
    setState(selectedProduct.state);
    setPhone(selectedProduct.phone);
    setRole(selectedProduct.role);
    setDescription(selectedProduct.description);
    setImage(selectedProduct.image);
    setImage(selectedProduct.image);
    openViewDialog();
  };

  const openViewDialog = (id) => {
    setIsViewDialogOpen(true);
  };

  const closeViewDialog = () => {
    setIsViewDialogOpen(false);
  };

  const toggleStatus = async (id) => {
    let updatedData;
    try {
      updatedData = data.map((item) => {
        if (item._id === id) {
          return { ...item, status: item.status === 'Active' ? 'Deactive' : 'Active' };
        }
        return item;
      });
      setData(updatedData);

      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      await axios.put(`${backendUrl}/admin/updateadminstatus/${id}`, {
        status: updatedData.find((item) => item._id === id).status,
      });
    } catch (error) {
      console.error(error);
      const previousStatus = updatedData.find((item) => item._id === id).status === 'Active' ? 'Deactive' : 'Active';
      const revertedData = data.map((item) => (item._id === id ? { ...item, status: previousStatus } : item));
      setData(revertedData);
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
                  <div><FontAwesomeIcon icon={faRectangleList} /> Admin List</div>
                  <Link style={{ margin: "-2% 0% 0% 0%" }} to="/admin/addadmin">
                    <Button className='btn' style={{ borderRadius: "25px", backgroundColor: "#3a7945", width: "130%", marginLeft: "-25%" }}>Add Admin</Button>
                  </Link>
                </CardTitle>
                <Table responsive>
                  <thead className="text-dark">
                    <tr>
                      <th>Sl. no</th>
                      <th>Name</th>
                      <th></th>
                      <th>Contact</th>
                      <th>Place</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{calculateSerialNumber(index)}</td>
                        <td className='admin'>
                          <img className='adminimage' src={`${backendUrl}/images/${item.image}`} />
                        </td>
                        <td><ul className='adminul'><li>{item.name}</li><li>{item.username}</li></ul></td>
                        <td><ul className='adminul'><li>{item.email}</li><li>{item.phone}</li></ul></td>
                        <td><ul className='adminul'><li>{item.address}</li><li>{item.state}</li></ul></td>
                        <td>{rolelist.find(role => role._id === item.role)?.role}</td>
                        <td>
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
                        <td>
                          <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#f6bf61" }} onClick={() => viewAdmin(item._id)}>View</button>
                        </td>
                        <td>
                          <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#5ab769" }} onClick={() => editAdmin(item._id)}>Edit</button>
                        </td>
                        <td>
                          <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#e05757" }} onClick={() => deleteAdmin(item._id)}>Delete</button>
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
      <Dialog open={isViewDialogOpen} onClose={closeViewDialog} style={{ height: "80%" }}>
        <DialogTitle><strong>View Admin Details</strong></DialogTitle>
        <DialogContent>
          <Row>
            <Col className='col-6'>
              <img src={`${backendUrl}/images/${image}`} style={{ height: "auto", width: "50%"}}/>
            </Col>
            <Col className='col-6'>
              <DialogContentText><strong>Name:</strong> {name}</DialogContentText>
              <DialogContentText><strong>Username:</strong> {username}</DialogContentText>
              <DialogContentText><strong>Email:</strong> {email}</DialogContentText>
              <DialogContentText><strong>Address:</strong> {address}</DialogContentText>
              <DialogContentText><strong>Country:</strong> {country}</DialogContentText>
              <DialogContentText><strong>State:</strong> {state}</DialogContentText>
              <DialogContentText><strong>Phone:</strong> {phone}</DialogContentText>
              <DialogContentText><strong>Role:</strong> {rolelist.find(roleItem => roleItem._id === role)?.role}</DialogContentText>
              <DialogContentText><strong>Description:</strong> {description}</DialogContentText>
            </Col>
          </Row>
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

export default AdminList;
