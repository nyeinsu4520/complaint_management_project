import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNewComplaints, escalateComplaint } from "../../api/complaintApi";
import { getStaffCompany } from "../../api/userApi";

export default function HelpDeskNew() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [companyId, setCompanyId] = useState(null);
  const [complaints, setComplaints] = useState([]);

useEffect(() => {
  if (!user.id) return;

  // Step 1: get the companyId for the helpdesk agent
  getStaffCompany(user.id)
    .then((res) => {
      const companyId = res.data;

      // Step 2: fetch new complaints only for this company
      getNewComplaints(companyId) 
        .then((res) => setComplaints(res.data))
        .catch((err) => console.error("Failed to load complaints", err));
    })
    .catch((err) => console.error("Failed to fetch company:", err));
}, [user.id]);



  const handleEscalate = (id) => {
    escalateComplaint(id)
      .then(() =>
        setComplaints((prev) => prev.filter((c) => c.complaintId !== id))
      )
      .catch(() => alert("Escalation failed"));
  };

  const severityStyle = (severity) => {
    switch (severity) {
      case "HIGH":
        return "bg-red-100 text-red-600";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-600";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#071952]">New Complaints</h2>
        <p className="text-gray-600">
          Recently submitted complaints awaiting review
        </p>
      </div>

      <div className="bg-white rounded-lg shadow divide-y">
        {complaints.length === 0 && (
          <p className="p-6 text-gray-500 text-center">No new complaints 🎉</p>
        )}

        {complaints.map((c) => (
          <div
            key={c.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div>
              <h3 className="font-semibold text-lg">{c.details}</h3>
              <p className="text-sm text-gray-500">
                Submitted on {new Date(c.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${severityStyle(
                  c.severity
                )}`}
              >
                {c.severity}
              </span>

              <Link
                to={`/helpdesk/complaint/${c.id}`}
                className="px-2 py-1 bg-[#37B7C3] text-white rounded"
              >
                View
              </Link>

              <button
                onClick={() => handleEscalate(c.id)}
                className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Escalate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
