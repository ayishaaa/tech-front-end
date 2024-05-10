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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBusinessTime, faChartBar, faFileInvoice, faGraduationCap, faLayerGroup, faMoneyCheckDollar, faPager, faRectangleList, faShieldAlt, faUser, faUsersLine } from '@fortawesome/free-solid-svg-icons';
const rectangleListIcon = <FontAwesomeIcon icon={faRectangleList} />;
const fontAwesomeIcons = {
  dashboard: faChartBar,
  adminlist: faUser,
  rolelist: faShieldAlt,
  // Add other Font Awesome icons as needed
};


import Dashboard from "views/Dashboard.js";
import AdminAdd from "views/AdminMngt/AdminAdd";
import AdminList from "views/AdminMngt/AdminList";
import AdminEdit from "views/AdminMngt/AdminEdit";
import AdminRoleList from 'views/AdminMngt/AdminRole';
import BannerAdd from "views/BannerMngt/BannerAdd";
import BannerList from 'views/BannerMngt/BannerList';
import BannerEdit from "views/BannerMngt/BannerEdit";
import BannerView from "views/BannerMngt/BannerView";
import BatchAdd from "views/BatchMngt/BatchAdd";
import BatchList from 'views/BatchMngt/BatchList';
import BatchEdit from "views/BatchMngt/BatchEdit";
import BatchView from "views/BatchMngt/BatchView";
import CourseAdd from "views/CourseMngt/CourseAdd";
import CourseList from 'views/CourseMngt/CourseList';
import CourseEdit from "views/CourseMngt/CourseEdit";
import CourseView from "views/CourseMngt/CourseView";
import ResourceAdd from "views/ResourceTeam/ResourceAdd";
import ResourceList from "views/ResourceTeam/ResourceList";
import ResourceEdit from "views/ResourceTeam/ResourceEdit";
import StudentAdd from "views/StudentMngt/StudentAdd";
import StudentList from 'views/StudentMngt/StudentList';
import StudentEdit from "views/StudentMngt/StudentEdit";
import StudentView from "views/StudentMngt/StudentView";
import PaymentList from 'views/PaymentMngt/PaymentList';
import AccountList from 'views/AccountMngt/AccountList';
import AccountView from "views/AccountMngt/AccountView";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import SignUp from "views/Signup.js";
import Signin from "views/Signin";

