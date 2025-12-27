import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function AdminLayout() {
  const location = useLocation();

  const linkStyle = (path) =>
    location.pathname === path
      ? "bg-[#37B7C3] text-[#071952] font-semibold px-4 py-2 rounded-lg shadow"
      : "text-gray-200 hover:text-white hover:bg-[#0a2b4d] px-4 py-2 rounded-lg transition";

  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <aside className="w-64 bg-[#071952] text-white p-6 shadow-xl flex flex-col">

        {/* Title */}
        <h2 className="text-xl font-bold text-[#37B7C3] mb-8">
          Admin Panel
        </h2>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-md">
          <Link to="/admin/dashboard" className={linkStyle("/admin/dashboard")}>
            Dashboard
          </Link>

          <Link to="/admin/users" className={linkStyle("/admin/users")}>
            Manage Users
          </Link>

          <Link
            to="/admin/complaints"
            className={linkStyle("/admin/complaints")}
          >
            All Complaints
          </Link>

          <Link
            to="/admin/addcompany"
            className={linkStyle("/admin/addcompany")}
          >
            Add Company
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 bg-[#EBF4F6]">
        <Header title="Admin Panel" />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
