package com.cmsproject.complaint_service.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long complaintId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String details;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Severity severity;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ComplaintStatus status;
    
    @Column(name = "handled_by")
    private Long handledBy;
    
    @Column(name = "resolved_by")
    private Long resolvedBy;

    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(length = 500)
    private String escalationReason;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (severity == null) severity = Severity.LOW;
    }

    public Long getId() { return complaintId; }
    public void setId(Long complaintId) { this.complaintId = complaintId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public Severity getSeverity() { return severity; }
    public void setSeverity(Severity severity) { this.severity = severity; }

    public ComplaintStatus getStatus() { 
    return status; 
    }

    public void setStatus(ComplaintStatus status) { 
        this.status = status; 
    }

    public Long getHandledBy() { return handledBy; }
    public void setHandledBy(Long handledBy) { this.handledBy = handledBy; }

    public Long getResolvedBy() { return resolvedBy; }
    public void setResolvedBy(Long resolvedBy) { this.resolvedBy = resolvedBy; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getEscalationReason() {
    return escalationReason;
    }

    public void setEscalationReason(String escalationReason) {
        this.escalationReason = escalationReason;
    }
}
