package com.cmsproject.complaint_service.dto;

import java.time.LocalDateTime;
import com.cmsproject.complaint_service.model.Severity;

public class ComplaintResponseDTO {

    private Long complaintId;
    private Long userId;
    private Long companyId;
    private String companyName;
    private String details;
    private Severity severity;
    private String status;
    private LocalDateTime createdAt;

    public ComplaintResponseDTO() {
    }

    public ComplaintResponseDTO(Long complaintId, Long userId, Long companyId, String companyName,
                                String details, Severity severity, String status, LocalDateTime createdAt) {
        this.complaintId = complaintId;
        this.userId = userId;
        this.companyId = companyId;
        this.companyName = companyName;
        this.details = details;
        this.severity = severity;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Long complaintId) {
        this.complaintId = complaintId;
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

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Severity getSeverity() {
        return severity;
    }

    public void setSeverity(Severity severity) {
        this.severity = severity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "ComplaintResponseDTO{" +
                "complaintId=" + complaintId +
                ", userId=" + userId +
                ", companyId=" + companyId +
                ", companyName='" + companyName + '\'' +
                ", details='" + details + '\'' +
                ", severity=" + severity +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
