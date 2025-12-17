import api from "./api";

export const registerConsumer = (payload) =>
    api.post("/users/register/consumer" , payload);

export const registerInternalUser = (payload) =>
    api.post("/users/register/internal",payload);

export const getAllUsers = () =>
    api.get("/users/all");

export const getUserById = (id) =>
    api.get(`/users/${id}`);

export const getUserCompanies = (userId) =>
    api.get(`/users/${userId}/companies`);

export const assignUserToComplaint = (complaintId, body) => 
    api.post(`/users/assign/${complaintId}`, body);

export const getStaffCompany = (userId) =>
    api.get(`/users/${userId}/staff/company`);
