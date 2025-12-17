import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function SupportLayout(){
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-[#37B7C3] text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Support</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/support/home" className="hover:text-[#071952]">Dashboard</Link>
          <Link to="/support/escalated" className="hover:text-[#071952]">Escalated</Link>
          <Link to="/support/resolved" className="hover:text-[#071952]">Resolved</Link>
        </nav>
      </aside>

      <div className="flex-1 bg-[#EBF4F6]">
        <Header title="Support" />
        <main className="p-6"><Outlet/></main>
      </div>
    </div>
  );
}
