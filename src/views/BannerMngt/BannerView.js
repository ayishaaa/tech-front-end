import React, { useEffect, useState } from 'react';
import "assets/css/admin.css";
import {
    CardContent,
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
import { faAnglesLeft, faBackspace, faCheck, faChevronLeft, faChevronRight, faClose, faPen, faRectangleList, faXmark } from '@fortawesome/free-solid-svg-icons';
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icons from '../Icons';
import ReactPaginate from 'react-paginate';

function BannerView() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [targeturl, setTargeturl] = useState("");
    const [titleerr, setTitleErr] = useState("");
    const [imageerr, setImageErr] = useState("");
    const [targeturlerr, setTargeturlErr] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios.get(`${backendUrl}/admin/getbannerdetail/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setTargeturl(response.data.targeturl);
                setImage(response.data.image);
                setImagePreview(`${backendUrl}/images/${response.data.image}`);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const previousPage = () => {
        navigate('/admin/bannerlist');
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
                                    <div><FontAwesomeIcon icon={faRectangleList} /> Banner View</div>
                                    <FontAwesomeIcon icon={faAnglesLeft} onClick={previousPage} />
                                </CardTitle>
                                <CardContent>
                                    <div>
                                        <h4><strong style={{ color: "#5ab769" }}>{title}</strong></h4>
                                    </div>
                                    <img src={`${backendUrl}/images/${image}`} /><br />
                                    <DialogContentText>
                                        <strong style={{ color: "#5ab769" }}>Target URL:</strong> {targeturl}
                                    </DialogContentText><br />
                                </CardContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default BannerView;
