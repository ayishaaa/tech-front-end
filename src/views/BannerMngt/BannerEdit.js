
import { useNavigate, useParams } from "react-router-dom";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "assets/css/admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Button, Card, CardSubtitle, CardTitle, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function EditBanner() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [targeturl, setTargeturl] = useState("");
    const [status, setStatus] = useState("");
    const [titleerr, setTitleErr] = useState("");
    const [imageerr, setImageErr] = useState("");
    const [targeturlerr, setTargeturlErr] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/admin/bannerlist");
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios.get(`${backendUrl}/admin/getbannerdetail/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setTargeturl(response.data.targeturl);
                setStatus(response.data.status);
                setImage(response.data.image);
                setImagePreview(`${backendUrl}/images/${response.data.image}`);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        var formIsValid = true;
        if (!title) {
            setTitleErr("Title is required");
            formIsValid = false;
        } else {
            setTitleErr("");
        }
        if (!targeturl) {
            setTargeturlErr("Target URL is required");
            formIsValid = false;
        } else {
            setTargeturlErr("");
        }
        if (!image) {
            setImageErr("Image is required");
            formIsValid = false;
        } else {
            setImageErr("");
        }

        if (formIsValid) {
            var formData = new FormData();
            formData.append("title", title);
            formData.append("image", image);
            formData.append("targeturl", targeturl);
            formData.append("status", status);
            console.log(formData);
            axios
                .put(`${backendUrl}/admin/updatebanner/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then((response) => {
                    console.log(response);
                    toast.success("Banner edited successfully!", {
                        position: "top-right",
                        duration: 3000,
                    });
                    window.location.href = "/admin/bannerlist";
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

    return (
        <div className="bg-with-image">
            <Toaster />
            <Card className="Card">
                <div className="div1">
                    <CardTitle variant="h4" fontWeight="medium" color="white" mt={0}>
                        <h4>EDIT BANNER</h4>
                    </CardTitle>
                    <CardSubtitle display="block" variant="button" color="white" my={1}>
                        Edit Banner Details
                    </CardSubtitle>
                </div>
                <div className="div2">
                    <div component="form" className="form" role="form">
                        <div className="d2form">
                            <label className="adminlabel">Image: </label>
                            <input
                                type="file"
                                className="admininput"
                                label="Image"
                                onChange={handleImageChange}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {imageerr && <p style={{ color: "red", marginLeft: "25%" }}>{imageerr}</p>}
                        {imagePreview && (
                            <div className="d2form">
                                <img
                                    src={imagePreview}
                                    alt="Icon Preview"
                                    style={{ width: "25%", height: "auto", marginLeft: "30%" }}
                                />
                            </div>
                        )}
                        <div className="d2form">
                            <label className="adminlabel">Title: </label>
                            <input
                                className="admininput"
                                type="text"
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {titleerr && <p style={{ color: "red", marginLeft: "25%" }}>{titleerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Target URL: </label>
                            <input
                                type="text"
                                label="Target URL"
                                className="admininput"
                                value={targeturl}
                                onChange={(e) => setTargeturl(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {targeturlerr && <p style={{ color: "red", marginLeft: "25%" }}>{targeturlerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Status: </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                variant="standard"
                                fullWidth
                                className="admininput"
                            >
                                <option value="" disabled>
                                    Select a status
                                </option>
                                <option value="Active">
                                    Active
                                </option>
                                <option value="Deactive">
                                    De-active
                                </option>
                            </select>
                        </div>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <div className="buttonline">
                            <Button
                                onClick={handleSubmit}
                                variant="gradient"
                                className="buttontheme"
                                style={{ backgroundColor: "#5ab769", color: "black", borderRadius: "25px" }}
                                fullWidth
                            >
                                Edit Banner
                            </Button>
                            <Button
                                onClick={handleClose}
                                className="buttontheme"
                                style={{ backgroundColor: "#53685694", color: "white", borderRadius: "25px" }}
                                fullWidth
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default EditBanner;
