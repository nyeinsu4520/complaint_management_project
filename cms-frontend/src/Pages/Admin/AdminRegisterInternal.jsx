import { useState } from "react";
import { registerInternalUser } from "../../api/userApi";

export default function RegisterInternalUser() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    address: "",
    role: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerInternalUser(form);
      if (res.status === 200) {
        alert("Internal user registered successfully!");
      }
    } catch (err) {
      alert("Registration failed: " + err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Register Internal User</h2>

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        placeholder="Phone Number"
        value={form.phoneNumber}
        onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="">Select Role</option>
        <option value="HELPDESK_AGENT">Help Desk</option>
        <option value="SUPPORT">Support</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
}
