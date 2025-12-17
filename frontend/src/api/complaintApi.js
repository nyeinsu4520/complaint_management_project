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
