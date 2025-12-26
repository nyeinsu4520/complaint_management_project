package com.cmsproject.complaint_service.controller;

import com.cmsproject.complaint_service.dto.ComplaintResponseDTO;
import com.cmsproject.complaint_service.model.AuthorRole;
import com.cmsproject.complaint_service.model.Complaint;
import com.cmsproject.complaint_service.model.ComplaintStatus;
import com.cmsproject.complaint_service.service.ComplaintService;
import com.cmsproject.complaint_service.service.ComplaintResponseService;
import com.cmsproject.complaint_service.dto.ReplyRequest;
import com.cmsproject.complaint_service.dto.EscalateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {
    private final ComplaintService complaintService;
    private final ComplaintResponseService responseService; // field

    // Constructor
    public ComplaintController(
            ComplaintService complaintService,
            ComplaintResponseService responseService
    ) {
        this.complaintService = complaintService;
        this.responseService = responseService;
    }

    @PutMapping("/{id}/handle/{helpdeskId}")
    public Complaint handleComplaint(
            @PathVariable Long id,
            @PathVariable Long helpdeskId
    ) {
        return complaintService.handleComplaint(id, helpdeskId);
    }


    @GetMapping("/my/{helpdeskId}")
    public List<Complaint> getMyComplaints(@PathVariable Long helpdeskId) {
        return complaintService.getMyComplaints(helpdeskId);
    }




    @PostMapping("/register")
    public ResponseEntity<Complaint> registerComplaint(@RequestBody Complaint complaint) {
        Complaint savedComplaint = complaintService.createComplaint(complaint);
        return ResponseEntity.ok(savedComplaint);
    }

    

    // Helpdesk resolves
   @PutMapping("/{id}/resolve/helpdesk/{helpdeskId}")
    public ResponseEntity<Complaint> resolveByHelpdesk(
            @PathVariable Long id,
            @PathVariable Long helpdeskId,
            @RequestBody(required = false) ReplyRequest request
    ) {
        if (request != null && request.getMessage() != null) {
            responseService.addReply(
                id,
                helpdeskId,
                AuthorRole.HELPDESK_AGENT,
                request.getMessage()
            );
        }
        

        return ResponseEntity.ok(
            complaintService.resolveByHelpdesk(id, helpdeskId)
        );
    }


    @GetMapping("/support/summary")
    public Map<String, Long> getSupportSummary() {
        Map<String, Long> summary = new HashMap<>();
        summary.put("ESCALATED", complaintService.countByStatus(ComplaintStatus.ESCALATED));
        summary.put("RESOLVED", complaintService.countByStatus(ComplaintStatus.RESOLVED));
        summary.put("PENDING", complaintService.countByStatus(ComplaintStatus.PENDING));
        return summary;
    }


   @PostMapping("/{id}/escalate")
    public ResponseEntity<Complaint> escalateComplaint(
            @PathVariable Long id,
            @RequestBody EscalateRequest request
    ) {
        Complaint updated = complaintService.escalateComplaint(id, request.getReason());
        return ResponseEntity.ok(updated);
    }
   


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

    

    @GetMapping("/new/{companyId}")
    public ResponseEntity<List<Complaint>> getNewComplaints(@PathVariable Long companyId) {
        List<Complaint> complaints = complaintService.getNewComplaintsForHelpdesk(companyId);
        return ResponseEntity.ok(complaints);
    }



    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

   @PutMapping("/{id}/close/{userId}")
    public ResponseEntity<Complaint> closeComplaint(@PathVariable Long id, @PathVariable Long userId) {
        return ResponseEntity.ok(complaintService.closeComplaint(id, userId));
    }


}
