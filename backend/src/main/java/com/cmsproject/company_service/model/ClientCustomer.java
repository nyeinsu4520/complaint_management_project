package com.cmsproject.company_service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "client_customers", uniqueConstraints = @UniqueConstraint(columnNames = { "company_id", "email" }))
public class ClientCustomer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(nullable = false)
    private String email;

    private String company_name;

    // Constructors
    public ClientCustomer() {
    }

    public ClientCustomer(Long companyId, String email, String name) {
        this.companyId = companyId;
        this.email = email;
        this.company_name = name;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return company_name;
    }

    public void setName(String name) {
        this.company_name = name;
    }

    // toString()
    @Override
    public String toString() {
        return "ClientCustomer{" +
                "id=" + id +
                ", companyId=" + companyId +
                ", email='" + email + '\'' +
                ", name='" + company_name + '\'' +
                '}';
    }
}
