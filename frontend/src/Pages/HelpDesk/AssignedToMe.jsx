import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAssignedTo } from "../../api/complaintApi";

export default function AssignedToMe() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    getAssignedTo(user.id)
      .then((res) => {
       
        const notPending = res.data.filter(c => c.status !== "PENDING");
        setComplaints(notPending);
      })
      .catch((err) =>
        console.error("Failed to load assigned complaints", err)
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

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#071952]">
          Assigned to Me
        </h2>
        <p className="text-gray-600">
          Complaints you are currently handling
        </p>
      </div>

      {/* Complaints List */}
      <div className="bg-white rounded-lg shadow divide-y">
        {complaints.length === 0 && (
          <p className="p-6 text-gray-500 text-center">
            No handled complaints yet
          </p>
        )}

        {complaints.map((c) => (
          <div
            key={c.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {c.details}
              </h3>
              <p className="text-sm text-gray-500">
                Submitted on{" "}
                {new Date(c.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-4">

              {/* Severity */}
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${severityStyle(
                  c.severity
                )}`}
              >
                {c.severity}
              </span>

              {/* Status */}
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  c.status === "RESOLVED" ? "bg-green-100 text-green-700" :
                  c.status === "HANDLED" ? "bg-yellow-100 text-yellow-700" :
                  c.status === "CLOSED" ? "bg-gray-200 text-gray-800" :
                  "bg-blue-100 text-blue-700"
                }`}
              >
                {c.status}
              </span>

              {/* View */}
              <Link
                to={`/helpdesk/complaint/${c.id}`}
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
