import api from "./api";

export const submitComplaint = (payload) =>
    api.post("/complaints/register", payload);

export const getUserComplaints = (userId) =>
    api.get(`/complaints/user/${userId}`);

export const getNewComplaints = () => api.get("/complaints/new");
export const getAssignedTo = (userId) => api.get(`/complaints/assigned/${userId}`);
export const escalateComplaint = (id, body) => api.post(`/complaints/${id}/escalate`, body);
export const resolveComplaint = (id, body) => api.post(`/complaints/${id}/resolve`, body);
export const getAllComplaints = () => api.get("/complaints");
export const getComplaintsByCompany = (companyId) =>
  api.get(`/complaints/company/${companyId}`);

export const getComplaintById = (id) =>
  api.get(`/api/complaints/${id}`);

export const getRepliesByComplaint = (id) =>
  api.get(`/complaints/${id}/replies`);

export const addReply = (data) =>
  api.post(`/complaints/${data.complaintId}/replies`, data);