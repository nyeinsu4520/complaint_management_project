import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import CompanyList from "./Pages/UserInterface/CompanyList";
import ComplaintForm from "./Pages/UserInterface/ComplaintForm";
import ComplaintStatus from "./Pages/UserInterface/ComplaintStatus";
import ProtectedRoute from "./components/ProtectedRoute";


// Layouts
import AdminLayout from "./layouts/AdminLayout";
import HelpDeskLayout from "./layouts/HelpDeskLayout";
import SupportLayout from "./layouts/SupportLayout";

// Pages
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManageUsers from "./Pages/Admin/ManageUsers";
import AllComplaints from "./Pages/Admin/AllComplaints";

import HelpDeskHome from "./Pages/HelpDesk/HelpDeskHome";
import NewComplaints from "./Pages/HelpDesk/NewComplaints";
import HelpDeskComplaint from "./Pages/HelpDesk/HelpDeskComplaint";

import SupportHome from "./Pages/Support/SupportHome";
import SupportEscalated from "./Pages/Support/EscalatedList";

export default function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Normal User */}
      <Route path="/company-list" element={<CompanyList />} />
      <Route path="/complaintForm" element={<ComplaintForm />} />
      <Route path="/complaintStatus" element={<ComplaintStatus />} />

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
        <Route path="escalated" element={<SupportEscalated />} />
      </Route>

    </Routes>
  );
}
