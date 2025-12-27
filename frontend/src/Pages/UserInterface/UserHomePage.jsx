import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const UserHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Top Header */}
      <Header title="User Dashboard" />

      {/* Page Content */}
      <div className="flex flex-col items-center px-6 py-10 space-y-8">

        {/* Intro Section */}
        <div className="bg-white w-full max-w-4xl p-8 rounded-xl shadow-md text-center">
          <h1 className="text-3xl font-bold text-[#071952] mb-4">
            Complaint Management System
          </h1>
          <p className="text-gray-600">
            A platform that allows users to submit complaints, track their progress,
            communicate with helpdesk staff, and provide feedback after resolution.
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white w-full max-w-4xl p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-[#071952] mb-4">
            What You Can Do
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Submit a new complaint</li>
            <li>Track the status of your complaints</li>
            <li>Chat with helpdesk and support staff</li>
            <li>Provide feedback after a complaint is resolved</li>
          </ul>
        </div>

       

      </div>
    </div>
  );
};

export default UserHomePage;
