package com.cmsproject.user_service.dto;
import com.cmsproject.user_service.model.Role;
import jakarta.validation.constraints.*;

public class InternalUserRegistrationRequest {
    @Email
    @NotNull(message = "Email is required")
    private String email;
    
    @NotBlank(message = "Username is required")
    private String username;
    
    private String phoneNumber;
    
    @NotBlank(message = "Password is required")
    @Size(min=10, message = "Password must be at least 10 characters long")
    private String password;
    
    private String address;

    @NotNull(message = "Role is required")
    private Role role;
    
    private Long companyId;


    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

}
