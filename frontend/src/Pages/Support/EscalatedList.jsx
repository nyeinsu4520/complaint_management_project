import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getComplaintsByCompany,
  resolveComplaint
} from "../../api/complaintApi";
import { getStaffCompany } from "../../api/userApi"; // ✅ ADD THIS

export default function EscalatedToMe() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");

    if (!rawUser) {
      return;
    }

    const user = JSON.parse(rawUser);

    if (!user?.id) {
      return;
    }

    getStaffCompany(user.id)
      .then((res) => {
        const companyId = res.data;

        if (!companyId) {
          return;
        }

        
        return getComplaintsByCompany(companyId);
      })
      .then((res) => {
        if (!res) return;

        const escalated = res.data.filter(
          (c) => c.status === "ESCALATED"
        );
        setComplaints(escalated);
      })
      .catch((err) =>
        console.error("Failed to load escalated complaints", err)
      );
  }, []);

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

  const statusStyle = (status) => {
    switch (status) {
      case "ESCALATED":
        return "bg-blue-100 text-blue-700";
      case "RESOLVED":
        return "bg-green-100 text-green-700";
      case "HANDLED":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleResolve = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    resolveComplaint(id, user.id, "Resolved by support")
      .then(() =>
        setComplaints((c) => c.filter((item) => item.id !== id))
      )
      .catch(() => alert("Failed to resolve complaint"));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#071952]">
          Escalated Complaints Assigned to Me
        </h2>
        <p className="text-gray-600">
          Complaints that have been escalated for your attention
        </p>
      </div>

      <div className="bg-white rounded-lg shadow divide-y">
        {complaints.length === 0 && (
          <p className="p-6 text-gray-500 text-center">
            No escalated complaints assigned
          </p>
        )}

        {complaints.map((c) => (
          <div
            key={c.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div>
              <h3 className="font-semibold text-lg">{c.details}</h3>
              <p className="text-sm text-gray-500">
                Submitted on{" "}
                {new Date(c.createdAt).toLocaleDateString()}
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

              <span
                className={`text-sm px-3 py-1 rounded-full ${statusStyle(
                  c.status
                )}`}
              >
                {c.status}
              </span>

              <Link
                to={`/support/complaint/${c.id}`}
                className="px-2 py-1 bg-[#37B7C3] text-white rounded"
              >
                View
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
