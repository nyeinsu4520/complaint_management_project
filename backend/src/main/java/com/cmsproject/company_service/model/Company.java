package com.cmsproject.company_service.model;


import jakarta.persistence.*;


@Entity
public class Company {

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(unique = true)
    private String domain; // Optional: for corporate email/domain mapping

    private String contactEmail;

    private String contactNumber; // Optional, can store support phone

    private String supportHours; // Optional, e.g., "Mon-Fri 9:00-18:00"

    private String tenantConfig; 
    // JSON string for flexible configurations like:
    // {"extensionTimeDays": 2, "chatbotEnabled": true, "dataRetentionDays": 30}

    private boolean active = true; // company status: active/disabled

    // --- Getters and setters ---
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getSupportHours() { return supportHours; }
    public void setSupportHours(String supportHours) { this.supportHours = supportHours; }

    public String getTenantConfig() { return tenantConfig; }
    public void setTenantConfig(String tenantConfig) { this.tenantConfig = tenantConfig; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}

