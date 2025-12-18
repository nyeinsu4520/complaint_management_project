export default function HelpDeskComplaint() {
  // 🔹 Fake complaint data (design only)
  const complaint = {
    id: 301,
    details: "User cannot connect to the company VPN from home.",
    status: "IN_PROGRESS",
    severity: "HIGH",
    createdAt: "2025-01-14",
  };

  // 🔹 Fake conversation (design only)
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
  ];

  return (
    <div className="space-y-6">

      {/* Complaint Info */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-xl font-bold text-[#071952]">
          Complaint #{complaint.id}
        </h2>

        <p className="mt-2 text-gray-700">
          {complaint.details}
        </p>

        <div className="flex gap-4 mt-4">
          <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-700">
            {complaint.status}
          </span>

          <span className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-600">
            {complaint.severity}
          </span>

          <span className="text-sm text-gray-500">
            Created: {complaint.createdAt}
          </span>
        </div>
      </div>

      {/* Conversation */}
      <div className="bg-white p-5 rounded-lg shadow space-y-4">
        <h3 className="font-semibold text-lg">
          Conversation
        </h3>

        {replies.map((r) => (
          <div
            key={r.id}
            className={`p-4 rounded-lg max-w-[80%]
              ${
                r.authorRole === "HELPDESK"
                  ? "bg-blue-50 ml-auto"
                  : "bg-gray-100"
              }
            `}
          >
            <p className="text-gray-800">{r.message}</p>
            <span className="text-xs text-gray-500 block mt-1">
              {r.authorRole} • {r.createdAt}
            </span>
          </div>
        ))}
      </div>

      {/* Reply Box */}
      <div className="bg-white p-5 rounded-lg shadow space-y-4">
        <h3 className="font-semibold">
          Reply to Complaint
        </h3>

        <textarea
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#37B7C3]"
          rows="4"
          placeholder="Type your reply here..."
        />

        <div className="flex gap-3">
          <button
            className="bg-[#37B7C3] text-white px-5 py-2 rounded-lg hover:bg-[#2faab6]"
          >
            Send Reply
          </button>

          <button
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Resolve
          </button>

          <button
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
          >
            Escalate
          </button>
        </div>
      </div>

    </div>
  );
}
