package com.cmsproject.user_service.dto;
import jakarta.validation.constraints.*;
public class LoginRequest {
    @Email
    @NotNull (message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min=10, message = "Password must be at least 10 characters long")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
