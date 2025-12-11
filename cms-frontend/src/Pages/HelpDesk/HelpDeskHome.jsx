import { useEffect, useState } from "react";
import { getComplaintsByCompany } from "../../api/complaintApi";
import { getStaffCompany } from "../../api/userApi";
import SimpleTable from "../../components/SimpleTable";

export default function HelpDeskHome() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [companyId, setCompanyId] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!user.id) return;

    getStaffCompany(user.id)   // ⬅ fetch the correct companyId
      .then((res) => setCompanyId(res.data))
      .catch((err) => console.error("Failed to fetch company:", err));
  }, [user.id]);

  useEffect(() => {
    if (!companyId) return;

    getComplaintsByCompany(companyId)
      .then((res) => setList(res.data))
      .catch((err) => console.error("Failed to fetch complaints:", err));
  }, [companyId]);

  const cols = [
    { key: "id", title: "ID" },
    { key: "details", title: "Details" },
    { key: "status", title: "Status" },
    { key: "severity", title: "Severity" },
  ];

  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold">Company Complaints</h2>
      <SimpleTable columns={cols} data={list} />
    </div>
  );
}
