import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserComplaints } from "../../api/complaintApi";
import Header from "../../components/Header";

export default function ComplaintStatus() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.id) return;

    getUserComplaints(user.id)
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error("Error fetching complaints:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="User Dashboard" />

      <div className="p-6">
        <div className="bg-white p-6 rounded-xl shadow-md overflow-auto">

          <h2 className="text-2xl font-bold mb-4 text-[#071952]">
            Your Complaints
          </h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#37B7C3] text-white">
                <th className="p-3">ID</th>
                <th className="p-3">Company</th>
                <th className="p-3">Details</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Status</th>
                <th className="p-3">Submitted</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-[#071952]">
                    No complaints found.
                  </td>
                </tr>
              ) : (
                complaints.map((c) => (
                  <tr
                    key={c.complaintId}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{c.complaintId}</td>
                    <td className="p-3">{c.companyName}</td>
                    <td className="p-3">{c.details}</td>
                    <td className="p-3 font-semibold">{c.severity}</td>

                    <td
                      className={`p-3 font-bold 
                        ${c.status === "RESOLVED" ? "text-green-600" : 
                          c.status === "IN_PROGRESS" ? "text-yellow-600" : 
                          "text-red-600"}
                      `}
                    >
                      {c.status}
                    </td>

                    <td className="p-3">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      <Link
                        to={`/consumer/complaints/${c.complaintId}/replies`}
                        className="bg-[#37B7C3] text-white px-3 py-1 rounded hover:bg-[#2faab6]"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
