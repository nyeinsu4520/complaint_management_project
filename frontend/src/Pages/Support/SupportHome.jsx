import { useEffect, useState } from "react";
import { getSupportSummary } from "../../api/complaintApi";

export default function SupportHome() {
  const [summary, setSummary] = useState({
    ESCALATED: 0,
    RESOLVED: 0,
    PENDING: 0,
  });

  useEffect(() => {
    getSupportSummary()
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Failed to load summary", err));
  }, []);

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
        {/* Escalated */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Escalated</h3>
          <p className="text-2xl font-bold text-red-600">
            {summary.ESCALATED}
          </p>
        </div>

        {/* Resolved */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Resolved</h3>
          <p className="text-2xl font-bold text-green-600">
            {summary.RESOLVED}
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {summary.PENDING}
          </p>
        </div>
      </div>
    </div>
  );
}
