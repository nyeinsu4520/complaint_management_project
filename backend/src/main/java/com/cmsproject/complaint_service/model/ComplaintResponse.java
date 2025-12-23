package com.cmsproject.complaint_service.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaint_responses")
public class ComplaintResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "complaint_id", nullable = false)
    private Complaint complaint;

    @Column(nullable = false, length = 1000)
    private String message;

    @Column(nullable = false)
    private Long staffUserId;

    @Column(nullable = false)
    private String staffRole; // HELP_DESK or SUPPORT

    private LocalDateTime createdAt = LocalDateTime.now();

    // getters & setters
    // id
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // complaint
    public Complaint getComplaint() { return complaint; }
    public void setComplaint(Complaint complaint) { this.complaint = complaint; }

    // message
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    // staffUserId
    public Long getStaffUserId() { return staffUserId; }
    public void setStaffUserId(Long staffUserId) { this.staffUserId = staffUserId; }

    // staffRole
    public String getStaffRole() { return staffRole; }
    public void setStaffRole(String staffRole) { this.staffRole = staffRole; }

    // createdAt
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

}
