import React from "react";
import "./App.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, useLocation, matchPath } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar.js";
import Superadmin from "./Component/Superadmin/Register.js";
import Superlogin from "./Component/Superadmin/Login.js";
import Superdeskboard from "./Component/Superadmin/Deskboard.js";
import Admin from "./Component/Admin/Adminlogin.js";
import Dashboard from "./Component/Admin/Dashboard.js";
import Vender from "./Component/Vendor/Vendor.js";
import Adminupdate from "./Component/Admin/Update.js";
import Franchise from "./Component/Franchise/Franchise.js";
import Dealership from "./Component/Dealership/Dealership.js";
import Business from "./Component/Admin/Pages/Business.js";
import Afranchise from "./Component/Admin/Pages/Franchise.js";
import Adealership from "./Component/Admin/Pages/Dealership.js";
import Home from "./Component/Home/Home.js";
import Createcategory from "./Component/Data/Createcategory.js";
import Subcategory from "./Component/Data/Subcategory.js";
import City from "./Component/Data/City.js";
import Subcategorys from "./Component/Superadmin/Subcategory/Subcategory.js";
import Subcategories from "./Component/Home/Subcategories/Subcategories.js";
import SubcategoryDetails from "./Component/Home/Subcategories/SubcategoryDetails.js";
import Fulldetails from "./Component/Home/Subcategories/Fulldetails.js";
import Businessform from "./Component/Navbar/Pages/Businessform.js";
import Franchiseform from "./Component/Navbar/Pages/Franchiseform.js";
import Dealershipform from "./Component/Navbar/Pages/Dealershipform.js";
import Userdashboard from "./Component/User/Userdashboard.js";
import DashboardContent from "./Component/User/Pages/DashboardContent.js";
import Messages from "./Component/User/Pages/Messages.js";
import Analytics from "./Component/User/Pages/Analytics.js";
import Projects from "./Component/User/Pages/Projects.js";
import Tasks from "./Component/User/Pages/Tasks.js";
import Profile from "./Component/User/Pages/Profile.js";
import Enquiry from "./Component/Enquiry/Enquiry.js";
import Enquiries from "./Component/Admin/Enquiries.js";
import Admins from "./Component/Superadmin/Admin.js";

function AppContent() {
  const location = useLocation();

  // Define route patterns where Navbar should NOT appear
  const hideNavbarRoutes = [
    "/",
    "/Superlogin",
    "/Adminlogin",
    "/superdesk/:id",
    "/superdesk/:id/vender",
    "/superdesk/:id/admin",
    "/superdesk/:id/Franchise",
    "/superdesk/:id/Dealership",
    "/admindesk/:id/Business",
    "/admindesk/:id/Franchise",
    "/admindesk/:id/Dealership",
    "/superdesk/:id/Createcategory",
    "/superdesk/:id/Subcategory",
    "/superdesk/:id/city",
    "/UserDeshboard/:userId",
    "/UserDeshboard/:userId/messages",
    "/UserDeshboard/:userId/analytics",
    "/UserDeshboard/:userId/projects",
    "/UserDeshboard/:userId/tasks",
    "/UserDeshboard/:userId/profile",
    "/admindesk/:id",
    "Enquiries/:adminCity",
    
  ];

  const hideNavbar = hideNavbarRoutes.some((route) => matchPath(route, location.pathname));

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/Home" element={<Superadmin />} />
        <Route path="/superlogin" element={<Superlogin />} />
        <Route path="/Adminlogin" element={<Admin />} />
        <Route path="/admindesk/:id" element={<Dashboard />} />
        {/* <Route path="/admindesk/Business/:id" element={<Business />} />
        <Route path="/admindesk/Franchise/:id" element={<Afranchise />} />
        <Route path="/admindesk/Dealership/:id" element={<Adealership />} /> */}
        <Route path="/admin-update/:id" element={<Adminupdate />} />
        <Route path="/" element={<Home />} />
        <Route path="/subcategory/:id" element={<Subcategorys />} />
        <Route path="/subcategories/:id" element={<Subcategories />} />
        <Route path="/subcategory/:subcategory/:category" element={<SubcategoryDetails />} />
        <Route path="/subcategory/details" element={<Fulldetails />} />
        <Route path="/BusinessForm" element={<Businessform />} />
        <Route path="/FranchiseForm" element={<Franchiseform />} />
        <Route path="/DealershipForm" element={<Dealershipform />} />
        
        {/* User Dashboard with Nested Routes */}
        <Route path="/UserDeshboard/:userId" element={<Userdashboard />}>
          <Route index element={<Superdeskboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="messages" element={<Messages />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>

        {/* Superadmin and Data Routes */}
        <Route path="/superdesk/:id" element={<Superdeskboard />}>
  <Route path="admin" element={<Admins />} />
  <Route path="vender" element={<Vender />} />
  <Route path="Franchise" element={<Franchise />} />
  <Route path="Dealership" element={<Dealership />} />
  <Route path="Createcategory" element={<Createcategory />} />
  <Route path="Subcategory" element={<Subcategory />} />
  <Route path="city" element={<City />} />
</Route>
{/* admin and data Router */}
<Route path="/admindesk/:id" element={<Dashboard />} >
  <Route path="Business" element={<Vender />} />
  <Route path="Franchise" element={<Franchise />} />
  <Route path="Dealership" element={<Dealership />} />
  
</Route>

        {/* Enquiries */}
        <Route path="/Enquiry" element={<Enquiry />} />
        <Route path="Enquiries/:adminCity" element={<Enquiries />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
