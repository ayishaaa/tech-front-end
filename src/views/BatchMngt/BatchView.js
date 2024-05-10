import React, { useEffect, useState } from 'react';
import "assets/css/admin.css";
import {
    CardContent,
    DialogContentText,
} from '@mui/material';
import axios from 'axios';
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faCheck, faClose, faPen, faRectangleList, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from "react-hot-toast";

import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
} from 'reactstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icons from '../Icons';
import ReactPaginate from 'react-paginate';

function BatchView() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [syllabus, setSyllabus] = useState("");
    const [price, setPrice] = useState("");
    const [offerprice, setOfferprice] = useState("");
    const [status, setStatus] = useState("");
    const [resource, setResource] = useState([]);
    const [resourceErr, setResourceErr] = useState("");
    const [banner, setBanner] = useState("");
    const [icon, setIcon] = useState("");
    const [resourcelist, setResourceList] = useState([]);
    const [error, setError] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios.get(`${backendUrl}/admin/getcoursedetail/${id}`)
            .then((response) => {
                setBatchName(response.data.batchname);
                setStartDate(response.data.startdate);
                setEndDate(response.data.enddate);
                setTiming(response.data.timing);
                setCourse(response.data.course);
            })
            .catch((error) => {
                console.error(error);
            });
    };

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

    function getResourceNames(resourceIds) {
        return resourceIds.map((resourceId) => {
            const resource = resourcelist.find((resourceItem) => resourceItem._id === resourceId);
            return resource ? resource.name : "";
        });
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setIsEditing(!isEditing);
    };

    const handleResource = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue) {

            if (!resource.includes(selectedValue)) {
                setResource([...resource, selectedValue]);
                setResourceErr("");
            } else {
                setResourceErr("Resource is already selected");
            }
        }
    };


    const deleteSelectedResource = (index) => {
        const newResources = [...resource];
        newResources.splice(index, 1);
        setResource(newResources);
    };

    const previousPage = () => {
        navigate('/admin/courselist');
    };
    const handleClose = () => {
        toggleEditMode();
        fetchData();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        var formIsValid = true;

        if (!resource) {
            setResourceErr("Resource is required");
            formIsValid = false;
        } else {
            setResourceErr("");
        }

        if (formIsValid) {

            var formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("duration", duration);
            formData.append("syllabus", syllabus);
            formData.append("price", price);
            formData.append("offerprice", offerprice);
            formData.append("status", status);
            formData.append("resource", resource);
            formData.append("banner", banner);
            formData.append("icon", icon);
            console.log(formData);
            axios
                .put(`${backendUrl}/admin/updatecourse/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then((response) => {
                    console.log(response);
                    toast.success("Course edited successfully!", {
                        position: "top-right",
                        duration: 3000,
                    });
                    toggleEditMode();
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

    // const toggleStatus = async (id) => {
    //     try {
    //       const updatedData = data.map((item) => {
    //         if (item._id === id) {
    //           return { ...item, status: item.status === 'Active' ? 'Deactive' : 'Active' };
    //         }
    //         return item;
    //       });
    //       setData(updatedData);
      
    //       const token = localStorage.getItem("token");
    //       axios.defaults.headers.common["Authorization"] = token;
    //       await axios.put(`${backendUrl}/admin/updatestatus/${id}`, {
    //         status: updatedData.find((item) => item._id === id).status,
    //       });
    //     } catch (error) {
    //       console.error(error);
    //       const previousStatus = updatedData.find((item) => item._id === id).status === 'Active' ? 'Deactive' : 'Active';
    //       const revertedData = data.map((item) => (item._id === id ? { ...item, status: previousStatus } : item));
    //       setData(revertedData);
    //     }
    //   };      


    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card className='col-12' style={{ borderRadius: "15px" }}>
                            <CardBody className='col-12'>
                                <CardTitle tag="h4" className='text-dark px-5 cardtitle'>
                                    <div><FontAwesomeIcon icon={faRectangleList} /> Course View</div>
                                    <FontAwesomeIcon icon={faAnglesLeft} onClick={previousPage} />
                                </CardTitle>
                                <CardContent>
                                    <div>
                                        <h4><strong style={{ color: "#5ab769" }}>{name}</strong></h4>
                                    </div>
                                    <Row>
                                        <Col className='col-6'>
                                            <img src={`${backendUrl}/${icon}`} /><br />
                                            <img src={`${backendUrl}/${banner}`} /><br />
                                            <DialogContentText>
                                                <br />
                                                <strong style={{ color: "#5ab769" }}>Duration:</strong> {duration}
                                            </DialogContentText><br />
                                            <Row className='col-12' style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Col className='col-8' style={{ paddingTop: "7%" }}>
                                                    <strong style={{ color: "#5ab769" }}>{editMode ? "Edit here" : "Resource Team"}</strong>
                                                </Col>
                                                {isEditing ? (
                                                    <Col style={{ display: "flex" }} className='col-4'>
                                                        <button onClick={handleClose} style={{ borderRadius: "25px", height: "65%", padding: "8%" }}><FontAwesomeIcon icon={faXmark} /></button>
                                                        <button onClick={handleSubmit} style={{ borderRadius: "25px", height: "65%", padding: "8%" }}><FontAwesomeIcon icon={faCheck} /></button>
                                                    </Col>

                                                ) : (
                                                    <Col className='col-4'>
                                                        <button onClick={toggleEditMode} style={{ borderRadius: "25px", height: "70%", padding: "10%" }}><FontAwesomeIcon icon={faPen} /></button>
                                                    </Col>
                                                )}
                                            </Row>
                                            {isEditing ? (
                                                <>
                                                    <select
                                                        value=""
                                                        onChange={handleResource}
                                                        variant="standard"
                                                        fullWidth
                                                        className="admininput"
                                                        style={{ borderColor: "#5ab769", borderRadius: "25px", border: "1px solid #5ab769", width: "25%", width: "100%", padding: "2% 0% 2% 3%" }}
                                                    >
                                                        <option value="" disabled>
                                                            Select a resource
                                                        </option>
                                                        {resourcelist.map((resourceItem) => (
                                                            <option key={resourceItem._id} value={resourceItem._id}>
                                                                {resourceItem.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="hiiiii">
                                                        {resourceErr && <div style={{ color: "red" }}>{resourceErr}</div>}
                                                        {resource.map((selectedResource, index) => (
                                                            <div key={index}>
                                                                <span style={{ width: "50%", display: 'flex', justifyContent: 'space-between', color: "#5ab769" }}>{resourcelist.find(resourceItem => resourceItem._id === selectedResource)?.name}
                                                                    <FontAwesomeIcon
                                                                        icon={faClose}
                                                                        onClick={() => deleteSelectedResource(index)}
                                                                        style={{ cursor: "pointer", marginLeft: `5px !important` }}
                                                                    />
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <DialogContentText alignItems={'center'}>
                                                        {getResourceNames(resource).map((resourceName, index) => (
                                                            <div style={{ display: "flex" }} key={index}>{resourceName}</div>
                                                        ))}
                                                    </DialogContentText>
                                                </>
                                            ) : (
                                                <DialogContentText alignItems={'center'}>
                                                    {getResourceNames(resource).map((resourceName, index) => (
                                                        <div style={{ display: "flex" }} key={index}>{resourceName}</div>
                                                    ))}
                                                </DialogContentText>
                                            )}
                                            <br />
                                        </Col>
                                        <Col className='col-6'>
                                            <DialogContentText>
                                                <strong style={{ color: "#5ab769" }}>Description:</strong> <br /><div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: description }} />
                                            </DialogContentText>
                                            <br />
                                            <DialogContentText>
                                                <strong style={{ color: "#5ab769" }}>Syllabus:</strong> <br /><div dangerouslySetInnerHTML={{ __html: syllabus }} />
                                            </DialogContentText>
                                            <br />
                                            <DialogContentText style={{ display: "flex" }}>
                                                <strong style={{ color: "#5ab769" }}>Price:</strong>
                                                <p style={{ textDecoration: "line-through", margin: "0 5px 0 5px" }}> ₹{price} </p>
                                                <strong style={{ color: "#5ab769" }}> ₹{offerprice}</strong>
                                            </DialogContentText>
                                            <br />
                                            <DialogContentText style={{ display: "flex" }}>
                                                <strong style={{ color: "#5ab769" }}>Status:</strong> 
                                                <span style={{ color: status === 'Active' ? '#5ab769' : '#e05757', margin: "0 5px 0 5px" }}>
                                                    {status}
                                                </span>
                                                {/* <Switch
                                                    checked={status === 'Active'}
                                                    onChange={() => toggleStatus(id)}
                                                    color={status === 'Active' ? 'success' : 'error'}
                                                    style={{
                                                    color: status === 'Active' ? '#5ab769' : '#e05757',
                                                    }}
                                                /> */}
                                            </DialogContentText>
                                            <br />
                                        </Col>
                                    </Row>
                                </CardContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default BatchView;
