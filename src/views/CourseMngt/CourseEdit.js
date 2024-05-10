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

function EditCourse() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const { id } = useParams();
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [banner, setBanner] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [syllabus, setSyllabus] = useState("");
    const [price, setPrice] = useState("");
    const [offerprice, setOfferprice] = useState("");
    const [status, setStatus] = useState("");
    const [priceerr, setPriceErr] = useState("");
    const [offerpriceerr, setOfferpriceErr] = useState("");
    const [statuserr, setStatusErr] = useState("");
    const [resource, setResource] = useState([]);
    const [nameerr, setNameErr] = useState("");
    const [iconerr, setIconErr] = useState("");
    const [bannererr, setBannerErr] = useState("");
    const [descriptionerr, setDescriptionErr] = useState("");
    const [durationerr, setDurationErr] = useState("");
    const [syllabuserr, setSyllabusErr] = useState("");
    const [resourceerr, setResourceErr] = useState("");
    const [iconPreview, setIconPreview] = useState("");
    const [bannerPreview, setBannerPreview] = useState("");
    const [error, setError] = useState("");
    const [resourcelist, setResourceList] = useState([]);
    const navigate = useNavigate();

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

    const handleClose = () => {
        navigate("/admin/courselist");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios
            .get(`${backendUrl}/admin/listresource`)
            .then((response) => {
                console.log(response.data.elements)
                setResourceList(response.data.elements);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleIconChange = (e) => {
        const selectedIcon = e.target.files[0];
        setIcon(selectedIcon);
        setIconPreview(URL.createObjectURL(selectedIcon));
    };
    const handleBannerChange = (e) => {
        const selectedBanner = e.target.files[0];
        setBanner(selectedBanner);
        setBannerPreview(URL.createObjectURL(selectedBanner));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios.get(`${backendUrl}/admin/getcoursedetail/${id}`)
            .then((response) => {
                setName(response.data.name);
                setResource(response.data.resource);
                setDescription(response.data.description);
                setDuration(response.data.duration);
                setSyllabus(response.data.syllabus);
                setPrice(response.data.price);
                setOfferprice(response.data.offerprice);
                setStatus(response.data.status);
                setBanner(response.data.banner);
                setBannerPreview(`${backendUrl}/${response.data.banner}`);
                setIcon(response.data.icon);
                setIconPreview(`${backendUrl}/${response.data.icon}`);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        var formIsValid = true;
        if (!name) {
            setNameErr("Name is required");
            formIsValid = false;
        } else {
            setNameErr("");
        }
        if (!description) {
            setDescriptionErr("Description is required");
            formIsValid = false;
        } else {
            setDescriptionErr("");
        }
        if (!duration) {
            setDurationErr("Duration is required");
            formIsValid = false;
        } else {
            setDurationErr("");
        }
        if (!syllabus) {
            setSyllabus("Syllabus is required");
            formIsValid = false;
        } else {
            setSyllabus("");
        }
        if (!price) {
            setPriceErr("Price is required");
            formIsValid = false;
        } else {
            setPriceErr("");
        }
        if (!offerprice) {
            setOfferpriceErr("Offerprice is required");
            formIsValid = false;
        } else {
            setOfferpriceErr("");
        }
        if (!status) {
            setStatusErr("Status is required");
            formIsValid = false;
        } else {
            setStatusErr("");
        }
        if (!resource) {
            setResourceErr("Resource is required");
            formIsValid = false;
        } else {
            setResourceErr("");
        }
        if (!icon) {
            setIconErr("Icon is required");
            formIsValid = false;
        } else {
            setIconErr("");
        }
        if (!banner) {
            setBannerErr("Banner is required");
            formIsValid = false;
        } else {
            setBannerErr("");
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
                    window.location.href = "/admin/courselist";
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

    const quillModules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link'],
            [{ 'align': [] }],
        ],
    };

    const quillFormats = [
        'header', 'font', 'size',
        'list', 'bullet',
        'bold', 'italic', 'underline',
        'link',
        'align',
    ];

    return (
        <div className="bg-with-image">
            <Toaster />
            <Card className="Card">
                <div className="div1">
                    <CardTitle variant="h4" fontWeight="medium" color="white" mt={0}>
                        <h4>EDIT COURSE</h4>
                    </CardTitle>
                    <CardSubtitle display="block" variant="button" color="white" my={1}>
                        Edit Course Details
                    </CardSubtitle>
                </div>
                <div className="div2">
                    <div component="form" className="form" role="form">
                        <div className="d2form">
                            <label className="adminlabel">Icon: </label>
                            <input
                                type="file"
                                className="admininput"
                                label="Icon"
                                onChange={handleIconChange}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {iconerr && <p style={{ color: "red", marginLeft: "25%" }}>{iconerr}</p>}
                        {iconPreview && (
                            <div className="d2form">
                                <img
                                    src={iconPreview}
                                    alt="Icon Preview"
                                    style={{ width: "25%", height: "auto", marginLeft: "30%" }}
                                />
                            </div>
                        )}
                        <div className="d2form">
                            <label className="adminlabel">Name: </label>
                            <input
                                className="admininput"
                                type="text"
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {nameerr && <p style={{ color: "red", marginLeft: "25%" }}>{nameerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Description: </label>
                            {/* <textarea
                                type="text"
                                className="admininput"
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                variant="standard"
                                fullWidth
                            /> */}
                            <ReactQuill
                                value={description}
                                className="admininput"
                                onChange={(value) => setDescription(value)}
                                modules={quillModules}
                                formats={quillFormats}
                            />
                        </div>
                        {descriptionerr && <p style={{ color: "red", marginLeft: "25%" }}>{descriptionerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Duration: </label>
                            <input
                                type="text"
                                label="Duration"
                                className="admininput"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {durationerr && <p style={{ color: "red", marginLeft: "25%" }}>{durationerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Price: </label>
                            <input
                                type="number"
                                label="Price"
                                className="admininput"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {priceerr && <p style={{ color: "red", marginLeft: "25%" }}>{priceerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Offerprice: </label>
                            <input
                                type="number"
                                label="Offer Price"
                                className="admininput"
                                value={offerprice}
                                onChange={(e) => setOfferprice(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {offerpriceerr && <p style={{ color: "red", marginLeft: "25%" }}>{offerpriceerr}</p>}
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
                        {statuserr && <p style={{ color: "red", marginLeft: "25%" }}>{statuserr}</p>}
                        <Row className="d2form col-12">
                            <Col className="adminlabel col-5" >
                                <label style={{ color: "#5ab769" }}>Resource: </label>
                            </Col>
                            <Col className="col-7">
                                <select
                                    value={resource}
                                    onChange={handleResource}
                                    variant="standard"
                                    fullWidth
                                    className="admininput"
                                    style={{ width: "25%", width: "127%", padding: "5% 0% 5% 3%", margin: "0% 19% 0% -37%" }}
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
                                    {resource.map((selectedResource, index) => (
                                        <div key={index}>
                                            <span style={{ display: 'flex', justifyContent: 'space-between' }}>{resourcelist.find(resourceItem => resourceItem._id === selectedResource)?.name}
                                                <FontAwesomeIcon
                                                    icon={faClose}
                                                    onClick={() => deleteSelectedResource(index)}
                                                    style={{ cursor: "pointer", marginLeft: `5px !important` }}
                                                />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                        {resourceerr && <p style={{ color: "red", marginLeft: "25%" }}>{resourceerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Syllabus: </label>
                            {/* <textarea
                                type="text"
                                label="Syllabus"
                                className="admininput"
                                value={syllabus}
                                onChange={(e) => setSyllabus(e.target.value)}
                                variant="standard"
                                fullWidth
                            /> */}
                            <ReactQuill
                                value={syllabus}
                                className="admininput"
                                onChange={(value) => setSyllabus(value)}
                                modules={quillModules}
                                formats={quillFormats}
                            />
                        </div>
                        {syllabuserr && <p style={{ color: "red", marginLeft: "25%" }}>{syllabuserr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Banner: </label>
                            <input
                                type="file"
                                className="admininput"
                                label="Banner Image"
                                onChange={handleBannerChange}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {bannererr && <p style={{ color: "red", marginLeft: "25%" }}>{bannererr}</p>}
                        {bannerPreview && (
                            <div className="d2form">
                                <img
                                    src={bannerPreview}
                                    alt="Banner Preview"
                                    style={{ width: "25%", height: "auto", marginLeft: "30%" }}
                                />
                            </div>
                        )}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <div className="buttonline">
                            <Button
                                onClick={handleSubmit}
                                variant="gradient"
                                className="buttontheme"
                                style={{ backgroundColor: "#5ab769", color: "black", borderRadius: "25px" }}
                                fullWidth
                            >
                                Edit Course
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

export default EditCourse;
