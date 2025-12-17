package com.cmsproject.complaint_service.service;

import com.cmsproject.complaint_service.dto.ComplaintResponseDTO;
import com.cmsproject.complaint_service.model.Complaint;
import com.cmsproject.complaint_service.model.ComplaintResponse;
import com.cmsproject.complaint_service.model.Severity;
import java.util.List;

public interface ComplaintService {
    Complaint createComplaint(Complaint complaint);

    Complaint updateStatus(Long id, String status);

    Complaint assignHandler(Long id, Long handledBy);

    // Complaint resolveComplaint(Long id, Long resolverUserId); 
    // ComplaintResponse replyToComplaint(Long complaintId, Long staffUserId, String message);

    public List<ComplaintResponseDTO> getComplaintsByUser(Long userId);

    List<Complaint> getComplaintsByCompany(Long companyId);

    Complaint getComplaintById(Long complaintId);

    public List<Complaint> getAllComplaints();
   
}
