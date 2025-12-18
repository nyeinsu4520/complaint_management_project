export default function AdminDashboard() {
  return (
    <div className="space-y-6">

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-[#071952]">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold text-[#37B7C3]">128</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Complaints</h3>
          <p className="text-2xl font-bold text-[#37B7C3]">56</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Open Complaints</h3>
          <p className="text-2xl font-bold text-yellow-600">12</p>
        </div>

      </div>

      {/* Secondary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Resolved Complaints</h3>
          <p className="text-2xl font-bold text-green-600">44</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Reports</h3>
          <p className="text-gray-600">
            System reports and analytics overview
          </p>
        </div>

      </div>

    </div>
  );
}
