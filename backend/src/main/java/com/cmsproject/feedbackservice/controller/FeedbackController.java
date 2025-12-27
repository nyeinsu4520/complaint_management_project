package com.cmsproject.feedbackservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cmsproject.feedbackservice.service.FeedbackService;
import com.cmsproject.feedbackservice.model.Feedback;

@RestController
@RequiredArgsConstructor // Lombok will generate the constructor for final fields
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping("/{complaintId}/feedback")
    public ResponseEntity<Feedback> submitFeedback(
            @PathVariable Long complaintId,
            @RequestBody Feedback feedback
    ) {
        Feedback savedFeedback = feedbackService.submitFeedback(
                complaintId,
                feedback.getUserId(),
                feedback.getRating(),
                feedback.getComment()
        );
        return ResponseEntity.ok(savedFeedback);
    }
}
