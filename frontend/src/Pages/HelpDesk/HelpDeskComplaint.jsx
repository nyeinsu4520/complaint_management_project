import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getComplaintById,
  getRepliesByComplaint,
  addReply,
  resolveComplaint,
  escalateComplaint,
  closeComplaint, 
} from "../../api/complaintApi";

export default function HelpDeskComplaint() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user")); 

  // Load complaint info
  useEffect(() => {
    getComplaintById(id)
      .then((res) => setComplaint(res.data))
      .catch((err) => console.error(err));
    
    getRepliesByComplaint(id)
      .then((res) => setReplies(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Determine permissions based on status
  const canReply = complaint?.status === "HANDLED";
  const canResolve = complaint?.status === "HANDLED";
  const canClose = complaint?.status === "RESOLVED";

  const formatDate = (dt) => new Date(dt).toLocaleString();

  // Handle sending reply
  const handleSendReply = () => {
    if (!replyMessage.trim()) return;
    if (!user?.id || !user?.role) {
      alert("User info missing!");
      return;
    }

    const data = {
      staffUserId: user.id,
      staffRole: user.role,
      message: replyMessage,
    };

    addReply(id, data)
      .then((res) => {
        setReplies((prev) => [...prev, res.data]);
        setReplyMessage("");
      })
      .catch(() => alert("Failed to send reply"));
  };

  // Handle resolve
  const handleResolve = () => {
    if (!user?.id) {
      alert("User info missing!");
      return;
    }

    resolveComplaint(id, user.id, "Complaint resolved by helpdesk")
      .then((res) => setComplaint(res.data))
      .catch(() => alert("Failed to resolve"));
  };

  // Handle escalate
  const handleEscalate = () => {
    escalateComplaint(id, { reason: "Escalated by helpdesk" })
      .then((res) => setComplaint(res.data))
      .catch(() => alert("Failed to escalate"));
  };

  // Handle close complaint
  const handleCloseComplaint = () => {
    if (!user?.id) {
      alert("User info missing!");
      return;
    }

    closeComplaint(id, user.id)
      .then((res) => setComplaint(res.data))
      .catch(() => alert("Failed to close complaint"));
  };

  if (!complaint) return <p>Loading complaint...</p>;

  return (
    <div className="space-y-6">

      {/* Complaint Info */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-xl font-bold text-[#071952]">
          Complaint {complaint.complaintId}
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
          disabled={!canReply}
          className={`w-full border rounded-lg p-3 ${
            !canReply ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          rows="4"
          placeholder={
            canReply
              ? "Type your reply here..."
              : "Complaint resolved. Replies are disabled."
          }
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            disabled={!canReply}
            className={`px-5 py-2 rounded-lg text-white ${
              canReply ? "bg-[#37B7C3] hover:bg-[#2faab6]" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSendReply}
          >
            Send Reply
          </button>

          <button
            disabled={!canResolve}
            className={`px-5 py-2 rounded-lg text-white ${
              canResolve ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
            }`}
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

          <button
            disabled={!canClose}
            onClick={handleCloseComplaint}
            className={`px-5 py-2 rounded-lg text-white ${
              canClose ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Close Complaint
          </button>
        </div>
      </div>
    </div>
  );
}
