package com.cmsproject.complaint_service.controller;

import com.cmsproject.complaint_service.dto.ComplaintResponseDTO;
import com.cmsproject.complaint_service.model.Complaint;
import com.cmsproject.complaint_service.service.ComplaintService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {
    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    
    @PostMapping("/register")
    public ResponseEntity<Complaint> registerComplaint(@RequestBody Complaint complaint) {
        Complaint savedComplaint = complaintService.createComplaint(complaint);
        return ResponseEntity.ok(savedComplaint);
    }

    @PutMapping("/{id}/assign/{handlerId}")
    public ResponseEntity<Complaint> assignHandler(@PathVariable Long id, @PathVariable Long handlerId) {
        Complaint updated = complaintService.assignHandler(id, handlerId);
        return ResponseEntity.ok(updated);
    }

    // @PutMapping("/{id}/resolve/{resolverId}")
    // public ResponseEntity<Complaint> resolveComplaint(@PathVariable Long id, @PathVariable Long resolverId) {
    //     Complaint updated = complaintService.resolveComplaint(id, resolverId);
    //     return ResponseEntity.ok(updated);
    // }

    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<Complaint> updateStatus(
            @PathVariable Long id,
            @PathVariable String status
    ) {
        return ResponseEntity.ok(complaintService.updateStatus(id, status));
    }


    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaintById(@PathVariable Long id){
        Complaint complaint = complaintService.getComplaintById(id);
        return ResponseEntity.ok(complaint);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ComplaintResponseDTO>> getComplaintsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(complaintService.getComplaintsByUser(userId));
    }


    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<Complaint>> getComplaintsByCompany(@PathVariable Long companyId) {
        List<Complaint> complaints = complaintService.getComplaintsByCompany(companyId);
        return ResponseEntity.ok(complaints);
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

}
