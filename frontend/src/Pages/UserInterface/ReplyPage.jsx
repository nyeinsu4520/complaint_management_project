export default function UserComplaintView() {
  const complaint = {
    id: 301,
    title: "VPN Connection Issue",
    details: "I cannot connect to the company VPN from home.",
    status: "IN_PROGRESS",
    severity: "HIGH",
    createdAt: "2025-01-14",
  };

  const replies = [
    {
      id: 1,
      message: "We are looking into this issue.",
      authorRole: "HELPDESK",
      createdAt: "2025-01-14 10:30",
    },
    {
      id: 2,
      message: "The issue still persists after restarting.",
      authorRole: "USER",
      createdAt: "2025-01-14 11:00",
    },
    {
      id: 3,
      message: "Please try reconnecting after updating your VPN client.",
      authorRole: "SUPPORT",
      createdAt: "2025-01-14 12:15",
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
        <h3 className="text-lg font-semibold">Messages</h3>

        {replies.map((r) => (
          <div
            key={r.id}
            className={`p-4 rounded-lg max-w-[80%] ${
              r.authorRole === "USER"
                ? "bg-gray-100 ml-auto"
                : "bg-blue-50"
            }`}
          >
            <p className="text-gray-800">{r.message}</p>

            <span className="text-xs text-gray-500 block mt-1">
              {r.authorRole} • {r.createdAt}
            </span>
          </div>
        ))}
      </div>

      {/* ✅ User Reply Box (NOW VISIBLE) */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-semibold">
          Reply to Support Team
        </h3>

        <textarea
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#37B7C3]"
          rows="4"
          placeholder="Reply to the help desk or provide additional information about your issue..."
        />

        <button
          className="bg-[#37B7C3] text-white px-5 py-2 rounded-lg hover:bg-[#2faab6]"
        >
          Send Reply
        </button>
      </div>

    </div>
  );
}