import Login from "users/Authentication/login";
import Done from "users/Authentication/done";
import ForgotPassword from "users/Authentication/forgot";
import Otp from "users/Authentication/otp";
import DashboardHome from "users/Authentication/dashboard-home";
import DashboardAddStudent from "users/Authentication/add-student";
import DashboardEditStudent from "users/Authentication/edit-student";
import DashboardStudent from "users/Authentication/student-listing";
import DashboardStudentDetail from "users/Authentication/student-details";
import DashboardPaymentDetail from "users/Authentication/payment-details";
import DashboardAdminDetail from "users/Authentication/student-profile";
import PrivacyPolicy from "users/Authentication/privacypolicy";
import TermsOfUse from "users/Authentication/termsofuse";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/adminlist",
    name: "Admin List",
    icon: "business_badge",
    component: <AdminList />,
    layout: "/admin",
  },
  {
    path: "/addadmin",
    name: "Admin Add",
    icon: "business_badge",
    component: <AdminAdd />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/editadmin/:id",
    name: "Admin Edit",
    icon: "business_badge",
    component: <AdminEdit />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/rolelist",
    name: "Role List",
    icon: <FontAwesomeIcon icon={faLayerGroup} style={{ width: "17%", margin: "2% 3% 0% 0%", fontSize: "large" }} />,
    component: <AdminRoleList />,
    layout: "/admin",
  },
  {
    path: "/resourcelist",
    name: "Resource Team",
    icon: <FontAwesomeIcon icon={faUsersLine} style={{ width: "17%", margin: "2% 3% 0% 0%", fontSize: "large" }} />,
    component: <ResourceList />,
    layout: "/admin",
  },
  {
    path: "/addresource",
    name: "Add Resource",
    component: <ResourceAdd />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/editresource/:id",
    name: "Edit Resource",
    component: <ResourceEdit />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/addbanner",
    name: "Banner Add",
    component: <BannerAdd />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/bannerlist",
    name: "Banner List",
    icon: <FontAwesomeIcon icon={faPager} style={{ width: "17%", margin: "2% 3% 0% 0%", fontSize: "large" }} />,
    component: <BannerList />,
    layout: "/admin",
  },
  {
    path: "/editbanner/:id",
    name: "Banner Edit",
    component: <BannerEdit />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/viewbanner/:id",
    name: "Banner View",
    component: <BannerView />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/addbatch",
    name: "Batch Add",
    component: <BatchAdd />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/batchlist",
    name: "Batch List",
    icon: <FontAwesomeIcon icon={faBusinessTime} style={{ width: "17%", margin: "2% 3% 0% 0%", fontSize: "large" }} />,
    component: <BatchList />,
    layout: "/admin",
  },
  {
    path: "/editbatch/:id",
    name: "Batch Edit",
    component: <BatchEdit />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/viewbatch/:id",
    name: "Batch View",
    component: <BatchView />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/addcourse",
    name: "Course Add",
    component: <CourseAdd />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/courselist",
    name: "Course List",
    icon: <FontAwesomeIcon icon={faBook} style={{ width: "17%", margin: "2% 3% 0% 0%", fontSize: "large" }} />,
    component: <CourseList />,
    layout: "/admin",
  },
  {
    path: "/editcourse/:id",
    name: "Course Edit",
    component: <CourseEdit />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/viewcourse/:id",
    name: "Course View",
    component: <CourseView />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/addstudent",
    name: "Student Add",
    component: <StudentAdd />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/studentlist",
    name: "Student List",
    icon: <FontAwesomeIcon icon={faGraduationCap} style={{ width: "17%", margin: "2% 3% 0% 0%", fontSize: "large" }} />,
    component: <StudentList />,
    layout: "/admin",
  },
  {
    path: "/editstudent/:id",
    name: "Student Edit",
    component: <StudentEdit />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/viewstudent/:id",
    name: "Student View",
    component: <StudentView />,
    layout: "/admin",
    type: "hidden",
  },
  {
    path: "/paymentlist",
    name: "Payment List",
    icon: <FontAwesomeIcon icon={faMoneyCheckDollar} style={{ width: "17%", margin: "2% 3% 0% 0%", fontSize: "large" }} />,
    component: <PaymentList />,
    layout: "/admin",
  },
  {
    path: "/accounts",
    name: "Account Management",
    icon: <FontAwesomeIcon icon={faFileInvoice} style={{ width: "17%", margin: "2% 3% 0% 0%", fontSize: "large" }} />,
    component: <AccountList />,
    layout: "/admin",
  },
  {
    path: "/viewaccount/:id",
    name: "Account View",
    component: <AccountView />,
    layout: "/admin",
    type: "hidden",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "design_image",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "location_map-big",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "ui-1_bell-53",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: <UserPage />,
    layout: "/admin",
    type: "hidden",
  },
  // {
  //   path: "/extended-tables",
  //   name: "Table List",
  //   icon: "files_paper",
  //   component: <TableList />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "design-2_ruler-pencil",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/signup",
  //   name: "Sign up",
  //   icon: "objects_spaceship",
  //   component: <SignUp />,
  //   layout: "/adminplain",
  // },
  {
    path: "/signin",
    name: "Sign in",
    icon: "objects_spaceship",
    component: <Signin />,
    layout: "/adminplain",
    type: "hidden",
  },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: <Upgrade />,
  //   layout: "/plain",
  // },



  {
    path: "/student/login",
    name: "Student Login",
    // icon: "users_single-02",
    component: <Login />,
    layout: "/plain",
    type: "hidden",
  },
  {
    path: "/student/done",
    name: "Student Done",
    // icon: "users_single-02",
    component: <Done />,
    layout: "/pswplain",
    type: "hidden",
  },
  {
    path: "/student/forgot",
    name: "Student Forgot Password",
    // icon: "users_single-02",
    component: <ForgotPassword />,
    layout: "/pswplain",
    type: "hidden",
  },
  {
    path: "/student/otp",
    name: "Student Otp",
    // icon: "users_single-02",
    component: <Otp />,
    layout: "/pswplain",
    type: "hidden",
  },
  {
    path: "/student/dashboard-home",
    name: "Student Dashboard",
    // icon: "users_single-02",
    component: <DashboardHome />,
    layout: "/plain",
    type: "hidden",
  },
  {
    path: "/student/add-student",
    name: "Student User Add",
    // icon: "users_single-02",
    component: <DashboardAddStudent />,
    layout: "/plain",
    type: "hidden",
  },
  {
    path: "/student/edit-student/:id",
    name: "Student User Edit",
    // icon: "users_single-02",
    component: <DashboardEditStudent />,
    layout: "/plain",
    type: "hidden",
  },
  {
    path: "/student/student-listing",
    name: "Student User List",
    // icon: "users_single-02",
    component: <DashboardStudent />,
    layout: "/plain",
    type: "hidden",
  },
  {
    path: "/student/student-details/:id",
    name: "Student Details",
    // icon: "users_single-02",
    component: <DashboardStudentDetail />,
    layout: "/plain",
    type: "hidden",
  },
  {
    path: "/student/payment-details",
    name: "Student Details",
    // icon: "users_single-02",
    component: <DashboardPaymentDetail />,
    layout: "/plain",
    type: "hidden",
  },
  {
    path: "/student/student-profile",
    name: "Student Details",
    // icon: "users_single-02",
    component: <DashboardAdminDetail />,
    layout: "/plain",
    type: "hidden",
  },
  {
    path: "/student/privacy-policy",
    name: "Privacy Policy",
    // icon: "users_single-02",
    component: <PrivacyPolicy />,
    layout: "/plain",
    type: "hidden",
  },
  {
    path: "/student/terms-of-use",
    name: "Terms of use",
    // icon: "users_single-02",
    component: <TermsOfUse />,
    layout: "/plain",
    type: "hidden",
  },
];
export default dashRoutes;
