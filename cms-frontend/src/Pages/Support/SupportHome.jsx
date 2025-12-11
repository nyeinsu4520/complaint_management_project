import { Link, Outlet } from "react-router-dom";

export default function SupportLayout() {
  return (
    <div className="flex min-h-screen bg-[#EBF4F6]">

      <aside className="w-64 bg-[#37B7C3] text-white p-5">
        <h2 className="text-xl font-bold mb-6">Support</h2>

        <nav className="flex flex-col gap-3">
          <Link className="hover:text-[#071952]" to="/support/home">Dashboard</Link>
          <Link className="hover:text-[#071952]" to="/support/escalated">Escalated Complaints</Link>
          <Link className="hover:text-[#071952]" to="/support/resolved">Resolved</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}
