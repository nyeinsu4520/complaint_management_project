import { Outlet, Link } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#071952] text-white p-5 flex flex-col shadow-lg">

       
        <div className="flex justify-center mb-6">
          <img
            src="/image/innovator.png"
            alt="Logo"
            className="w-32 h-auto"
          />
        </div>

        <h2 className="text-2xl font-bold mb-8 text-[#37B7C3] text-center">
          My System
        </h2>

        <nav className="flex flex-col gap-3 text-lg">
          <Link to="/admin/dashboard" className="hover:text-[#37B7C3]">Dashboard</Link>
          <Link to="/helpdesk/home" className="hover:text-[#37B7C3]">Help Desk</Link>
          <Link to="/support/home" className="hover:text-[#37B7C3]">Support</Link>
          <Link to="/company-list" className="hover:text-[#37B7C3]">Companies</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header title="Dashboard" />

        <main className="p-6 overflow-auto h-full">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
