import api from "./api";

export const login = (payload) => 
    api.post("/users/auth/login", payload);

