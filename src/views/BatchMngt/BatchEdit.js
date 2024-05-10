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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "assets/css/admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, CardSubtitle, CardTitle, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function EditBatch() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const { id } = useParams();
    const [batchname, setBatchName] = useState("");
    const [batchnameerr, setBatchNameErr] = useState("");
    const [startdate, setStartDate] = useState("");
    const [startdateerr, setStartDateErr] = useState("");
    const [enddate, setEndDate] = useState("");
    const [enddateerr, setEndDateErr] = useState("");
    const [timing, setTiming] = useState("");
    const [timingerr, setTimingErr] = useState("");
    const [course, setCourse] = useState("");
    const [courseerr, setCourseErr] = useState("");
    const [error, setError] = useState("");
    const [courselist, setCourseList] = useState([]);
    const navigate = useNavigate();

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

    const handleClose = () => {
        navigate("/admin/batchlist");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        axios.get(`${backendUrl}/admin/getbatchdetail/${id}`)
            .then((response) => {
                console.log("eeeeeeeee", response.data);
                setBatchName(response.data.batchname);
    
                const startDate = new Date(response.data.startdate);
                const endDate = new Date(response.data.enddate);
    
                setStartDate(startDate);
                setEndDate(endDate);
    
                setTiming(response.data.timing);
                setCourse(response.data.course);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        var formIsValid = true;
        if (!batchname) {
            setBatchNameErr("Batch name is required");
            formIsValid = false;
        } else {
            setBatchNameErr("");
        }
        if (!startdate) {
            setStartDateErr("Start Date is required");
            formIsValid = false;
        } else {
            setStartDateErr("");
        }
        if (!enddate) {
            setEndDateErr("End Date is required");
            formIsValid = false;
        } else {
            setEndDateErr("");
        }
        if (!timing) {
            setTimingErr("Timing is required");
            formIsValid = false;
        } else {
            setTimingErr("");
        }
        if (!course) {
            setCourseErr("Course is required");
            formIsValid = false;
        } else {
            setCourseErr("");
        }
        
        if (formIsValid) {

            const formData = {
                batchname,
                startdate,
                enddate,
                timing,
                course,
            }
            console.log(formData);
            axios
                .put(`${backendUrl}/admin/updatebatch/${id}`, formData)
                .then((response) => {
                    console.log(response);
                    toast.success("Batch edited successfully!", {
                        position: "top-right",
                        duration: 3000,
                    });
                    window.location.href = "/admin/batchlist";
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
                    } else if(error.response && error.response.status === 402){
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
                        <h4>EDIT BATCH</h4>
                    </CardTitle>
                    <CardSubtitle display="block" variant="button" color="white" my={1}>
                        Edit Batch Details
                    </CardSubtitle>
                </div>
                <div className="div2">
                    <div component="form" className="form" role="form">
                    <div className="d2form">
                            <label className="adminlabel">Batch name: </label>
                            <input
                                className="admininput"
                                type="text"
                                label="Batch name"
                                value={batchname}
                                onChange={(e) => setBatchName(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {batchnameerr && <p style={{ color: "red", marginLeft: "25%" }}>{batchnameerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Start Date: </label>
                            {/* <input
                                className="admininput"
                                type="datetime-local"
                                label="Timing"
                                value={timing}
                                onChange={(e) => setTiming(e.target.value)}
                                variant="standard"
                                fullWidth
                            /> */}
                            <DatePicker
                                className="admininput"
                                id="startDate"
                                selected={startdate}
                                onChange={date => setStartDate(date)}
                                dateFormat="dd - MM - yyyy"
                                showYearDropdown
                                showMonthDropdown
                                dropdownMode="select"
                                fullWidth
                            />
                        </div>
                        {startdateerr && <p style={{ color: "red", marginLeft: "25%" }}>{startdateerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">End Date: </label>
                            <DatePicker
                                className="admininput"
                                id="endDate"
                                selected={enddate}
                                onChange={date => setEndDate(date)}
                                dateFormat="dd - MM - yyyy"
                                showYearDropdown
                                showMonthDropdown
                                dropdownMode="select"
                                fullWidth
                            />
                        </div>
                        {enddateerr && <p style={{ color: "red", marginLeft: "25%" }}>{enddateerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Timing: </label>
                            <input
                                className="admininput"
                                type="text"
                                label="Timing"
                                value={timing}
                                onChange={(e) => setTiming(e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                        </div>
                        {timingerr && <p style={{ color: "red", marginLeft: "25%" }}>{timingerr}</p>}
                        <div className="d2form">
                            <label className="adminlabel">Course: </label>
                            <select
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                variant="standard"
                                fullWidth
                                className="admininput"
                            >
                                <option value="" disabled>
                                    Select a course
                                </option>
                                {courselist.map((courseItem) => (
                                    <option key={courseItem._id} value={courseItem._id}>
                                        {courseItem.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {courseerr && <p style={{ color: "red", marginLeft: "25%" }}>{courseerr}</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <div className="buttonline">
                            <Button
                                onClick={handleSubmit}
                                variant="gradient"
                                className="buttontheme"
                                style={{ backgroundColor: "#5ab769", color: "black", borderRadius: "25px" }}
                                fullWidth
                            >
                                Edit Batch
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

export default EditBatch;
