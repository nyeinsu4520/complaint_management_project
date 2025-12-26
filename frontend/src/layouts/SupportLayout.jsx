import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function SupportLayout() {
  const location = useLocation();

  const linkStyle = (path) =>
    location.pathname === path
      ? "bg-[#071952] text-white font-semibold px-4 py-2 rounded-lg shadow"
      : "text-white hover:bg-[#5bcad4] px-4 py-2 rounded-lg transition";

  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <aside className="w-64 bg-[#37B7C3] text-white p-6 shadow-xl flex flex-col">

        {/* Title */}
        <h2 className="text-xl font-bold mb-8">
          Support
        </h2>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-md">
          <Link
            to="/support/home"
            className={linkStyle("/support/home")}
          >
            Dashboard
          </Link>

          <Link
            to="/support/escalated"
            className={linkStyle("/support/escalated")}
          >
            Escalated Complaints
          </Link>

          <Link
            to="/support/closed"
            className={linkStyle("/support/closed")}
          >
            Closed
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-[#EBF4F6]">
        <Header title="Support" />
        <main className="p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
