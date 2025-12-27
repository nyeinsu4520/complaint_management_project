package com.cmsproject.feedbackservice.service;
import org.springframework.stereotype.Service;
import com.cmsproject.feedbackservice.repository.*;
import com.cmsproject.feedbackservice.model.*;
import org.springframework.transaction.annotation.Transactional;


@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Transactional
    public Feedback submitFeedback(Long complaintId, Long userId, int rating, String comment) {
        // You no longer check complaint status here!
        // The controller or another service should ensure the complaint is closed

        Feedback feedback = new Feedback();
        feedback.setComplaintId(complaintId);
        feedback.setUserId(userId);
        feedback.setRating(rating);
        feedback.setComment(comment);

        return feedbackRepository.save(feedback);
    }
}
