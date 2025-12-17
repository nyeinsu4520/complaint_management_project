import { useState } from "react";
import { Link } from "react-router-dom";
import {registerConsumer } from "../../api/userApi";

export default function Register({ switchPage }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const payload = {email,username,phoneNumber,password,address};
      const response = await registerConsumer(payload);
      alert ("Registration successful!");
    }catch(err){
      console.error("Registration error: ", err);
      alert("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#071952]">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md lg:max-w-lg bg-[#EBF4F6] p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#37B7C3]">
          Create Your Account
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded border border-[#088395] text-[#071952] focus:outline-none focus:ring-2 focus:ring-[#37B7C3] bg-white"
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded border border-[#088395] text-[#071952] focus:outline-none focus:ring-2 focus:ring-[#37B7C3] bg-white"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-3 rounded border border-[#088395] text-[#071952] focus:outline-none focus:ring-2 focus:ring-[#37B7C3] bg-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded border border-[#088395] text-[#071952] focus:outline-none focus:ring-2 focus:ring-[#37B7C3] bg-white"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 rounded border border-[#088395] text-[#071952] focus:outline-none focus:ring-2 focus:ring-[#37B7C3] bg-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 rounded-lg font-bold bg-[#37B7C3] hover:bg-[#088395] text-white transition shadow-md"
        >
          Register
        </button>

        <p className="mt-4 text-center text-[#071952]">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-[#37B7C3] font-semibold hover:underline cursor-pointer"
        >
          Login
        </Link>
      </p>
      </form>
    </div>
  );
}
