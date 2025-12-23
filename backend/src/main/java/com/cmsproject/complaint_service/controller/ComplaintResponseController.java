package com.cmsproject.complaint_service.controller;

import com.cmsproject.complaint_service.dto.ReplyRequest;
import com.cmsproject.complaint_service.model.Complaint;
import com.cmsproject.complaint_service.model.ComplaintResponse;
import com.cmsproject.complaint_service.service.ComplaintResponseService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintResponseController {

    private final ComplaintResponseService responseService;

    public ComplaintResponseController(ComplaintResponseService responseService) {
        this.responseService = responseService;
    }

    @PostMapping("/{id}/replies")
    public ComplaintResponse addReply(@PathVariable Long id, @RequestBody ReplyRequest request) {
        return responseService.addReply(
                id,
                request.getStaffUserId(),
                request.getStaffRole(),
                request.getMessage()
        );
    }

    @GetMapping("/{id}/replies")
    public List<ComplaintResponse> getReplies(@PathVariable Long id) {
        return responseService.getRepliesByComplaint(id);
    }



}
