import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api.js";
import { login } from "../../api/authApi.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN") navigate("/admin/dashboard");
      else if (user.role === "HELPDESK_AGENT") navigate("/helpdesk/home");
      else if (user.role === "SUPPORT") navigate("/support/home");
      else navigate("/company-list");

    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen">

      {/* LEFT SIDE PANEL */}
      <div className="w-1/2 bg-[#37B7C3] text-white flex flex-col justify-center p-20">

        {/* LOGO */}
        <img
          src="/image/innovator.png"
          alt="Logo"
          className="w-20 mb-10"
        />

        <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
        <p className="text-lg opacity-90">
          Login to continue accessing your system dashboard.
        </p>
      </div>

      {/* LOGIN FORM */}
      <div className="w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-[#071952] text-white p-8 rounded-2xl shadow-lg w-96"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-[#37B7C3]">
            Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded border border-[#088395] bg-[#EBF4F6] text-[#071952] focus:outline-none focus:ring-2 focus:ring-[#37B7C3]"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 rounded border border-[#088395] bg-[#EBF4F6] text-[#071952] focus:outline-none focus:ring-2 focus:ring-[#37B7C3]"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold bg-[#37B7C3] hover:bg-[#088395] transition text-white shadow-md"
          >
            Login
          </button>

          <p className="mt-4 text-center text-[#EBF4F6]">
            Create an account?{" "}
            <Link
              to="/register"
              className="text-[#37B7C3] font-semibold hover:underline cursor-pointer"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

    </div>
  );
}
