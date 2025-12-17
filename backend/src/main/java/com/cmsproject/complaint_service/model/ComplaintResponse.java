package com.cmsproject.complaint_service.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
public class ComplaintResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long complaintId;
    private Long staffUserId; // optional: who replied
    @Column(columnDefinition = "TEXT")
    private String message;

    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());

    // getters / setters
    
}
