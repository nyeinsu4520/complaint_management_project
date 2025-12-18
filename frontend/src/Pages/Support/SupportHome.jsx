import { Link, Outlet } from "react-router-dom";

export default function SupportHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#071952] mb-4">
        Support Dashboard
      </h1>

      <p className="text-gray-700 mb-6">
        Welcome to the Support panel. Here you can view escalated complaints
        and track resolved issues.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Escalated</h3>
          <p className="text-2xl font-bold text-[#37B7C3]">12</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Resolved</h3>
          <p className="text-2xl font-bold text-green-600">48</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">5</p>
        </div>
      </div>
    </div>
  );
}

