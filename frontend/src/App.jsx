import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import CompanyList from "./Pages/UserInterface/CompanyList";
import ComplaintForm from "./Pages/UserInterface/ComplaintForm";
import ComplaintStatus from "./Pages/UserInterface/ComplaintStatus";
import ProtectedRoute from "./components/ProtectedRoute";
import ReplyPage from "./Pages/UserInterface/ReplyPage";
import UserHomePage from "./Pages/UserInterface/UserHomePage";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import HelpDeskLayout from "./layouts/HelpDeskLayout";
import SupportLayout from "./layouts/SupportLayout";

// Pages
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManageUsers from "./Pages/Admin/ManageUsers";
import AllComplaints from "./Pages/Admin/AllComplaints";
import AddCompany from "./Pages/Admin/AddCompanyPage";

import HelpDeskHome from "./Pages/HelpDesk/HelpDeskHome";
import NewComplaints from "./Pages/HelpDesk/NewComplaints";
import HelpDeskComplaint from "./Pages/HelpDesk/HelpDeskComplaint";
import AssignedToMe from "./Pages/HelpDesk/AssignedToMe";

import SupportHome from "./Pages/Support/SupportHome";
import EscalatedList from "./Pages/Support/EscalatedList";
import ResolvedList from "./Pages/Support/ResolvedList";
import EscalateReplyPage from "./Pages/Support/EscalateReplyPage";

export default function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Normal User */}
      <Route path="/home" element={<UserHomePage />} />
      <Route path="/company-list" element={<CompanyList />} />
      <Route path="/complaintForm" element={<ComplaintForm />} />
      <Route path="/complaintStatus" element={<ComplaintStatus />} />
       <Route path="/consumer/complaints/:id/replies" element={<ReplyPage />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="complaints" element={<AllComplaints />} />
          <Route path="addcompany" element={<AddCompany />} />
      </Route>

      {/* HELPDESK */}
      <Route
        path="/helpdesk"
        element={
          <ProtectedRoute allowedRoles={["HELPDESK_AGENT"]}>
            <HelpDeskLayout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<HelpDeskHome />} />
        <Route path="new" element={<NewComplaints />} />
        <Route path="complaint/:id" element={<HelpDeskComplaint />} />
        <Route path="/helpdesk/assigned" element={<AssignedToMe />} />
      </Route>


      {/* SUPPORT */}
      <Route
        path="/support"
        element={
          <ProtectedRoute allowedRoles={["SUPPORT"]}>
            <SupportLayout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<SupportHome />} />
        <Route path="escalated" element={<EscalatedList />} />
        <Route path="resolved" element={<ResolvedList />} />
        <Route path="complaint/:id" element={<EscalateReplyPage />} /> 
      </Route>

    </Routes>
  );
}
