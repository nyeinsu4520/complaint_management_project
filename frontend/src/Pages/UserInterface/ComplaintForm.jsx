import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitComplaint as submitComplaintApi } from "../../api/complaintApi";
import Header from "../../components/Header";

export default function ComplaintForm() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const companyId = localStorage.getItem("companyId");

  const [details, setDetails] = useState("");
  const [severity, setSeverity] = useState("LOW");

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();

    if (!companyId) {
      alert("Company ID missing. Please select a company first.");
      navigate("/company-list");
      return;
    }

    const complaint = {
      userId: user.id,
      companyId: companyId,
      details: details,
      severity: severity,
    };

    try {
      await submitComplaintApi(complaint);
      alert("Complaint submitted successfully!");

      navigate("/complaintStatus"); // Change if you want another redirect
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert("Error submitting complaint!");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* HEADER */}
      <Header title="Complaint Management System " />

      {/* CONTENT */}
      <main className="flex justify-center items-start p-8">
        <form
          onSubmit={handleSubmitComplaint}
          className="bg-[#071952] text-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#37B7C3]">
            Complaint Registration Form
          </h2>

          <div className="mb-4">
            <label className="block mb-1 text-[#EBF4F6]">Complaint Details</label>
            <textarea
              className="w-full p-3 rounded border border-[#088395] bg-[#EBF4F6] text-[#071952]"
              rows="4"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-[#EBF4F6]">Severity</label>
            <select
              className="w-full p-3 rounded border border-[#088395] bg-[#EBF4F6] text-[#071952]"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#37B7C3] text-white rounded-lg hover:bg-[#088395] transition font-bold"
          >
            Submit Complaint
          </button>
        </form>
      </main>
    </div>
  );
}
