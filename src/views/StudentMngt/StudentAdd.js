import { useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import "assets/css/admin.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardSubtitle, CardTitle, Col, Row } from "reactstrap";
import { Toaster, toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select"
import img1 from "assets/img/default-avatar.png";
import pp from "assets/img/pp.jpeg";
import ac from "assets/img/ac.jpeg";

function AddStudent() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
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
    const [feestatus, setFeeStatus] = useState("");
    const [paymentstatus, setPaymentStatus] = useState("");
    const [paymentmethod, setPaymentMethod] = useState("");
    const [dates, setDates] = useState("");
    const [amount, setAmount] = useState("");
    const [comment, setComment] = useState("");
    const [dateerr, setDateErr] = useState("");
    const [amounterr, setAmountErr] = useState("");
    const [fullnameerr, setFullNameErr] = useState("");
    const [mobileerr, setMobileErr] = useState("");
    const [doberr, setDobErr] = useState("");
    const [gendererr, setGenderErr] = useState("");
    const [guardiannameerr, setGuardianNameErr] = useState("");
    const [guardianmoberr, setGuardianMobErr] = useState("");
    const [emailerr, setEmailErr] = useState("");
    const [courseerr, setCourseErr] = useState("");
    const [batcherr, setBatchErr] = useState("");
    const [feestatuserr, setFeeStatusErr] = useState("");
    const [error, setError] = useState("");
    const [statelist, setStateList] = useState([]);
    const [countrylist, setCountryList] = useState([]);
    const [stateerr, setStateErr] = useState([]);
    const [countryerr, setCountryErr] = useState([]);
    const [courselist, setCourseList] = useState([]);
    const [batchlist, setBatchList] = useState([]);
    const [coursefee, setCourseFee] = useState("");
    const [noofinst, setNoOfInst] = useState("");
    const [billdate, setBillDate] = useState([]);
    const navigate = useNavigate();
    const filePInputRef = useRef(null);
    const fileDInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const dateString = billdate.join(', ');
    const handleNoOfInstChange = (e) => {
        const count = parseInt(e.target.value) || 1;
        setNoOfInst(count);

        setBillDate(Array(count).fill(''));
    };

    const amountChange = (e) => {
        const newAmount = e.target.value;
        setAmount(newAmount);
        
        if (parseFloat(coursefee) === parseFloat(newAmount)) {
            setPaymentStatus('Completed');
        } else {
            setPaymentStatus('Pending');
        }
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

    const handleClose = () => {
        navigate("/admin/studentlist");
    };

    useEffect(() => {
        if (country) {
            axios.get(`${backendUrl}/admin/liststate/${country}`)
                .then((response) => {
                    console.log(response.data.elements);
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
        findCourseFee(selectedId)
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

    const feestatusoption = [
        { value: 'Paid', label: 'Paid' },
        { value: 'Unpaid', label: 'Unpaid' },
        // { value: 'Pending', label: 'Pending' }
    ]

    const paymentmethodoption = [
        { value: 'Cash', label: 'Cash' },
        { value: 'UPI Id', label: 'UPI Id' },
        { value: 'Bank Transfer', label: 'Bank Transfer' },
        { value: 'Nil', label: 'Nil' }
    ]

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
        if (!country) {
            setCountryErr("Country and State is required");
            formIsValid = false;
        } else {
            setCountryErr("");
        }
        if (!state) {
            setStateErr("State is required");
            formIsValid = false;
        } else {
            setStateErr("");
        }
        if (!feestatus) {
            setFeeStatusErr("Fee status is required");
            formIsValid = false;
        } else {
            setFeeStatusErr("");
        }

        if (feestatus === "Paid") {
            if (!dates) {
                setDateErr("Date is required");
                formIsValid = false;
            } else {
                setDateErr("");
            }
            if (!amount) {
                setAmountErr("Amount is required");
                formIsValid = false;
            } else {
                setAmountErr("");
            }
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
            formData.append("billdate", dateString);
            formData.append("batch", batch);
            formData.append("feestatus", feestatus);
            formData.append("paymentstatus", paymentstatus);
            formData.append("amount", amount);
            formData.append("dates", dates);
            formData.append("comment", comment);
            formData.append("paymentmethod", paymentmethod);
            console.log(formData);
            axios
                .post(`${backendUrl}/admin/addstudent`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response);
                    toast.success("Student added successfully!", {
                        position: "top-right",
                        duration: 4000,
                    });
                    window.location.href = "/admin/studentlist";
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

    return (
        <div className="bg-with-image">
            <Toaster />
            <Card className="Card">
                <div className="div1">
                    <CardTitle variant="h4" fontWeight="medium" color="white" mt={0}>
                        <h4>ADD STUDENT</h4>
                    </CardTitle>
                    <CardSubtitle display="block" variant="button" color="white" my={1}>
                        Enter Student Details
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
                                onChange={(e) => setPostOffice(capitalizeFirstLetter(e.target.value))}
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
                        {countryerr && <p style={{ color: "red" }}>{countryerr}</p>}

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
                        {/* {stateerr && <p style={{ color: "red", marginLeft: "25%" }}>{stateerr}</p>} */}
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
                                className="admininput"
                                type="text"
                                readOnly
                                value={billdate.join(',')}
                                onChange={(e) => {
                                    const dates = e.target.value.split(',');
                                    setBillDate(dates);
                                }}
                            />
                        </div>
                        <div className="d2form dateform">
                            {billdate.map((date, index) => (
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
                        <div className="d2form">
                            <label className="adminlabel">Fee Status: </label>
                            <Select
                                options={feestatusoption}
                                value={feestatus ? { value: feestatus, label: feestatus } : null}
                                onChange={(selectedOption) => {
                                    setFeeStatus(selectedOption ? selectedOption.value : '');
                                }}
                                isSearchable
                                placeholder="Select Fee Status"
                            />
                        </div>
                        {feestatuserr && <p style={{ color: "red", marginLeft: "25%" }}>{feestatuserr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Payment Method: </label>
                            <Select
                                options={paymentmethodoption}
                                value={paymentmethod ? { value: paymentmethod, label: paymentmethod } : null}
                                onChange={(selectedOption) => {
                                    setPaymentMethod(selectedOption ? selectedOption.value : '');
                                }}
                                isSearchable
                                placeholder="Select a Payment Mode"
                            />
                        </div>
                        {feestatus === "Paid" ? (
                            <>
                                <div className="d2form">
                                    <label className="adminlabel">Amount: </label>
                                    <input
                                        className="admininput"
                                        type="text"
                                        value={amount}
                                        onChange={amountChange}
                                        // onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                                {amounterr && <p style={{ color: "red" }}>{amounterr}</p>}
                                <div className="d2form">
                                    <label className="adminlabel">Date: </label>
                                    <DatePicker
                                        selected={dates}
                                        id="Date"
                                        onChange={(date) => setDates(date)}
                                        dateFormat="dd - MM - yyyy"
                                        showYearDropdown
                                        showMonthDropdown
                                        dropdownMode="select"
                                    />
                                </div>
                                {dateerr && <p style={{ color: "red" }}>{dateerr}</p>}
                                <div className="d2form">
                                    <label className="adminlabel">Comment: </label>
                                    <input
                                        className="admininput"
                                        type="text"
                                        value={comment}
                                        onChange={(e) => setComment(capitalizeFirstLetter(e.target.value))}
                                    />
                                </div>
                            </>
                        ) : (
                            <></>
                        )}

                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <div className="buttonline">
                            <Button
                                onClick={handleSubmit}
                                className="buttontheme"
                                variant="gradient"
                                style={{ backgroundColor: "#5ab769", color: "black", borderRadius: "25px" }}
                                fullWidth
                            >
                                Add Student
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

export default AddStudent;
