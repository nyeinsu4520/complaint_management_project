import { Link, useNavigate, useLocation } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  // MENU BY ROLE
  const menu = {
    ADMIN: [
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Manage Users", path: "/admin/manage-users" },
      { label: "All Complaints", path: "/admin/all-complaints" },
      { label: "Register Internal", path: "/admin/register-internal" },
    ],
    HELP_DESK: [
      { label: "Home", path: "/helpdesk/home" },
      { label: "New Complaints", path: "/helpdesk/new-complaints" },
      { label: "Assigned To Me", path: "/helpdesk/assigned" },
    ],
    SUPPORT: [
      { label: "Home", path: "/support/home" },
      { label: "Escalated Complaints", path: "/support/escalated" },
      { label: "Resolved List", path: "/support/resolved" },
    ],
    USER: [
      { label: "Company List", path: "/company-list" },
      { label: "Submit Complaint", path: "/complaintForm" },
    ],
  };

  const roleMenu = menu[user.role] || menu.USER;

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("companyId");
    navigate("/");
  };

  return (
    <aside className="w-64 text-white p-5 flex flex-col shadow-lg">

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/image/innovator.png"
          alt="Logo"
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-8 text-[#37B7C3] text-center">
        My System
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 text-lg">
        {roleMenu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                px-3 py-2 rounded transition
                ${isActive
                  ? "bg-[#37B7C3] text-[#071952] font-semibold"
                  : "text-white hover:text-[#37B7C3]"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-auto px-3 py-2 bg-red-500 rounded text-white hover:bg-red-600 transition"
      >
        Logout
      </button>
    </aside>
  );
}
