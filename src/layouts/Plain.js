/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import "../users/assets/css/style.css"
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

var ps;

function Admin(props) {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = React.useState("blue");
  const mainPanel = React.useRef();
  const navigate = useNavigate("")

  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
      navigate("/plain/student/login");
    }
  }, []);

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 55;
  }, [location]);
  const handleColorClick = (color) => {
    setBackgroundColor(color);
  };
  return (
    <div className="wrapper" style={{ minHeight: "100vh"}}>
      <div ref={mainPanel}>
        <Routes>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                element={prop.component}
                key={key}
                exact
              />
            );
          })}
          <Route
            path="/plain"
            element={<Navigate to="/plain/student/login" replace />}
          />
        </Routes>
        {/* <Footer fluid /> */}
      </div>
      {/* <FixedPlugin
        bgColor={backgroundColor}
        handleColorClick={handleColorClick}
      /> */}
    </div>
  );
}

export default Admin;
