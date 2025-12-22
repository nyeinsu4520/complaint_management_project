import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getComplaintById,
  getRepliesByComplaint,
  addReply,
  resolveComplaint,
  escalateComplaint,
} from "../../api/complaintApi";

export default function HelpDeskComplaint() {
  const { id } = useParams(); // complaintId from route
  const [complaint, setComplaint] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");

  // Load complaint info
  useEffect(() => {
    getComplaintById(id)
      .then((res) => setComplaint(res.data))
      .catch((err) => console.error(err));
    
    getRepliesByComplaint(id)
      .then((res) => setReplies(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Send a reply
 const handleSendReply = () => {
  if (!replyMessage.trim()) return;

  const staffUserId = 5; // Replace with logged-in helpdesk user ID
  const staffRole = "HELP_DESK"; // Hardcoded or from user context

  const data = {
    staffUserId,
    staffRole,
    message: replyMessage
  };

  addReply(id, data)
    .then((res) => {
      setReplies((prev) => [...prev, res.data]);
      setReplyMessage("");
    })
    .catch(() => alert("Failed to send reply"));
};



  // Resolve complaint
  const handleResolve = () => {
    resolveComplaint(id, { userId: complaint.handledBy })
      .then((res) => setComplaint(res.data))
      .catch(() => alert("Failed to resolve"));
  };

  // Escalate complaint
  const handleEscalate = () => {
    escalateComplaint(id, { reason: "Escalated by helpdesk" })
      .then((res) => setComplaint(res.data))
      .catch(() => alert("Failed to escalate"));
  };

  if (!complaint) return <p>Loading complaint...</p>;

  const formatDate = (dt) => new Date(dt).toLocaleString();

  return (
    <div className="space-y-6">

      {/* Complaint Info */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-xl font-bold text-[#071952]">
          Complaint #{complaint.complaintId}
        </h2>
        <p className="mt-2 text-gray-700">{complaint.details}</p>

        <div className="flex gap-4 mt-4">
          <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-700">
            {complaint.status}
          </span>

          <span className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-600">
            {complaint.severity}
          </span>

          <span className="text-sm text-gray-500">
            Created: {formatDate(complaint.createdAt)}
          </span>
        </div>
      </div>

      {/* Conversation */}
      <div className="bg-white p-5 rounded-lg shadow space-y-4">
        <h3 className="font-semibold text-lg">Conversation</h3>
        {replies.map((r) => (
          <div
            key={r.id}
            className={`p-4 rounded-lg max-w-[80%] ${
              r.authorRole === "HELPDESK" ? "bg-blue-50 ml-auto" : "bg-gray-100"
            }`}
          >
            <p className="text-gray-800">{r.message}</p>
            <span className="text-xs text-gray-500 block mt-1">
              {r.authorRole} • {formatDate(r.createdAt)}
            </span>
          </div>
        ))}
      </div>

      {/* Reply Box */}
      <div className="bg-white p-5 rounded-lg shadow space-y-4">
        <h3 className="font-semibold">Reply to Complaint</h3>

        <textarea
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#37B7C3]"
          rows="4"
          placeholder="Type your reply here..."
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            className="bg-[#37B7C3] text-white px-5 py-2 rounded-lg hover:bg-[#2faab6]"
            onClick={handleSendReply}
          >
            Send Reply
          </button>

          <button
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            onClick={handleResolve}
          >
            Resolve
          </button>

          <button
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
            onClick={handleEscalate}
          >
            Escalate
          </button>
        </div>
      </div>
    </div>
  );
}
