import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "assets/css/admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Button, Card, CardSubtitle, CardTitle, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faClose } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select"
import img1 from "assets/img/default-avatar.png";
import pp from "assets/img/pp.jpeg";
import ac from "assets/img/ac.jpeg";

function EditStudent() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const { id } = useParams();
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [fullname, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState(new Date());
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
    const [error, setError] = useState("");
    const [stateerr, setStateErr] = useState("");
    const [statelist, setStateList] = useState([]);
    const [countrylist, setCountryList] = useState([]);
    const [courselist, setCourseList] = useState([]);
    const [batchlist, setBatchList] = useState([]);
    const [coursefee, setCourseFee] = useState("");
    const [noofinst, setNoOfInst] = useState("");
    const [billdate, setBillDate] = useState([]);
    const [hiii, setHiii] = useState([]);
    const navigate = useNavigate();
    const filePInputRef = useRef(null);
    const fileDInputRef = useRef(null);
    const fileInputRef = useRef(null);

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
        const count = parseInt(e.target.value) || 1;
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

    const handleClose = () => {
        navigate("/admin/studentlist");
    };

    useEffect(() => {
        if (country) {
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
        const token = localStorage.getItem("token");
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
        const token = localStorage.getItem("token");
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
        const token = localStorage.getItem("token");
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios.get(`${backendUrl}/admin/getstudentdetail/${id}`)
            .then((response) => {
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
                setPassImgPreview(response.data.student.passimg ? `${backendUrl}/images/${response.data.student.passimg}` : pp);
                setDocImg(response.data.student.docimg);
                setDocImgPreview(response.data.student.docimg ? `${backendUrl}/images/${response.data.student.docimg}` : ac);
                setHighQual(response.data.student.highqual);
                setInstituteName(response.data.student.institutename);
                setMark(response.data.student.mark);
                setCourse(response.data.student.course._id || "");
                setCourseFee(response.data.student.coursefee);
                setNoOfInst(response.data.student.noofinst);
                const datesString = response.data.student.billdate;
                const datesArray = datesString.split(',').map(date=>date);
                setBillDate(datesArray);
                setBatch(response.data.student.batch._id);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const maritaloption = [
        { value: 'Single', label: 'Single' },
        { value: 'Married', label: 'Married' }
    ]

    const findStateName = (selectedId) => {
        const selectedState = statelist.find(stateItem => stateItem._id === selectedId);
        return selectedState ? selectedState.name : '';
    };

    const findCountryName = (selectedId) => {
        const selectedCountry = countrylist.find(countryItem => countryItem._id === selectedId);
        return selectedCountry ? selectedCountry.name : '';
    };

    const idoption = [
        { value: 'Voter Id', label: 'Voter Id' },
        { value: 'Driving License Id', label: 'Drivin License Id' },
        { value: 'Passport Id', label: 'Passport Id' },
        { value: 'Aadhar Id', label: 'Aadhar Id' }
    ]

    const highqualoption = [
        { value: '+2', label: '+2' },
        { value: 'Diploma', label: 'Diploma' },
        { value: 'Degree', label: 'Degree' },
        { value: 'Post Graduate', label: 'Post Graduate' }
    ]

    const findCourseName = (selectedId) => {
        const selectedCourse = courselist.find(courseItem => courseItem._id === selectedId);
        return selectedCourse ? selectedCourse.name : '';
    };

    const handleCourseChange = (selectedOption) => {
        setCourse(selectedOption ? selectedOption.value : '');
        setCourseFee(findCourseFee(selectedOption ? selectedOption.value : ''));
    };

    const findCourseFee = (selectedId) => {
        const selectedCourse = courselist.find(courseItem => courseItem._id === selectedId);
        return selectedCourse ? selectedCourse.offerprice : '';
    };

    const findBatchName = (selectedId) => {
        const selectedBatch = batchlist.find(batchItem => batchItem._id === selectedId);
        return selectedBatch ? selectedBatch.batchname : '';
    };

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
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
                .put(`${backendUrl}/admin/updatestudent/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then((response) => {
                    toast.success("Student edited successfully!", {
                        position: "top-right",
                        duration: 3000,
                    });
                    window.location.href = "/admin/studentlist";
                })
                .catch((error) => {
                    toast.error("Error occured", {
                        position: "top-right",
                        duration: 3000,
                    });
                    if (error.response && error.response.status === 400) {
                        setError(error.response.data.message);
                    } else if (error.response && error.response.status === 402) {
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
                        <h4>EDIT STUDENT</h4>
                    </CardTitle>
                    <CardSubtitle display="block" variant="button" color="white" my={1}>
                        Edit Student Details
                    </CardSubtitle>
                </div>
                <div className="div2">
                    <div component="form" className="form" role="form">
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
                        <div className="d2form">
                            {imagePreview ? (
                                <>
                                    <img
                                        className="avatar border-gray"
                                        src={imagePreview}
                                        alt="Image Preview"
                                        style={{ width: "150px", height: "150px", margin: "9% 25% 0% 25%" }}
                                    />
                                    <button
                                        onClick={handleCameraClick}
                                        style={{
                                            backgroundColor: "#5ab769",
                                            borderRadius: "25px",
                                            width: "7%",
                                            margin: "40% -21% 0% -36%",
                                            padding: "1%"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCamera} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <img
                                        className="avatar border-gray"
                                        src={img1}
                                        alt="Placeholder"
                                        style={{ width: "150px", height: "150px", margin: "9% 25% 0% 25%" }}
                                    />
                                    <button
                                        onClick={handleCameraClick}
                                        style={{
                                            backgroundColor: "#5ab769",
                                            borderRadius: "25px",
                                            width: "7%",
                                            margin: "40% -21% 0% -36%",
                                            padding: "1%"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCamera} />
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">Full Name: </label>
                            <input
                                className="admininput"
                                type="text"
                                label="Full Name"
                                value={fullname}
                                onChange={(e) => setFullName(capitalizeName(e.target.value))}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {fullnameerr && <p style={{ color: "red", marginLeft: "25%" }}>{fullnameerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Mobile: </label>
                            <input
                                className="admininput"
                                type="tele"
                                label="Mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {mobileerr && <p style={{ color: "red", marginLeft: "25%" }}>{mobileerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Date of Birth: </label>
                            <DatePicker
                                className="admininput"
                                id="startDate"
                                selected={dob}
                                onChange={date => setDob(date)}
                                dateFormat="dd - MM - yyyy"
                                showYearDropdown
                                showMonthDropdown
                                dropdownMode="select"
                                fullWidth
                            />
                        </div>
                        {doberr && <p style={{ color: "red", marginLeft: "25%" }}>{doberr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Gender: </label>
                            <div style={{ display: "flex", justifyContent: "space-around", width: "50%" }}>
                                <label>
                                    <input
                                        type="radio"
                                        value="male"
                                        checked={gender === "male"}
                                        onChange={() => setGender("male")}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="female"
                                        checked={gender === "female"}
                                        onChange={() => setGender("female")}
                                    />
                                    Female
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="others"
                                        checked={gender === "others"}
                                        onChange={() => setGender("others")}
                                    />
                                    Others
                                </label>
                            </div>
                        </div>
                        {gendererr && <p style={{ color: "red", marginLeft: "25%" }}>{gendererr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Marital Status: </label>
                            <Select
                                options={maritaloption}
                                value={maritalstatus ? { value: maritalstatus, label: maritalstatus } : null}
                                onChange={(selectedOption) => {
                                    setMaritalStatus(selectedOption ? selectedOption.value : '');
                                }}
                                isSearchable
                                placeholder="Select a status"
                            />
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">Guardian Name: </label>
                            <input
                                className="admininput"
                                type="text"
                                label="Guardian Name"
                                value={guardianname}
                                onChange={(e) => setGuardianName(capitalizeName(e.target.value))}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {guardiannameerr && <p style={{ color: "red", marginLeft: "25%" }}>{guardiannameerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Guardian Mobile No: </label>
                            <input
                                className="admininput"
                                type="tele"
                                label="Guardian Mobile"
                                value={guardianmob}
                                onChange={(e) => setGuardianMob(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {guardianmoberr && <p style={{ color: "red", marginLeft: "25%" }}>{guardianmoberr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Spouse Name: </label>
                            <input
                                className="admininput"
                                type="text"
                                label="Spouse Name"
                                value={spousename}
                                onChange={(e) => setSpouseName(capitalizeName(e.target.value))}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">Spouse Mobile No: </label>
                            <input
                                className="admininput"
                                type="tele"
                                label="Spouse Mobile"
                                value={spousemob}
                                onChange={(e) => setSpouseMob(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">Address: </label>
                            <textarea
                                type="text"
                                className="admininput"
                                label="Address"
                                value={address}
                                onChange={(e) => setAddress(capitalizeFirstLetter(e.target.value))}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">PO: </label>
                            <input
                                className="admininput"
                                type="text"
                                label="Post Office"
                                value={postoffice}
                                onChange={(e) => setPostOffice(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">District: </label>
                            <input
                                className="admininput"
                                type="text"
                                label="District"
                                value={district}
                                onChange={(e) => setDistrict(capitalizeFirstLetter(e.target.value))}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">Country: </label>
                            <Select
                                options={countrylist.map(countryItem => ({ value: countryItem._id, label: countryItem.name }))}
                                value={country ? { value: country, label: findCountryName(country) } : null}
                                onChange={(selectedOption) => {
                                    setCountry(selectedOption ? selectedOption.value : '');
                                }}
                                isSearchable
                                placeholder="Select a country"
                            />
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">State: </label>
                            <Select
                                options={statelist.map(stateItem => ({ value: stateItem._id, label: stateItem.name }))}
                                value={state ? { value: state, label: findStateName(state) } : null}
                                onChange={(selectedOption) => {
                                    setState(selectedOption ? selectedOption.value : '');
                                }}
                                isSearchable
                                placeholder="Select a state"
                            />
                        </div>
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
                            <label className="adminlabel">Identification: </label>
                            <Select
                                options={idoption}
                                value={identity ? { value: identity, label: identity } : null}
                                onChange={(selectedOption) => {
                                    setIdentity(selectedOption ? selectedOption.value : '');
                                }}
                                isSearchable
                                placeholder="Select a identity"
                            />
                        </div>
                        <div className="d2form" mb={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                            <Row>
                                <Col className="col-6">
                                    <div className="identification-box">
                                        <input
                                            type="file"
                                            style={{ display: "none" }}
                                            ref={filePInputRef}
                                            onChange={handlePassImageChange}
                                        />
                                        <div className="identification-image-preview">
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
                                                    <img
                                                        src={pp}
                                                        alt="Aadhar Image"
                                                        style={{ width: "100%", height: "100%" }}
                                                        onClick={handlePCameraClick}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                                <Col className="col-6">
                                    <div className="identification-box">
                                        <input
                                            type="file"
                                            ref={fileDInputRef}
                                            style={{ display: "none" }}
                                            onChange={handleDocImageChange}
                                        />
                                        <div className="identification-image-preview">
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
                                                    <img
                                                        src={ac}
                                                        alt="Aadhar Image"
                                                        style={{ width: "100%", height: "100%" }}
                                                        onClick={handleDCameraClick}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">Highest Education Qualification: </label>
                            <Select
                                options={highqualoption}
                                value={highqual ? { value: highqual, label: highqual } : null}
                                onChange={(selectedOption) => {
                                    setHighQual(selectedOption ? selectedOption.value : '');
                                }}
                                isSearchable
                                placeholder="Select your Qualification"
                            />
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">Institution Name: </label>
                            <input
                                className="admininput"
                                type="text"
                                label="Institute Name"
                                value={institutename}
                                onChange={(e) => setInstituteName(capitalizeFirstLetter(e.target.value))}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">Mark: </label>
                            <input
                                className="admininput"
                                type="tele"
                                label="Mark"
                                value={mark}
                                onChange={(e) => setMark(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">Course: </label>
                            <Select
                                options={courselist.map(courseItem => ({ value: courseItem._id, label: courseItem.name }))}
                                value={course ? { value: course, label: findCourseName(course) } : null}
                                onChange={handleCourseChange}
                                isSearchable
                                placeholder="Select a course"
                            />
                        </div>
                        {courseerr && <p style={{ color: "red", marginLeft: "25%" }}>{courseerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Course fee: </label>
                            <input
                                className="admininput"
                                type="text"
                                value={coursefee}
                                onChange={(e) => setCourseFee(e.target.value)}
                            />
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">No. of Installment: </label>
                            <input
                                className="admininput"
                                type="text"
                                value={noofinst}
                                onChange={handleNoOfInstChange}
                            />
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">Bill Date: </label>
                            <input
                                className=""
                                type="text"
                                value={billdate.join(',')}
                                onChange={(e) => {
                                    const dates = e.target.value.split(',');
                                    setBillDate(dates);
                                }}
                            />
                        </div>
                        <div className="d2form dateform">
                            {billdate.map((date, index) => (
                                console.log(date, "hhhhhhhhhhhhhhhh"),
                                <DatePicker
                                    className="dateinput"
                                    key={index}
                                    value={date}
                                    // selected={date ? new Date(date) : null}
                                    onChange={(date) => handleBillDateChange(date, index)}
                                    placeholderText={`${index + 1} Installment Date`}
                                    dateFormat="dd/MM/yyyy"
                                />
                            ))}
                        </div>
                        <div className="d2form">
                            <label className="adminlabel">Batch: </label>
                            <Select
                                options={batchlist.map(batchItem => ({ value: batchItem._id, label: batchItem.batchname }))}
                                value={batch ? { value: batch, label: findBatchName(batch) } : null}
                                onChange={(selectedOption) => {
                                    setBatch(selectedOption ? selectedOption.value : '');
                                }}
                                isSearchable
                                placeholder="Select a batch"
                            />
                        </div>
                        {batcherr && <p style={{ color: "red", marginLeft: "25%" }}>{batcherr}</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <div className="buttonline">
                            <Button
                                onClick={handleSubmit}
                                variant="gradient"
                                className="buttontheme"
                                style={{ backgroundColor: "#5ab769", color: "black", borderRadius: "25px" }}
                                fullWidth
                            >
                                Edit Student
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

export default EditStudent;
