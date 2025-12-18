import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function HelpDeskLayout() {
  const location = useLocation();

  const linkStyle = (path) =>
    location.pathname === path
      ? "bg-[#37B7C3] text-[#071952] font-semibold px-4 py-2 rounded-lg shadow"
      : "text-gray-200 hover:text-white hover:bg-[#0a2b4d] px-4 py-2 rounded-lg transition";

  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <aside className="w-64 bg-[#088395] text-white p-6 shadow-xl flex flex-col">

        {/* Title */}
        <h2 className="text-xl font-bold text-[#EBF4F6] mb-8">
          Help Desk
        </h2>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-md">
          <Link
            to="/helpdesk/home"
            className={linkStyle("/helpdesk/home")}
          >
            Dashboard
          </Link>

          <Link
            to="/helpdesk/new"
            className={linkStyle("/helpdesk/new")}
          >
            New Complaints
          </Link>

          <Link
            to="/helpdesk/assigned"
            className={linkStyle("/helpdesk/assigned")}
          >
            Assigned to Me
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-[#EBF4F6]">
        <Header title="Help Desk" />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
