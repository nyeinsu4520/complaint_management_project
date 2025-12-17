package com.cmsproject.user_service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_client_link")
public class UserClientLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(nullable = false)
    private boolean verified = false;


    public UserClientLink() {}

    public UserClientLink(Long userId, Long companyId, boolean verified) {
        this.userId = userId;
        this.companyId = companyId;
        this.verified = verified;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    // toString()
    @Override
    public String toString() {
        return "UserClientLink{" +
                "id=" + id +
                ", userId=" + userId +
                ", companyId=" + companyId +
                ", verified=" + verified +
                '}';
    }
}
