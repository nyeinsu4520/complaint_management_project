import { useEffect, useState } from "react";
import { getComplaintsByCompany } from "../../api/complaintApi";
import { getStaffCompany } from "../../api/userApi";
import SimpleTable from "../../components/SimpleTable";

export default function HelpDeskHome() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [companyId, setCompanyId] = useState(null);
  const [list, setList] = useState([]);
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0 });

  useEffect(() => {
    if (!user.id) return;

    getStaffCompany(user.id)  
      .then((res) => setCompanyId(res.data))
      .catch((err) => console.error("Failed to fetch company:", err));
  }, [user.id]);

  useEffect(() => {
    if (!companyId) return;

    getComplaintsByCompany(companyId)
      .then((res) => {
        setList(res.data);
        // Calculate stats based on the complaints data
        const totalComplaints = res.data.length;
        const openComplaints = res.data.filter(
          (complaint) => complaint.status === 'PENDING' || complaint.status === 'HANDLED'
        ).length;

        const resolvedComplaints = res.data.filter(
          (complaint) => complaint.status === 'RESOLVED'
        ).length;
        
        setStats({
          total: totalComplaints,
          open: openComplaints,
          resolved: resolvedComplaints,
        });
      })
      .catch((err) => console.error("Failed to fetch complaints:", err));
  }, [companyId]);

  const cols = [
    { key: "id", title: "ID" },
    { key: "details", title: "Details" },
    { key: "status", title: "Status" },
    { key: "severity", title: "Severity" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Complaints Card */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-l font-semibold text-gray-400">Total Complaints</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>

          {/* Open Complaints Card */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-l font-semibold text-gray-400">Open</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.open}</p>
          </div>

          {/* Resolved Complaints Card */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-l font-semibold text-gray-400">Resolved</h3>
            <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-l font-semibold text-gray-600 mb-4">Company Complaints</h3>
          <SimpleTable columns={cols} data={list} />
        </div>
      </div>
    </div>
  );
}
