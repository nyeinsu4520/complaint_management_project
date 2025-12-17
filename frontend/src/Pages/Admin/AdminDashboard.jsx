import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/userApi";

export default function AdminDashboard(){
  const [counts,setCounts] = useState({users:0, complaints:0});

  useEffect(() => {
    // Example: load reminders / counts
    getAllUsers().then(res => setCounts(c => ({...c, users: res.data.length}))).catch(()=>{});
  },[]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-white rounded shadow">Users: {counts.users}</div>
        <div className="p-4 bg-white rounded shadow">Complaints: (TODO)</div>
        <div className="p-4 bg-white rounded shadow">Reports</div>
      </div>
    </div>
  );
}
