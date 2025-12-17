import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function HelpDeskLayout(){
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-[#088395] text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Help Desk</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/helpdesk/home" className="hover:text-[#EBF4F6]">Dashboard</Link>
          <Link to="/helpdesk/new" className="hover:text-[#EBF4F6]">New Complaints</Link>
          <Link to="/helpdesk/assigned" className="hover:text-[#EBF4F6]">Assigned to Me</Link>
        </nav>
      </aside>

      <div className="flex-1 bg-[#EBF4F6]">
        <Header title="Help Desk" />
        <main className="p-6"><Outlet/></main>
      </div>
    </div>
  );
}
