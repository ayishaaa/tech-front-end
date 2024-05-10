import axios from "axios";
import "../assets/css/signin.css";
import { useState } from "react";
import logo from "../assets/img/Techoriz.png"

function Signin() {
  const backendUrl = process.env.REACT_APP_TECHORIZ_APP_BACKEND_URL;
  const [usernameOremail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (usernameOremail === "" || password === "") {
      setError("Enter username or email and password");
    } else {
      const isEmail = usernameOremail.includes('@');

      if (isEmail) {
        const AdminLogin = { email: usernameOremail, password };
        axios
          .post(`${backendUrl}/admin/adminlogin`, AdminLogin)
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("adminProfile", JSON.stringify(response.data.adminProfile));
              window.location.href = "/admin/dashboard";
            }
          })
          .catch((error) => {
            setError("Invalid Email or Password");
          });
      } else {
        // Handle username login
        const AdminLogin = { username: usernameOremail, password };
        axios
          .post(`${backendUrl}/admin/adminlogin`, AdminLogin)
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("adminProfile", JSON.stringify(response.data.adminProfile));
              window.location.href = "/admin/dashboard";
            }
          })
          .catch((error) => {
            setError(error.response.data.message);
          });
      }
    };
  }

  return (
    <div>
      <form className="modal-content" action="/action_page.php">
        <div className="container">
          <div className="header">
            <img src={logo}></img>
            <h1>Admin Login</h1>
          </div>
          <hr />
          <div className="formlabel">
            <input
              className="signinput"
              type="text"
              value={usernameOremail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Enter Username or Email"
              name="usernameOrEmail"
              required
            />
          </div>
          <div className="formlabel">
            <input className="signinput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" name="psw" required />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="clearfix">
            <button type="submit" onClick={handleSubmit} className="signupbtn">Sign In</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signin;
