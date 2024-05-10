import React, { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "assets/css/profile.css"

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck, faUserPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function User() {
  const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
  const profile = JSON.parse(localStorage.getItem("adminProfile"));
  const [editMode, setEditMode] = useState(false);
  const [editMode1, setEditMode1] = useState(false);
  const [editMode2, setEditMode2] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("")
  const [nameerr, setNameErr] = useState("");
  const [usernameerr, setUsernameErr] = useState("");
  const [emailerr, setEmailErr] = useState("");
  const [addresserr, setAddressErr] = useState("");
  const [countryerr, setCountryErr] = useState("");
  const [stateerr, setStateErr] = useState("");
  const [phoneerr, setPhoneErr] = useState("");
  const [roleerr, setRoleErr] = useState("");
  const [imageerr, setImageErr] = useState("");
  const [imagePreview, setImagePreview] = useState(image);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing1, setIsEditing1] = useState(false);
  const [isEditing2, setIsEditing2] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordErr, setCurrentPasswordErr] = useState("");
  const [newPasswordErr, setNewPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [message, setMessage] = useState("");
  const [rolelist, setRoleList] = useState([]);
  const fileInputRef = useRef(null); // Reference to the file input element

  const handlePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      setCurrentPasswordErr("Current password is required");
      return;
    } else {
      setCurrentPasswordErr("");
    }

    if (!newPassword) {
      setNewPasswordErr("New password is required");
      return;
    } else {
      setNewPasswordErr("");
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordErr("Passwords do not match");
      return;
    } else {
      setConfirmPasswordErr("");
    }

    const formData = {
      curpass: currentPassword,
      newpass: newPassword,
      conpass: confirmPassword,
    };

    try {
      const response = await axios.post(
        `${backendUrl}/admin/changepassword/${profile.id}`,
        formData
      );

      if (response.data.success) {
        setMessage("Password changed successfully!");
      } else {
        setMessage("Failed to change password. Please try again.");
      }
      window.location.href = "/admin/user-page";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred while changing password.");
      }
      console.error(error);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancelChangePassword = () => {
    toggleEditMode1();
    fetchData();
  };

  const handleClose = () => {
    toggleEditMode();
    fetchData();
  };
  const handleClose2 = () => {
    toggleEditMode2();
    fetchData();
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =()=>{
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios.get(`${backendUrl}/admin/getadmindetail/${profile.id}`)
      .then((response) => {
        setName(response.data.name);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setAddress(response.data.address);
        setState(response.data.state);
        setCountry(response.data.country);
        setRole(response.data.role);
        setImage(response.data.image);
        setImagePreview(`${backendUrl}/images/${response.data.image}`);
        setDescription(response.data.description);
      })
      .catch((error) => {
        console.error(error);
      });
  }
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
    if (!username) {
      setUsernameErr("Username is required");
      formIsValid = false;
    } else {
      setUsernameErr("");
    }
    if (!address) {
      setAddressErr("Address is required");
      formIsValid = false;
    } else {
      setAddressErr("");
    }
    if (!state) {
      setStateErr("State is required");
      formIsValid = false;
    } else {
      setStateErr("");
    }
    if (!country) {
      setCountryErr("Country is required");
      formIsValid = false;
    } else {
      setCountryErr("");
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
      return;
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
      formData.append("username", username);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("phone", phone);
      formData.append("role", role);
      formData.append("image", image);
      formData.append("description", description);
      console.log(formData);
      axios
        .put(`${backendUrl}/admin/updateadminprofile/${profile.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem("adminProfile", JSON.stringify(response.data.adminProfile));
          toast.success("Admin edited successfully!", {
            position: "top-right",
            duration: 3000,
          });
          window.location.href = "/admin/user-page";
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
      .get(`${backendUrl}/admin/listrole`)
      .then((response) => {
        setRoleList(response.data.elements);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setIsEditing(!isEditing);
  };
  const toggleEditMode1 = () => {
    setEditMode1(!editMode1);
    setIsEditing1(!isEditing1);
  };
  const toggleEditMode2 = () => {
    setEditMode2(!editMode2);
    setIsEditing2(!isEditing2);
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Toaster />
        <Row>
          <Col md="8">
            <Card className="profilecard">
              <CardHeader className="profileimage1">
                <h5 className="title1">{editMode ? "Edit Profile" : "Profile"}</h5>
                {isEditing ? (
                  <div style={{ width: "51%", display: "flex" }}>
                    <Button
                      onClick={handleClose}
                      style={{
                        backgroundColor: "white",
                        color: "#e05757",
                        borderRadius: "25px",
                        marginLeft: "10px",
                        width: "40%",
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />  Close
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      style={{
                        backgroundColor: "white",
                        color: "#5ab769",
                        borderRadius: "25px",
                        marginLeft: "10px",
                        width: "40%",
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} />  Save
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={toggleEditMode}
                    style={{
                      backgroundColor: "white",
                      color: "#5ab769",
                      borderRadius: "25px",
                      marginLeft: "10px",
                      width: "20%",
                    }}
                  >
                    <FontAwesomeIcon icon={faUserPen} />  Edit
                  </Button>
                )}
              </CardHeader>
              <CardBody>
                <Form className="profileform">
                  <Row>
                    <Col className="col1" md="6">
                      <FormGroup className="formgroup">
                        <label className="profilelabel">Name: </label>
                        <input
                          type="text"
                          className="input1"
                          label="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                        {nameerr && <p style={{ color: "red", marginLeft: "25%" }}>{nameerr}</p>}
                      </FormGroup>
                    </Col>
                    <Col className="col1" md="5">
                      <FormGroup className="formgroup">
                        <label className="profilelabel">Username: </label>
                        <input
                          className="input1"
                          type="text"
                          label="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                        {usernameerr && <p style={{ color: "red", marginLeft: "25%" }}>{usernameerr}</p>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col1" md="6">
                      <FormGroup className="formgroup">
                        <label className="profilelabel">Email: </label>
                        <input
                          type="email"
                          className="input1"
                          label="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                        {emailerr && <p style={{ color: "red", marginLeft: "25%" }}>{emailerr}</p>}
                      </FormGroup>
                    </Col>
                    <Col className="col1" md="5">
                      <FormGroup className="formgroup">
                        <label className="profilelabel">Phone: </label>
                        <input
                          type="number"
                          className="input1"
                          label="Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                        {phoneerr && <p style={{ color: "red", marginLeft: "25%" }}>{phoneerr}</p>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col1" md="6">
                      <FormGroup className="formgroup">
                        <label className="profilelabel">State: </label>
                        <input
                          type="text"
                          className="input1"
                          label="State"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                        {stateerr && <p style={{ color: "red", marginLeft: "25%" }}>{stateerr}</p>}
                      </FormGroup>
                    </Col>
                    <Col className="col1" md="5">
                      <FormGroup className="formgroup">
                        <label className="profilelabel">Country: </label>
                        <input
                          type="text"
                          className="input1"
                          label="Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                        {countryerr && <p style={{ color: "red", marginLeft: "25%" }}>{countryerr}</p>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col1" md="11">
                      <FormGroup className="formgroup">
                        <label className="profilelabel">Address: </label>
                        <input
                          type="text"
                          className="input1"
                          label="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                        {addresserr && <p style={{ color: "red", marginLeft: "25%" }}>{addresserr}</p>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col1" md="11">
                      <FormGroup className="formgroup">
                        <label className="profilelabel">About Me</label>
                        <textarea
                          type="textarea"
                          className="input1"
                          cols="80"
                          rows="4"
                          label="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col className="col2" md="4">
            <Card className="card-user">
              <CardHeader className="profileimage">
                {/* <h5 className="title1">{editMode ? "Edit Profile" : "Profile"}</h5> */}
                {isEditing2 ? (
                  <div style={{ width: "51%", display: "flex" }}>
                    <Button
                      onClick={handleClose2}
                      style={{
                        backgroundColor: "white",
                        color: "#e05757",
                        borderRadius: "50px",
                        marginLeft: "130%",
                        width: "90%",
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      style={{
                        backgroundColor: "white",
                        color: "#5ab769",
                        borderRadius: "50px",
                        marginLeft: "5%",
                        width: "90%",
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={toggleEditMode2}
                    style={{
                      backgroundColor: "white",
                      color: "#5ab769",
                      borderRadius: "25px",
                      marginLeft: "70%",
                      width: "30%",
                    }}
                  >
                    Edit <FontAwesomeIcon icon={faCamera} />
                  </Button>
                )}
              </CardHeader>
              <CardBody>
                <div className="author">
                  <a>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={imagePreview ? imagePreview : `${backendUrl}/images/${image}`}
                    />
                    {isEditing2 && (
                      <div style={{ margin: "-12% 7% 1% 10%" }}>
                        <button
                          onClick={handleCameraClick}
                          style={{
                            backgroundColor: "#5ab769",
                            borderRadius: "25px",
                            // cursor: "pointer",
                            width: "10%",
                            margin: "0% -14% 6% 11%",
                            padding: "1%"
                          }}
                        >
                          <FontAwesomeIcon icon={faCamera} />
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          name="image"
                          label="Profile Image"
                          onChange={handleImageChange}
                        />
                      </div>
                    )}
                    <h5 className="profiletitle">{name}</h5>
                    <h6 className="profiletitle1">{rolelist.find(roleItem => roleItem._id === role)?.role}</h6>
                  </a>
                  <p className="description">{username}</p>
                </div>
                <p className="description text-justify lh-5">{description}</p>
              </CardBody>
            </Card>
            <hr />
            <Card className="profilecard1">
              <CardHeader className="profileimage2">
                <h5 className="title">
                  {editMode1 ? "Change your password here" : "Change Password"}
                </h5>
                {isEditing1 ? (
                  <div style={{ width: "97%" }}>
                    <Button
                      onClick={handleCancelChangePassword}
                      style={{
                        backgroundColor: "white",
                        color: "#e05757",
                        borderRadius: "25px",
                        margin: "0% 10% 0% 10%",
                        width: "28%",
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} /> Close
                    </Button>
                    <Button
                      onClick={handlePassword}
                      style={{
                        backgroundColor: "white",
                        color: "#5ab769",
                        borderRadius: "25px",
                        margin: "0% 10% 0% 10%",
                        width: "28%",
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} /> Save
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={toggleEditMode1}
                    style={{
                      backgroundColor: "white",
                      color: "#5ab769",
                      borderRadius: "25px",
                      margin: "0% 10% 0% 10%",
                      width: "27%",
                    }}
                  >
                    <FontAwesomeIcon icon={faUserPen} /> Edit
                  </Button>
                )}
              </CardHeader>
              <CardBody>
                <Form className="changepasswordform">
                  <FormGroup className="formgroup1">
                    <label className="profilelabel1">Current Password</label>
                    <input
                      className="input11"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {currentPasswordErr && <p style={{ color: "red" }}>{currentPasswordErr}</p>}
                  </FormGroup>
                  <FormGroup className="formgroup1">
                    <label className="profilelabel1">New Password</label>
                    <input
                      className="input11"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {newPasswordErr && <p style={{ color: "red" }}>{newPasswordErr}</p>}
                  </FormGroup>
                  <FormGroup className="formgroup1">
                    <label className="profilelabel1">Confirm Password</label>
                    <input
                      type="password"
                      className="input11"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordErr && <p style={{ color: "red" }}>{confirmPasswordErr}</p>}
                  </FormGroup>
                </Form>
                {message ? (
                  <p style={{ color: message === "Password changed successfully!" ? "#5ab769" : "red" }}>
                    {message}
                  </p>
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
