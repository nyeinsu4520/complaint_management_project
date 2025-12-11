import { useEffect, useState } from "react";
import { getAllUsers, registerInternalUser } from "../../api/userApi";
import { getCompanies } from "../../api/companyApi";
import SimpleTable from "../../components/SimpleTable";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    address: "",
    role: "HELPDESK_AGENT",
    companyId: ""
  });

  // Load users + companies at startup
  useEffect(() => {
    getAllUsers().then(r => setUsers(r.data)).catch(console.error);
    getCompanies().then(r => setCompanies(r.data)).catch(console.error);
  }, []);

  const handleRegister = () => {
    registerInternalUser(form)
      .then(r => {
        alert("User registered!");
        setUsers(prev => [...prev, r.data]);
      })
      .catch(err => {
        console.error("Registration error:", err);
        alert("Registration failed");
      });
  };

  const columns = [
    { key: "id", title: "ID" },
    { key: "email", title: "Email" },
    { key: "username", title: "Username" },
    { key: "role", title: "Role" },
  ];

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">Manage Internal Users</h2>

      {/* Register Internal User Form */}
      <div className="p-4 border rounded mb-6">

        <h3 className="text-lg font-semibold mb-3">Register Helpdesk / Support</h3>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Email"
            className="border p-2"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="text"
            placeholder="Username"
            className="border p-2"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="border p-2"
            value={form.phoneNumber}
            onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-2 col-span-2"
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
          />

          {/* Role selection */}
          <select
            className="border p-2"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="HELPDESK_AGENT">Helpdesk</option>
            <option value="SUPPORT">Support</option>
          </select>

          {/* Select Company */}
          <select
            className="border p-2"
            value={form.companyId}
            onChange={e => setForm({ ...form, companyId: e.target.value })}
          >
            <option value="">Select Company</option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleRegister}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Register
        </button>
      </div>

      {/* Display Table of Internal Users */}
      <SimpleTable columns={columns} data={users} />

    </div>
  );
}
