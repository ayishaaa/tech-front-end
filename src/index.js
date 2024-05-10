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
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';


import AdminLayout from "layouts/Admin.js";
import AdminplainLayout from "layouts/Adminplain";
import PlainLayout from "layouts/Plain";
import PswPlainLayout from "layouts/Pswplain";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/plain/*" element={<PlainLayout />} />
      <Route path="/pswplain/*" element={<PswPlainLayout />} />
      <Route path="/adminplain/*" element={<AdminplainLayout />} />
      <Route path="*" element={<Navigate to="/plain/student/login" replace />} />
    </Routes>
  </BrowserRouter>
);
