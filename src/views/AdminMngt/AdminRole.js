import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

import "assets/css/role.css"
import axios from 'axios';
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from "react-hot-toast";
import roles from "assets/img/roles.png"

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
import ReactPaginate from 'react-paginate';

function AdminRole() {
  const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
  const [data, setData] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [role, setRole] = useState('');
  const [roleerr, setRoleErr] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  console.log(page, limit, totalPages);

  const capitalizeFirstLetter = (value) => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
};
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

  const calculateSerialNumber = (currentIndex) => {
    return (page - 1) * limit + currentIndex + 1;
  };

  const navigate = useNavigate("");

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    var formIsValid = true;

    if (!role) {
      setRoleErr("Role is required");
      formIsValid = false;
    } else {
      setRoleErr("");
    }
    if (formIsValid) {
      const formdata = {
        role: role,
      }
      console.log(formdata);
      axios
        .post(`${backendUrl}/admin/addrole`, formdata)
        .then((response) => {
          console.log(response);
          toast.success("Role added successfully!", {
            position: "top-right",
            duration: 4000,
          });
          window.location.href = "/admin/rolelist";
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error occured", {
            position: "top-right",
            duration: 4000,
          });
          if (error.response && error.response.status === 400) {
            console.log(error.response.data.message)
            setError(error.response.data.message);
          }
        });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    var formIsValid = true;
    if (!role) {
      setRoleErr("Role is required");
      formIsValid = false;
    } else {
      setRoleErr("");
    }

    if (formIsValid) {
      const formdata = {
        role: role,
      }
      console.log(formdata);
      axios
        .put(`${backendUrl}/admin/updaterole/${selectedProduct._id}`, formdata)
        .then((response) => {
          console.log(response);
          toast.success("Role edited successfully!", {
            position: "top-right",
            duration: 3000,
          });
          window.location.href = "/admin/rolelist";
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error occured", {
            position: "top-right",
            duration: 3000,
          });
          if (error.response && error.response.status === 400) {
            setError(error.response.data);
          }
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get(`${backendUrl}/admin/listrole?page=${page}&limit=${limit}`)
      .then((response) => {
        setData(response.data.elements);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page, limit]);

  const editRole = (id) => {
    const selectedProduct = data.find((item) => item._id === id);
    setSelectedProduct(selectedProduct);
    setRole(selectedProduct.role);
    openEditDialog();
  };

  const deleteRole = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this role?");
    if (confirmation) {
      try {
        await axios.delete(`${backendUrl}/admin/removerole/${id}`);
        // setList((prevList) => prevList.filter((item) => item._id !== id));
        window.location.href = "/admin/rolelist";
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setIsAddDialogOpen(false);
  };
  const openEditDialog = (id) => {
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
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
                  <div>
                    <FontAwesomeIcon icon={faRectangleList} /> Admin Role List
                  </div>
                  <Button onClick={openAddDialog} className='btn' style={{ borderRadius: "25px", backgroundColor: "#3a7945", width: "20%", marginTop: "-1%" }}>Add Role</Button>
                </CardTitle>
                <Table responsive>
                  <thead className="text-dark">
                    <tr className='trdiv'>
                      <div className='thdiv1'>
                        <th className='roleth1'><h5 className='roleh5'>Sl. no</h5></th>
                        <th></th>
                        <th className='roleth1'><h5 className='roleh5'>Name</h5></th>
                        <th></th>
                      </div>
                      <div className='thdiv2'>
                        <th className='roleth2'><h5 className='roleh5'>Edit</h5></th>
                        <th className='roleth2'><h5 className='roleh5'>Delete</h5></th>
                      </div>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} className='trdiv1'>
                        <div className='tddiv1'>
                          <td className='roletd'>{calculateSerialNumber(index)}</td>
                          <td></td>
                          <td></td>
                          <td>
                            <img className='roleimage' src={roles} />
                          </td>
                          <td className='roletd'>{item.role}</td>
                        </div>
                        <div className='tddiv2'>
                          <td className='roletd'>
                            <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#5ab769" }} onClick={() => editRole(item._id)}>Edit</button>
                          </td>
                          <td className='roletd'>
                            <button className="btn" style={{ borderRadius: "25px", backgroundColor: "#e05757" }} onClick={() => deleteRole(item._id)}>Delete</button>
                          </td>
                        </div>
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
      <Dialog open={isAddDialogOpen} onClose={closeAddDialog}>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the role name:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            type="text"
            value={role}
            onChange={(e) => setRole(capitalizeFirstLetter(e.target.value))}
            fullWidth
          />
          {roleerr && <p style={{ color: "red", marginLeft: "25%" }}>{roleerr}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSubmit} style={{ backgroundColor: "#5ab769" }}>
            Add
          </Button>
          <Button onClick={closeAddDialog} style={{ backgroundColor: "#e05757" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the role name:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            type="text"
            value={role}
            onChange={(e) => setRole(capitalizeFirstLetter(e.target.value))}
            fullWidth
          />
          {roleerr && <p style={{ color: "red", marginLeft: "25%" }}>{roleerr}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditSubmit} style={{ backgroundColor: "#5ab769" }}>
            Edit
          </Button>
          <Button onClick={closeEditDialog} style={{ backgroundColor: "#e05757" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdminRole;
