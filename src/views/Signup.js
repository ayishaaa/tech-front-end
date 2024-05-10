import axios from "axios";
import "../assets/css/signin.css";
import logo from "../assets/img/Techoriz.png"
import { useState } from "react";

function SignUp() {
    const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rpassword, setRpassword] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState("");

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("country", country);
        formData.append("state", state);
        formData.append("phone", phone);
        formData.append("role", role);
        formData.append("image", image);

        console.log(formData);
        axios
            .post(`${backendUrl}/admin/addadmin`, formData)
            .then((response) => {
                console.log(response);

                window.location.href = "/adminplain/signin";
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.status === 400) {
                    setError("Username already exist");
                }
            });
    };


return (
    <div>
        <form className="modal-content" action="/action_page.php">
            <div className="container">
            <div className="header">
                        <img src={logo}></img>
                        <h1>SignUp</h1>
                    </div>
                <hr />
                <div className="formlabel">
                    <label><b>Name</b></label>
                    <input className="signinput" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" name="name" required />
                </div>
                <div className="formlabel">
                    <label><b>Username</b></label>
                    <input className="signinput" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" name="username" required />
                </div>
                <div className="formlabel">
                    <label><b>Email</b></label>
                    <input className="signinput" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" name="email" required />
                </div>
                <div className="formlabel">
                    <label><b>Mobile</b></label>
                    <input className="signinput" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Mobile" name="mobile" required />
                </div>
                <div className="formlabel">
                    <label><b>Role</b></label>
                    <input className="signinput" type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Enter Role" name="role" required />
                </div>
                <div className="formlabel">
                    <label><b>Address</b></label>
                    <input className="signinput" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" name="address" required />
                </div>
                <div className="formlabel">
                    <label><b>State</b></label>
                    <input className="signinput" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter State" name="state" required />
                </div>
                <div className="formlabel">
                    <label><b>Country</b></label>
                    <input className="signinput" type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter Country" name="country" required />
                </div>
                <div className="formlabel">
                    <label><b>Password</b></label>
                    <input className="signinput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" name="psw" required />
                </div>
                <div className="formlabel">
                    <label><b>Repeat Password</b></label>
                    <input className="signinput" type="password" value={rpassword} onChange={(e) => setRpassword(e.target.value)} placeholder="Repeat Password" name="pswrepeat" required />
                </div>
                <div className="formlabel">
                    <label><b>Upload Image</b></label>
                    <input className="signinput" type="file" label="Profile Image" onChange={handleImageChange} name="image" required />
                    {imagePreview && (
                        <div>
                            <img src={imagePreview} alt="Profile Preview" style={{ maxWidth: "100%", height: "auto" }} />
                        </div>
                    )}
                </div>
                {/* <label>
                        <input className="signinput" type="checkbox" defaultChecked="checked" name="remember" style={{ marginBottom: 15 }} /> Remember me
                    </label> */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="clearfix">
                    <button type="submit" onClick={handleSubmit} className="signupbtn">Sign Up</button>
                </div>
            </div>
        </form>
    </div>
);
}

export default SignUp;
