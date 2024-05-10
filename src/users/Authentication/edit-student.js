import React, { useEffect, useRef, useState } from 'react';
import "../assets/css/style.css";
import { Toaster, toast } from 'react-hot-toast';
import img1 from "assets/img/default-avatar.png";
import loginimg from "../assets/images/image.jpg";
import logoimg from "../assets/images/logo.png";
import dashboardimg from "../assets/images/dashboard-icon.png";
import studentimg from "../assets/images/student.png";
import paymentimg from "../assets/images/payment-icon.png";
import profileimg from "../assets/images/profile-icon.png";
import moreimg from "../assets/images/more-menu-icon.png";
import logoutimg from "../assets/images/logout-icon.png";
import userimg from "../assets/images/user.jpg";
import usereditimg from "../assets/images/user-edit.jpg";
import coursecardimg from "../assets/images/course-card-image.png";
import coursecardpenimg from "../assets/images/course-card-pending.png";
import addstudentimg from "../assets/images/add-student-icon.png";
import notiimg from "../assets/images/noti-image.jpg";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Navigation/header';
import Footer from './Navigation/footer';

function AddUserStudent() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const [userprofile, setUserProfile] = useState([]);
    const [bannerdetails, setBannerDetails] = useState([]);
    const [coursecountactive, setCourseCountActive] = useState([]);
    const [studentcount, setStudentCount] = useState([]);
    const [batchcount, setBatchCount] = useState([]);
    const [paymentpendingcount, setPaymentPendingCount] = useState([]);
    const [paymentpendingdetails, setPaymentPendingDetails] = useState([]);
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [fullname, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [maritalstatus, setMaritalStatus] = useState("");
    const [guardianname, setGuardianName] = useState("");
    const [guardianmob, setGuardianMob] = useState("");
    const [spousename, setSpouseName] = useState("");
    const [spousemob, setSpouseMob] = useState("");
    const [address, setAddress] = useState("");
    const [postoffice, setPostOffice] = useState("");
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [identity, setIdentity] = useState("");
    const [passimg, setPassImg] = useState("");
    const [passimgPreview, setPassImgPreview] = useState("");
    const [docimg, setDocImg] = useState("");
    const [docimgPreview, setDocImgPreview] = useState("");
    const [highqual, setHighQual] = useState("");
    const [institutename, setInstituteName] = useState("");
    const [mark, setMark] = useState("");
    const [course, setCourse] = useState("");
    const [batch, setBatch] = useState("");
    const [fullnameerr, setFullNameErr] = useState("");
    const [mobileerr, setMobileErr] = useState("");
    const [doberr, setDobErr] = useState("");
    const [gendererr, setGenderErr] = useState("");
    const [guardiannameerr, setGuardianNameErr] = useState("");
    const [guardianmoberr, setGuardianMobErr] = useState("");
    const [emailerr, setEmailErr] = useState("");
    const [courseerr, setCourseErr] = useState("");
    const [batcherr, setBatchErr] = useState("");
    const [stateerr, setStateErr] = useState("");
    const [error, setError] = useState("");
    const [statelist, setStateList] = useState([]);
    const [countrylist, setCountryList] = useState([]);
    const [courselist, setCourseList] = useState([]);
    const [batchlist, setBatchList] = useState([]);
    const [coursefee, setCourseFee] = useState("");
    const [noofinst, setNoOfInst] = useState("");
    const [billdate, setBillDate] = useState([]);
    const navigate = useNavigate();
    const filePInputRef = useRef(null);
    const fileDInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const { id } = useParams();

    const capitalizeFirstLetter = (value) => {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1);
    };
    const capitalizeName = (value) => {
        if (!value) return '';
        return value
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleNoOfInstChange = (e) => {
        const count = parseInt(e.target.value) || 0;
        setNoOfInst(count);

        setBillDate(Array(count).fill(''));
    };

    const handleBillDateChange = (date, index) => {
        const updatedDates = [...billdate];
        updatedDates[index] = formatDate(date);
        setBillDate(updatedDates);
    };

    const formatDate = (date) => {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return "";
        }
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const fetchData = (id) => {
        const token = localStorage.getItem("usertoken");
        axios.defaults.headers.common["Authorization"] = token;
        axios.get(`${backendUrl}/users/getstudentdetail/${id}`, {
            params: {
                token: token,
                deviceId: "123"
            }
        })
            .then((response) => {
                console.log(response.data, "")
                setImage(response.data.student.image);
                setImagePreview(response.data.student.image ? `${backendUrl}/images/${response.data.student.image}` : img1);
                setFullName(response.data.student.fullname);
                setMobile(response.data.student.mobile);
                setDob(new Date(response.data.student.dob));
                setGender(response.data.student.gender);
                setMaritalStatus(response.data.student.maritalstatus);
                setGuardianName(response.data.student.guardianname);
                setGuardianMob(response.data.student.guardianmob);
                setSpouseName(response.data.student.spousename);
                setSpouseMob(response.data.student.spousemob);
                setAddress(response.data.student.address);
                setPostOffice(response.data.student.postoffice);
                setDistrict(response.data.student.district);
                setState(response.data.student.state._id || "");
                setCountry(response.data.student.country._id || "");
                setEmail(response.data.student.email);
                setIdentity(response.data.student.identity);
                setPassImg(response.data.student.passimg);
                setPassImgPreview(response.data.student.passimg ? `${backendUrl}/images/${response.data.student.passimg}` : "");
                setDocImg(response.data.student.docimg);
                setDocImgPreview(response.data.student.docimg ? `${backendUrl}/images/${response.data.student.docimg}` : "");
                setHighQual(response.data.student.highqual);
                setInstituteName(response.data.student.institutename);
                setMark(response.data.student.mark);
                setCourse(response.data.student.course._id || "");
                setCourseFee(response.data.student.coursefee);
                setNoOfInst(response.data.student.noofinst);
                const datesString = response.data.student.billdate;
                const datesArray = datesString.split(',').map(date=>date);
                setBillDate(datesArray);
                setBatch(response.data.student.batch._id || "");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchData(id)
    }, [id]);

    const handleClose = () => {
        navigate("/plain/student/student-listing");
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    const handleBatchChange = (event) => {
        setBatch(event.target.value);
    };

    const handleCourseChange = (event) => {
        setCourse(event.target.value);
        setCourseFee(findCourseFee(event ? event.target.value : ''));
    };

    const findCourseFee = (selectedId) => {
        const selectedCourse = courselist.find(courseItem => courseItem._id === selectedId);
        return selectedCourse ? selectedCourse.offerprice : '';
    };

    const handleMaritalStatusChange = (event) => {
        setMaritalStatus(event.target.value);
    };

    const handleIdentityChange = (event) => {
        setIdentity(event.target.value);
    };

    const handleHighQualChange = (event) => {
        setHighQual(event.target.value);
    };

    useEffect(() => {
        if (country) {
            const token = localStorage.getItem("usertoken");
        axios.defaults.headers.common["Authorization"] = token;
        
            axios.get(`${backendUrl}/admin/liststate/${country}`)
                .then((response) => {
                    setStateList(response.data.elements);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setStateErr("Enter the Country")
        }
    }, [country]);

    useEffect(() => {
        const token = localStorage.getItem("usertoken");
        axios.defaults.headers.common["Authorization"] = token;
        axios
            .get(`${backendUrl}/admin/listcountry`)
            .then((response) => {
                setCountryList(response.data.elements);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("usertoken");
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
        const token = localStorage.getItem("usertoken");
        axios.defaults.headers.common["Authorization"] = token;
        axios
            .get(`${backendUrl}/admin/listbatch`)
            .then((response) => {
                setBatchList(response.data.elements);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleCameraClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handlePCameraClick = () => {
        if (filePInputRef.current) {
            filePInputRef.current.click();
        }
    };

    const handleDCameraClick = () => {
        if (fileDInputRef.current) {
            fileDInputRef.current.click();
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handlePassImageChange = (e) => {
        const selectedPassImage = e.target.files[0];
        setPassImg(selectedPassImage);
        setPassImgPreview(URL.createObjectURL(selectedPassImage));
    };

    const handleDocImageChange = (e) => {
        const selectedDocImage = e.target.files[0];
        setDocImg(selectedDocImage);
        setDocImgPreview(URL.createObjectURL(selectedDocImage));
    };

    const maritaloption = [
        { value: 'Single', label: 'Single' },
        { value: 'Married', label: 'Married' }
    ]

    const idoption = [
        { value: 'Voter Id', label: 'Voter Id' },
        { value: 'Driving License Id', label: 'Drivin License Id' },
        { value: 'Passport Id', label: 'Passport Id' },
        { value: 'Aadhar Id', label: 'Aadhar Id' }
    ]

    const genderoption = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'others', label: 'Others' }
    ]

    const highqualoption = [
        { value: '+2', label: '+2' },
        { value: 'Diploma', label: 'Diploma' },
        { value: 'Degree', label: 'Degree' },
        { value: 'Post Graduate', label: 'Post Graduate' }
    ]

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };

    useEffect(() => {
        const token = localStorage.getItem('usertoken');
        axios.defaults.headers.common["Authorization"] = token;

        axios
            .get(`${backendUrl}/users/homescreen`, {
                params: {
                    token: token,
                    deviceId: "123"
                }
            })
            .then((response) => {
                setUserProfile(response.data.userProfile);
                setBannerDetails(response.data.bannerDetails);
                setCourseCountActive(response.data.courseCountActive);
                setStudentCount(response.data.studentCount);
                setBatchCount(response.data.batchCount);
                setPaymentPendingCount(response.data.paymentPendingCount);
                setPaymentPendingDetails(response.data.paymentPendingDetails);
            })
            .catch((error) => {
                console.error(error);
            });
        fetchData(id)
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("usertoken");
        axios.defaults.headers.common["Authorization"] = token;
        var formIsValid = true;
        if (!fullname) {
            setFullNameErr("Full name is required");
            formIsValid = false;
        } else {
            setFullNameErr("");
        }
        if (!validatePhone(mobile)) {
            setMobileErr("Invalid mobile number (10 digits required)");
            formIsValid = false;
        } else {
            setMobileErr("");
        }
        if (!dob) {
            setDobErr("DOB is required");
            formIsValid = false;
        } else {
            setDobErr("");
        }
        if (!gender) {
            setGenderErr("Gender is required");
            formIsValid = false;
        } else {
            setGenderErr("");
        }
        if (!guardianname) {
            setGuardianNameErr("Guardian Name is required");
            formIsValid = false;
        } else {
            setGuardianNameErr("");
        }
        if (!validatePhone(guardianmob)) {
            setGuardianMobErr("Invalid mobile number (10 digits required)");
            formIsValid = false;
        } else {
            setGuardianMobErr("");
        }
        if (!validateEmail(email)) {
            setEmailErr("Invalid email format (e.g., example@example.com)");
        } else {
            setEmailErr("");
        }
        if (!course) {
            setCourseErr("Course is required");
            formIsValid = false;
        } else {
            setCourseErr("");
        }
        if (!batch) {
            setBatchErr("Batch is required");
            formIsValid = false;
        } else {
            setBatchErr("");
        }

        if (formIsValid) {
            var formData = new FormData();
            formData.append("image", image);
            formData.append("fullname", fullname);
            formData.append("mobile", mobile);
            formData.append("dob", dob);
            formData.append("gender", gender);
            formData.append("maritalstatus", maritalstatus);
            formData.append("guardianname", guardianname);
            formData.append("guardianmob", guardianmob);
            formData.append("spousename", spousename);
            formData.append("spousemob", spousemob);
            formData.append("address", address);
            formData.append("postoffice", postoffice);
            formData.append("district", district);
            formData.append("state", state);
            formData.append("country", country);
            formData.append("email", email);
            formData.append("identity", identity);
            formData.append("passimg", passimg);
            formData.append("docimg", docimg);
            formData.append("highqual", highqual);
            formData.append("institutename", institutename);
            formData.append("mark", mark);
            formData.append("course", course);
            formData.append("coursefee", coursefee);
            formData.append("noofinst", noofinst);
            formData.append("billdate", billdate);
            formData.append("batch", batch);
            axios
                .put(`${backendUrl}/users/updatestudent/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    toast.success("Student added successfully!", {
                        position: "top-right",
                        duration: 4000,
                    });
                    window.location.href = "/plain/student/student-listing";
                })
                .catch((error) => {
                    toast.error("Error occured", {
                        position: "top-right",
                        duration: 4000,
                    });
                    if (error.response && error.response.status === 400) {
                        setError(error.response.data.message);
                    }
                });
        }
    };

    const goToDashboardHome = () => {
        window.location.href = '/plain/student/dashboard-home';
    };

    const goToStudentListing = () => {
        window.location.href = '/plain/student/student-listing';
    };

    const goToPaymentListing = () => {
        window.location.href = '/plain/student/payment-details';
    };

    const goToStudentProfile = () => {
        window.location.href = '/plain/student/student-profile';
    };

    const goToLogOut = () => {
        toast((t) => (
            <span>
                <p>Are you sure you want to logout?</p>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <button style={{ padding: "4%", backgroundColor: "#4DBA61", color: "white" }} onClick={handleLogout}>Yes</button>
                    <button style={{ padding: "4%", backgroundColor: "#F62121", color: "white" }} onClick={() => toast.dismiss(t.id)}>
                        Dismiss
                    </button>
                </div>
            </span>
        ));
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem("usertoken");
            localStorage.removeItem("userProfile");

            navigate("/plain/student/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div>
            <Toaster />
            <title>Dashboard-home</title>
            <section className="dashboard-home">
                <div className="row">
                    <div className="col-md-2 col-sm-12 dashboard-left-menu">
                    <Header />
                    </div>
                    <div className="col-md-10 col-sm-12 ">
                        <div className="dashboard-right-items row">
                            <div className="col-md-6">
                                <div className="right-content">
                                    <h3>Hello {userprofile.name} !</h3>
                                    <p>{userprofile.role && userprofile.role?.role}.</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="user-info" onClick={goToStudentProfile}>
                                    <div className="user-image-div">
                                        <img alt="..."
                                            src={`${backendUrl}/${userprofile.image}`}
                                        />
                                    </div>
                                    <div className="user-text">
                                        <h6>{userprofile.name}</h6>
                                        <p>{userprofile.role && userprofile.role?.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-body">
                            <div className="row add-student-form-outer">
                                <div className="col-md-6 col-sm-12 edit-user">
                                    <a>
                                        <div style={{ margin: "-12% 7% 1% 10%" }}>
                                            <input
                                                type="file"
                                                style={{ display: "none" }}
                                                name="image"
                                                label="Profile Image"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </a>
                                    <div className="edit-profile-image-div">
                                        {imagePreview ? (
                                            <>
                                                <img
                                                    className="avatar border-gray"
                                                    onClick={handleCameraClick}
                                                    src={imagePreview}
                                                    alt="Image Preview"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <img
                                                    className="avatar border-gray"
                                                    src={usereditimg}
                                                    alt=''
                                                    onClick={handleCameraClick}
                                                />
                                            </>
                                        )}
                                        {/* <img src={usereditimg} alt /> */}
                                    </div>
                                    <div className="edit-profile-text-div">
                                        <h5>{fullname}</h5>
                                        <p>{email}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 button-edit-outer ">
                                    {/* <button className="edit-user-btn">Edit</button> */}
                                    <button className="cancel-user-btn" onClick={handleClose}>Cancel</button>
                                    <button className="edit-user-btn" onClick={handleSubmit}>Edit</button>
                                </div>
                                <div className="col-md-4 col-sm-12 student-form mt-5 first-form-res">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Full Name"
                                        value={fullname}
                                        onChange={(e) => setFullName(capitalizeName(e.target.value))}
                                        variant="standard"
                                    />
                                    {fullnameerr && <p style={{ color: "red", marginLeft: "2%", margin: "-3%" }}>{fullnameerr}</p>}
                                </div>
                                <div className="col-md-4 col-sm-12 student-form mt-5">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Mobile No"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        variant="standard"
                                    />
                                    {mobileerr && <p style={{ color: "red", marginLeft: "2%", margin: "-3%" }}>{mobileerr}</p>}
                                </div>
                                <div className="col-md-4 col-sm-12 student-form datepicker mt-5">
                                    <DatePicker
                                        className="form-control form-control-lg"
                                        selected={dob}
                                        onChange={(date) => setDob(date)}
                                        placeholderText="Date of Birth"
                                        dateFormat="dd/MM/yyyy"
                                        showYearDropdown
                                        showMonthDropdown
                                        dropdownMode="select"
                                    />
                                    {doberr && <p style={{ color: "red", marginLeft: "2%", margin: "-3%" }}>{doberr}</p>}
                                </div>
                                <div className="col-md-4 col-sm-12 student-form ">
                                    <select
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Gender"
                                        value={gender}
                                        onChange={handleGenderChange}
                                    >
                                        <option value="">Gender</option>
                                        {genderoption.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                    {gendererr && <p style={{ color: "red", marginLeft: "2%", margin: "-3%" }}>{gendererr}</p>}
                                </div>
                                <div className="col-md-4 col-sm-12 student-form ">
                                    <select
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Marital Status"
                                        value={maritalstatus}
                                        onChange={handleMaritalStatusChange}
                                    >
                                        <option value="">Marital Status</option>
                                        {maritaloption.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-12 student-form ">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Guardian Name"
                                        value={guardianname}
                                        onChange={(e) => setGuardianName(capitalizeName(e.target.value))}
                                        variant="standard"
                                    />
                                    {guardiannameerr && <p style={{ color: "red", marginLeft: "2%", margin: "-3%" }}>{guardiannameerr}</p>}
                                </div>
                                <div className="col-md-4 col-sm-12 student-form ">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Guardian Mobile No"
                                        value={guardianmob}
                                        onChange={(e) => setGuardianMob(e.target.value)}
                                        variant="standard"
                                    />
                                    {guardianmoberr && <p style={{ color: "red", marginLeft: "2%", margin: "-3%" }}>{guardianmoberr}</p>}
                                </div>
                                <div className="col-md-4 col-sm-12 student-form ">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Spouse Name"
                                        value={spousename}
                                        onChange={(e) => setSpouseName(capitalizeName(e.target.value))}
                                        variant="standard"
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 student-form ">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Spouse Mobile No"
                                        value={spousemob}
                                        onChange={(e) => setSpouseMob(e.target.value)}
                                        variant="standard"
                                    />
                                </div>
                                <div className="col-12 student-form ">
                                    <textarea
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(capitalizeFirstLetter(e.target.value))}
                                        variant="standard"
                                        rows={4}
                                        cols={50}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 student-form ">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="P.O"
                                        value={postoffice}
                                        onChange={(e) => setPostOffice(capitalizeFirstLetter(e.target.value))}
                                        variant="standard"
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 student-form ">
                                    <select
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Country"
                                        value={country}
                                        onChange={handleCountryChange}
                                    >
                                        <option value="">Country</option>
                                        {countrylist.map(countryItem => (
                                            <option key={countryItem._id} value={countryItem._id}>{countryItem.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-12 student-form ">
                                    <select
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="State"
                                        value={state}
                                        onChange={handleStateChange}
                                    >
                                        <option>State</option>
                                        {statelist.map(stateItem => (
                                            <option key={stateItem._id} value={stateItem._id}>{stateItem.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-12 student-form ">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="District"
                                        value={district}
                                        onChange={(e) => setDistrict(capitalizeFirstLetter(e.target.value))}
                                        variant="standard"
                                    />
                                </div>
                                <div className="col-md-6 col-sm-12 student-form ">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Email Id"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        variant="standard"
                                    />
                                    {emailerr && <p style={{ color: "red", marginLeft: "2%", margin: "-3%" }}>{emailerr}</p>}
                                </div>
                                <div className="col-md-6 col-sm-12 student-form ">
                                    <select
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Identification"
                                        value={identity}
                                        onChange={handleIdentityChange}
                                    >
                                        <option value="">Identification</option>
                                        {idoption.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 col-sm-12 mb-3 ">
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                        ref={filePInputRef}
                                        onChange={handlePassImageChange}
                                    />
                                    <div className="add-image-box">
                                        {passimgPreview ? (
                                            <>
                                                <img
                                                    src={passimgPreview}
                                                    alt="Passport Image"
                                                    style={{ width: "100%", height: "100%" }}
                                                    onClick={handlePCameraClick}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <h5>Drop your Passport Size Photo</h5>
                                                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae ratione facere similique praesentium laborum amet!</p>
                                                <button className="edit-user-btn" onClick={handlePCameraClick}>Browse Image</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 mb-3 ">
                                    <input
                                        type="file"
                                        ref={fileDInputRef}
                                        style={{ display: "none" }}
                                        onChange={handleDocImageChange}
                                    />
                                    <div className="add-image-box">
                                        {docimgPreview ? (
                                            <>
                                                <img
                                                    src={docimgPreview}
                                                    alt="Aadhar Image"
                                                    style={{ width: "100%", height: "100%" }}
                                                    onClick={handleDCameraClick}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <h5>Drop your Adhaar Card Image</h5>
                                                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae ratione facere similique praesentium laborum amet!</p>
                                                <button className="edit-user-btn" onClick={handleDCameraClick}>Browse Image</button>

                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 student-form ">
                                    <select
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Highest Education Qualification"
                                        value={highqual}
                                        onChange={handleHighQualChange}
                                    >
                                        <option value="">Highest Education Qualification</option>
                                        {highqualoption.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-12 student-form ">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Institution Name"
                                        value={institutename}
                                        onChange={(e) => setInstituteName(capitalizeFirstLetter(e.target.value))}
                                        variant="standard"
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 student-form ">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Mark"
                                        value={mark}
                                        onChange={(e) => setMark(e.target.value)}
                                        variant="standard"
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 student-form ">
                                    <select
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Course"
                                        value={course}
                                        onChange={handleCourseChange}
                                    >
                                        <option value="">Course</option>
                                        {courselist.map(courseItem => (
                                            <option key={courseItem._id} value={courseItem._id}>{courseItem.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-12 student-form ">
                                    <select
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Batch"
                                        value={batch}
                                        onChange={handleBatchChange}
                                    >
                                        <option value="">Batch</option>
                                        {batchlist.map(batchItem => (
                                            <option key={batchItem._id} value={batchItem._id}>{batchItem.batchname}</option>
                                        ))}
                                    </select>
                                    {batcherr && <p style={{ color: "red", marginLeft: "2%", margin: "-3%" }}>{batcherr}</p>}
                                </div>
                                <div className="col-md-3 col-sm-12 student-form ">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Course Fee"
                                        value={coursefee}
                                        onChange={(e) => setCourseFee(e.target.value)}
                                        variant="standard"
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 student-form">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="No. of Installment"
                                        value={noofinst}
                                        onChange={handleNoOfInstChange}
                                    />
                                </div>
                                <div className="col-md-6 col-sm-12 student-form">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Bill Dates (Separated by comma)"
                                        readOnly
                                        value={billdate.join(',')}
                                        onChange={(e) => {
                                            const dates = e.target.value.split(',');
                                            setBillDate(dates);
                                        }}
                                    />
                                </div>
                                <div className="col-md-12 col-sm-12 student-form d-flex">
                                    {billdate.map((date, index) => (
                                        <DatePicker
                                            key={index}
                                            value={date}
                                            // selected={date ? new Date(date) : null}
                                            onChange={(date) => handleBillDateChange(date, index)}
                                            placeholderText={`${index + 1} Installment Date`}
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control form-control-lg mt-2 datep"
                                        />
                                    ))}
                                </div>
                                {error && <p style={{ color: "red", margin: "-3%" }}>{error}</p>}
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddUserStudent;
