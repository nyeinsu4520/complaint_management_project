package com.cmsproject.complaint_service.controller;

import com.cmsproject.complaint_service.dto.ComplaintResponseDTO;
import com.cmsproject.complaint_service.model.Complaint;
import com.cmsproject.complaint_service.service.ComplaintService;
import com.cmsproject.complaint_service.service.ComplaintResponseService;
import com.cmsproject.complaint_service.dto.ReplyRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


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
                "HELPDESK_AGENT",
                request.getMessage()
            );
        }
        

        return ResponseEntity.ok(
            complaintService.resolveByHelpdesk(id, helpdeskId)
        );
    }


    // Helpdesk escalates to support
    @PutMapping("/{id}/escalate")
    public ResponseEntity<Complaint> escalate(@PathVariable Long id) {
        return ResponseEntity.ok(
            complaintService.escalateComplaint(id)
        );
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

    @GetMapping("/assigned/{handlerId}")
    public List<Complaint> getAssignedComplaints(@PathVariable Long handlerId) {
        return complaintService.getComplaintsAssignedTo(handlerId);
    }

    @GetMapping("/new")
    public ResponseEntity<List<Complaint>> getNewComplaints() {
        return ResponseEntity.ok(complaintService.getNewComplaints());
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
