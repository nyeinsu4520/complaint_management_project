import { Link, useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("companyId"); // clear selected company
    navigate("/");
  };

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      return null;
    }
  })();

  const isUser = user?.role === "CONSUMER";

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      
      {/* LEFT: Logo + Page Title */}
      <div className="flex items-center gap-3">
        <img src="/image/innovator.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-xl font-bold text-[#071952]">{title}</h1>
      </div>

      {/* CENTER NAV MENU (Only for regular user) */}
      {isUser && (
        <nav className="flex items-center gap-6 font-medium">
          <Link to="/home" className="text-[#071952] hover:text-[#37B7C3]">Home</Link>
          <Link to="/complaintStatus" className="text-[#071952] hover:text-[#37B7C3]">View Complaints</Link>
          <Link to="/company-list" className="text-[#071952] hover:text-[#37B7C3]">Select Company</Link>
        </nav>
      )}

      {/* RIGHT: User Info + Logout */}
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-600">
            {user.email} • {user.role}
          </span>
        )}
        <button
          className="px-3 py-1 bg-[#37B7C3] text-white rounded hover:bg-[#088395] transition"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
