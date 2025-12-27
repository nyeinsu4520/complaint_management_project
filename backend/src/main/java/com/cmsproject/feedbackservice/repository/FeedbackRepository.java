package com.cmsproject.feedbackservice.repository;

import com.cmsproject.feedbackservice.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
