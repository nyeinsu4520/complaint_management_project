package com.cmsproject.complaint_service.service;

import com.cmsproject.complaint_service.model.AuthorRole;
import com.cmsproject.complaint_service.model.Complaint;
import com.cmsproject.complaint_service.model.ComplaintResponse;
import com.cmsproject.complaint_service.model.ComplaintStatus;
import com.cmsproject.complaint_service.repository.ComplaintRepository;
import com.cmsproject.complaint_service.repository.ComplaintResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintResponseServiceImpl implements ComplaintResponseService {

    private final ComplaintRepository complaintRepository;
    private final ComplaintResponseRepository complaintResponseRepository;

    @Autowired
    public ComplaintResponseServiceImpl(
            ComplaintRepository complaintRepository,
            ComplaintResponseRepository complaintResponseRepository
    ) {
        this.complaintRepository = complaintRepository;
        this.complaintResponseRepository = complaintResponseRepository;
    }

    @Override
    public ComplaintResponse addReply(Long complaintId, Long authorId, AuthorRole authorRole, String message) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        // Only restrict non-consumer replies
        if (authorRole != AuthorRole.CONSUMER &&
    complaint.getStatus() != ComplaintStatus.HANDLED &&
    complaint.getStatus() != ComplaintStatus.ESCALATED) {
            throw new IllegalStateException(
                "Replies are only allowed when the complaint is being handled"
            );
        }

        ComplaintResponse response = new ComplaintResponse();
        response.setComplaint(complaint);
        response.setAuthorId(authorId);
        response.setAuthorRole(authorRole);
        response.setMessage(message);

        return complaintResponseRepository.save(response);
    }



    @Override
    public List<ComplaintResponse> getRepliesByComplaint(Long complaintId) {
        return complaintResponseRepository.findByComplaintId(complaintId);
    }
}
