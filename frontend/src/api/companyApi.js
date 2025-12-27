import api from "./api";

export const getCompanies = () =>
    api.get("/companies");

export const getCompanyUsers = (companyId) => 
    api.get(`/companies/${companyId}/users`);

export const addCompany = (companyData) => api.post("/companies", companyData);