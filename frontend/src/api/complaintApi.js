import api from "./api";

export const submitComplaint = (payload) =>
    api.post("/complaints/register", payload);

export const getUserComplaints = (userId) =>
    api.get(`/complaints/user/${userId}`);

export const getNewComplaints = (companyId) => api.get(`/complaints/new/${companyId}`);

export const getAssignedTo = (userId) =>
  api.get(`/complaints/my/${userId}`);

export const escalateComplaint = (id, body) => api.post(`/complaints/${id}/escalate`, body);

export const getSupportSummary = () =>
  api.get("/complaints/support/summary");

export const getAllComplaints = () => api.get("/complaints");

export const getComplaintsByCompany = (companyId) =>
  api.get(`/complaints/company/${companyId}`);

export const getComplaintById = (id) =>
  api.get(`/complaints/${id}`);

export const getRepliesByComplaint = (id) =>
  api.get(`/complaints/${id}/replies`);


export const handleComplaint = (id, helpdeskId) =>
  api.put(`/complaints/${id}/handle/${helpdeskId}`);

export const addReply = (complaintId, data) =>
  api.post(`/complaints/${complaintId}/replies`, data);

export const resolveComplaint = (complaintId, helpdeskId, message) =>
  api.put(
    `/complaints/${complaintId}/resolve/helpdesk/${helpdeskId}`,
    message ? { message } : null
  );

  export const closeComplaint = (complaintId, userId) =>
  api.put(`/complaints/${complaintId}/close/${userId}`);

export const submitFeedback = (complaintId, feedbackData) => {
  return api.post(`/feedback/${complaintId}/feedback`, feedbackData);
};

