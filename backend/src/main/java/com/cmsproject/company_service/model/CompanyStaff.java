package com.cmsproject.company_service.model;

import com.cmsproject.shared.enums.StaffRole;

import jakarta.persistence.*;

@Entity
@Table(name = "company_staff")
public class CompanyStaff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;      // from user service
    private Long companyId;   // belongs to company service

    @Enumerated(EnumType.STRING)
    private StaffRole role;        // HELP_DESK or SUPPORT

    // getters/setters
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public long getuserId() { return userId; }
    public void setuserId(long userId) { this.userId = userId; }

    public long getcompanyId() { return companyId; }
    public void setcompanyId(long companyId) { this.companyId = companyId; }

    public StaffRole getRole() {
        return role;
    }

    public void setRole(StaffRole role) {
        this.role = role;
    }
}
