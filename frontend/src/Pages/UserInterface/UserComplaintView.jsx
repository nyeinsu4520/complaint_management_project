export default function UserComplaintView() {
  // 🔹 Fake complaint data (design only)
  const complaint = {
    id: 401,
    title: "Unable to access company email",
    details: "I am unable to log into my email since this morning.",
    status: "IN_PROGRESS",
    severity: "HIGH",
    createdAt: "2025-01-13",
  };

  // 🔹 Fake conversation (design only)
  const replies = [
    {
      id: 1,
      message: "We have received your complaint and are investigating.",
      authorRole: "HELPDESK",
      createdAt: "2025-01-13 09:15",
    },
    {
      id: 2,
      message: "Please try resetting your password and let us know.",
      authorRole: "HELPDESK",
      createdAt: "2025-01-13 10:40",
    },
    {
      id: 3,
      message: "Issue has been resolved. You should be able to log in now.",
      authorRole: "SUPPORT",
      createdAt: "2025-01-13 12:20",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Complaint Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-[#071952]">
          Complaint #{complaint.id}
        </h2>

        <p className="mt-2 text-gray-700">
          {complaint.details}
        </p>

        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
            {complaint.status}
          </span>

          <span className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-600">
            {complaint.severity}
          </span>

          <span className="text-sm text-gray-500">
            Created on {complaint.createdAt}
          </span>
        </div>
      </div>

      {/* Conversation */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-semibold">
          Messages
        </h3>

        {replies.map((r) => (
          <div
            key={r.id}
            className="p-4 rounded-lg bg-gray-50"
          >
            <p className="text-gray-800">
              {r.message}
            </p>

            <span className="text-xs text-gray-500 block mt-1">
              {r.authorRole} • {r.createdAt}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
