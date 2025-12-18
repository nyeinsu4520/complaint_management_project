export default function SupportResolved() {
  const resolvedComplaints = [
    {
      id: 301,
      title: "VPN Connection Issue",
      resolvedAt: "2025-01-16",
      severity: "HIGH",
    },
    {
      id: 302,
      title: "Printer Not Working",
      resolvedAt: "2025-01-17",
      severity: "LOW",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-[#071952]">
          Resolved Complaints
        </h2>
        <p className="text-gray-600">
          Complaints successfully resolved by Support
        </p>
      </div>

      {/* List */}
      <div className="bg-white rounded-lg shadow divide-y">
        {resolvedComplaints.map((c) => (
          <div
            key={c.id}
            className="p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">
                Complaint #{c.id}
              </h3>

              <p className="text-sm text-gray-600">
                {c.title}
              </p>

              <div className="flex gap-3 mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
                  RESOLVED
                </span>

                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                  {c.severity}
                </span>

                <span className="text-xs text-gray-500">
                  Resolved on {c.resolvedAt}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
