package com.cmsproject.complaint_service.service;

import com.cmsproject.complaint_service.dto.ComplaintResponseDTO;
import com.cmsproject.complaint_service.model.Complaint;
import com.cmsproject.complaint_service.model.ComplaintResponse;
import com.cmsproject.complaint_service.model.ComplaintStatus;
import com.cmsproject.complaint_service.model.Severity;
import java.util.List;

public interface ComplaintService {
    Complaint createComplaint(Complaint complaint);

    Complaint updateStatus(Long id, String status);

    Complaint assignHandler(Long id, Long handledBy);

    public List<ComplaintResponseDTO> getComplaintsByUser(Long userId);

    List<Complaint> getComplaintsByCompany(Long companyId);

    Complaint getComplaintById(Long complaintId);

    public List<Complaint> getAllComplaints();
    
    Complaint resolveByHelpdesk(Long id, Long helpdeskId);

    Complaint escalateComplaint(Long complaintId, String reason);

    public List<Complaint> getMyComplaints(Long helpdeskId); 

    Complaint closeComplaint(Long id, Long userId);

    public Complaint handleComplaint(Long id, Long helpdeskId);

     public List<Complaint> getNewComplaintsForHelpdesk(Long helpdeskId);

     long countByStatus(ComplaintStatus status);
}
