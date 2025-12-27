import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComplaintById, getRepliesByComplaint, addReply, submitFeedback } from "../../api/complaintApi";
import Header from "../../components/Header";

export default function ReplyPage() {
  const { id } = useParams(); // complaint ID from URL
  const [complaint, setComplaint] = useState(null);
  const [replies, setReplies] = useState([]);
  const [message, setMessage] = useState("");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 5, comment: "" });

  const user = JSON.parse(localStorage.getItem("user"));

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
    if (!user?.id || !user?.role) return alert("User info missing!");

    try {
      await addReply(id, {
        authorId: user.id,
        authorRole: "CONSUMER",
        message: message.trim(),
      });

      const res = await getRepliesByComplaint(id);
      setReplies(res.data);
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.comment.trim()) return alert("Please enter feedback!");
    if (feedback.rating < 1 || feedback.rating > 5) {
    return alert("Rating must be between 1 and 5");
  }
    try {
      await submitFeedback(id, {
        userId: user.id,
        rating: feedback.rating,
        comment: feedback.comment,
      });

      alert("Feedback submitted successfully!");
      setIsFeedbackOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback.");
    }
  };

  if (!complaint) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Reply to Complaint" />

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
            .filter((r) => ["CONSUMER", "HELPDESK_AGENT", "SUPPORT"].includes(r.authorRole))
            .map((r) => (
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

        {/* Reply Box */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-lg font-semibold">Reply to Complaint Management Team</h3>
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
          <div className="flex gap-3">
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

            {complaint.status === "CLOSED" && (
              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="px-5 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700"
              >
                Give Feedback
              </button>
            )}
          </div>
        </div>

        {/* Feedback Modal */}
        {isFeedbackOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Submit Feedback</h3>
              <label className="block mb-2">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={feedback.rating}
                onChange={(e) => setFeedback({ ...feedback, rating: Number(e.target.value) })}
                className="w-full border rounded p-2 mb-4"
              />
              <label className="block mb-2">Comment</label>
              <textarea
                rows="4"
                value={feedback.comment}
                onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                className="w-full border rounded p-2 mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsFeedbackOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFeedbackSubmit}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
