import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComplaintById, getRepliesByComplaint, addReply ,closeComplaint} from "../../api/complaintApi";
import Header from "../../components/Header";

export default function SupportReplyPage() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [replies, setReplies] = useState([]);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

    const canClose =
    user?.role === "SUPPORT" &&
    complaint?.status === "ESCALATED";

  useEffect(() => {
    getComplaintById(id)
      .then((res) => setComplaint(res.data))
      .catch((err) => console.error("Error fetching complaint:", err));

    getRepliesByComplaint(id)
      .then((res) => setReplies(res.data))
      .catch((err) => console.error("Error fetching replies:", err));
  }, [id]);

  const handleReply = async () => {
    if (!message.trim()) return;

    if (!user?.id || user.role !== "SUPPORT") {
      alert("Support user info missing! Please log in.");
      return;
    }

    try {
      await addReply(id, {
        authorId: user.id,
        authorRole: "SUPPORT",
        message: message.trim(),
      });

      // refresh replies
      const res = await getRepliesByComplaint(id);
      setReplies(res.data);
      setMessage("");
    } catch (err) {
      console.error("Error sending reply:", err);
    }
  };

   const handleCloseComplaint = () => {
    if (!user?.id) {
      alert("User info missing!");
      return;
    }

    closeComplaint(id, user.id)
      .then((res) => setComplaint(res.data))
      .catch(() => alert("Failed to close complaint"));
  };

  if (!complaint) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">


      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Complaint Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-[#071952]">
            Complaint #{complaint.id}
          </h2>
          <p className="mt-2 text-gray-700">{complaint.details}</p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              {complaint.status}
            </span>
            <span className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-600">
              {complaint.severity}
            </span>
            <span className="text-sm text-gray-500">
              Created on {new Date(complaint.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Replies */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-lg font-semibold">Messages</h3>
          {replies
            .filter(r => ["CONSUMER", "HELPDESK_AGENT", "SUPPORT"].includes(r.authorRole))
            .map(r => (
              <div
                key={r.id}
                className={`p-4 rounded-lg max-w-[80%] ${
                  r.authorRole === "CONSUMER" ? "bg-gray-100 ml-auto" : "bg-blue-50"
                }`}
              >
                <p className="text-gray-800">{r.message}</p>
                <span className="text-xs text-gray-500 block mt-1">
                  {r.authorRole} • {new Date(r.createdAt).toLocaleString()}
                </span>
              </div>
          ))}
        </div>

        {/* Reply Box for Support */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-lg font-semibold">Reply to Consumer / Helpdesk</h3>
          <textarea
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#37B7C3]"
            rows="4"
            placeholder={
              complaint.status === "CLOSED"
                ? "This complaint is closed. You cannot reply."
                : "Type your reply..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={complaint.status === "CLOSED"}
          />
          <div className="flex flex-wrap gap-4 mt-2">
            <button
            onClick={handleReply}
            disabled={complaint.status === "CLOSED"}
            className={`px-5 py-2 rounded-lg text-white ${
                complaint.status === "CLOSED"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#37B7C3] hover:bg-[#2faab6]"
            }`}
            >
            Send Reply
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
    </div>
  );
}
