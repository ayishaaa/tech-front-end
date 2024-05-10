/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
// import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";

// Authentication layout components
// import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import "assets/css/admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Button, Card, CardSubtitle, CardTitle } from "reactstrap";

function EditResource() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [qualification, setQualification] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState("");
    const [nameerr, setNameErr] = useState("");
    const [emailerr, setEmailErr] = useState("");
    const [addresserr, setAddressErr] = useState("");
    const [qualificationerr, setQualificationErr] = useState("");
    const [phoneerr, setPhoneErr] = useState("");
    const [roleerr, setRoleErr] = useState("");
    const [imageerr, setImageErr] = useState("");
    const [imagePreview, setImagePreview] = useState(image);
    const [error, setError] = useState("");
    const [rolelist, setRoleList] = useState([]);
    const navigate = useNavigate();

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

    const handleClose = () => {
        navigate("/admin/resourcelist");
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios.get(`${backendUrl}/admin/getresourcedetail/${id}`)
            .then((response) => {
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setAddress(response.data.address);
                setQualification(response.data.qualification);
                setRole(response.data.role);
                setImage(response.data.image);
                setImagePreview(`${backendUrl}/images/${response.data.image}`);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var formIsValid = true;
        if (!name) {
            setNameErr("Name is required");
            formIsValid = false;
        } else {
            setNameErr("");
        }
        if (!address) {
            setAddressErr("Address is required");
            formIsValid = false;
        } else {
            setAddressErr("");
        }
        if (!qualification) {
            setQualificationErr("Qualification is required");
            formIsValid = false;
        } else {
            setQualificationErr("");
        }
        if (!role) {
            setRoleErr("Role is required");
            formIsValid = false;
        } else {
            setRoleErr("");
        }
        if (!image) {
            setImageErr("Image is required");
            formIsValid = false;
        } else {
            setImageErr("");
        }

        if (!validateEmail(email)) {
            setEmailErr("Invalid email format (e.g., example@example.com)");
            // return;
        }

        if (!validatePhone(phone)) {
            setPhoneErr("Invalid phone number (10 digits required)");
            formIsValid = false;
        } else {
            setPhoneErr("");
        }
        if (formIsValid) {

            var formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("address", address);
            formData.append("qualification", qualification);
            formData.append("phone", phone);
            formData.append("role", role);
            formData.append("image", image);
            console.log(formData);
            axios
                .put(`${backendUrl}/admin/updateresource/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then((response) => {
                    console.log(response);
                    toast.success("Resource edited successfully!", {
                        position: "top-right",
                        duration: 3000,
                    });
                    window.location.href = "/admin/resourcelist";
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
                        <h4>EDIT RESOURCE TEAM</h4>
                    </CardTitle>
                    <CardSubtitle display="block" variant="button" color="white" my={1}>
                        Edit Team Details
                    </CardSubtitle>
                </div>
                <div className="div2">
                    <div component="form" className="form" role="form">
                        <div className="d2form">
                            <label className="adminlabel">Name: </label>
                            <input
                                type="text"
                                label="Name"
                                className="admininput"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {nameerr && <p style={{ color: "red", marginLeft: "25%" }}>{nameerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Email: </label>
                            <input
                                type="email"
                                className="admininput"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {emailerr && <p style={{ color: "red", marginLeft: "25%" }}>{emailerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Phone: </label>
                            <input
                                type="tel"
                                className="admininput"
                                label="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {phoneerr && <p style={{ color: "red", marginLeft: "25%" }}>{phoneerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Role: </label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                variant="standard"
                                className="admininput"
                                fullWidth
                            >
                                <option value="" disabled>
                                    Select a role
                                </option>
                                {rolelist.map((roleItem) => (
                                    <option key={roleItem._id} value={roleItem._id}>
                                        {roleItem.role}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {roleerr && <p style={{ color: "red", marginLeft: "25%" }}>{roleerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Address: </label>
                            <input
                                type="text"
                                className="admininput"
                                label="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {addresserr && <p style={{ color: "red", marginLeft: "25%" }}>{addresserr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Qualification: </label>
                            <input
                                type="text"
                                className="admininput"
                                label="Qualification"
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {qualificationerr && <p style={{ color: "red", marginLeft: "25%" }}>{qualificationerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Image: </label>
                            <input
                                type="file"
                                className="admininput"
                                name="image"
                                label="Profile Image"
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
                                    alt="Profile Preview"
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
                                Edit Resource Team
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

export default EditResource;
