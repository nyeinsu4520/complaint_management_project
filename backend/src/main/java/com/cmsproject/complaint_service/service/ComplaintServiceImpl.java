package com.cmsproject.complaint_service.service;

import com.cmsproject.complaint_service.model.Complaint;
import com.cmsproject.complaint_service.model.ComplaintStatus;
import com.cmsproject.complaint_service.model.Severity;
import com.cmsproject.complaint_service.repository.ComplaintRepository;
import com.cmsproject.complaint_service.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;

import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    @Autowired
    private CompanyClientService companyClientService;


    public ComplaintServiceImpl(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint createComplaint(Complaint complaint) {
    if (complaint.getStatus() == null) {
        complaint.setStatus(ComplaintStatus.PENDING);
    }
        if (complaint.getSeverity() == null) complaint.setSeverity(Severity.LOW);

        return complaintRepository.save(complaint);
    }

    @Override
    public Complaint updateStatus(Long complaintId, String status) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(ComplaintStatus.valueOf(status.toUpperCase()));
        return complaintRepository.save(complaint);
    }

    @Override
    public Complaint assignHandler(Long complaintId, Long handledBy) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(ComplaintStatus.HANDLED); // <-- FIXED
        complaint.setHandledBy(handledBy);

        return complaintRepository.save(complaint);
    }

    public List<ComplaintResponseDTO> getComplaintsByUser(Long userId) {

        List<Complaint> complaints = complaintRepository.findByUserId(userId);

        return complaints.stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public List<Complaint> getComplaintsByCompany(Long companyId) {
        return complaintRepository.findByCompanyId(companyId);
    }

    @Override
    public Complaint getComplaintById(Long id) {
    return complaintRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));
    }

    @Override
    public Complaint resolveByHelpdesk(Long id, Long helpdeskId) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        if (complaint.getStatus() != ComplaintStatus.HANDLED) {
            throw new IllegalStateException("Only handled complaints can be resolved");
        }

        complaint.setStatus(ComplaintStatus.RESOLVED);
        complaint.setResolvedBy(helpdeskId);

        return complaintRepository.save(complaint);
    }


  


   @Override
    public List<Complaint> getNewComplaintsForHelpdesk(Long companyId) {
        return complaintRepository.findPendingByCompanyId(companyId, ComplaintStatus.PENDING);
    }



    public ComplaintResponseDTO mapToDTO(Complaint complaint) {
    ComplaintResponseDTO dto = new ComplaintResponseDTO();

    dto.setComplaintId(complaint.getId());
    dto.setUserId(complaint.getUserId());
    dto.setCompanyId(complaint.getCompanyId());
    dto.setDetails(complaint.getDetails());
    dto.setSeverity(complaint.getSeverity());
    dto.setStatus(complaint.getStatus().name());
    dto.setCreatedAt(complaint.getCreatedAt());

    try {
        System.out.println("Fetching company: " + complaint.getCompanyId());

        CompanyDTO company = companyClientService.getCompanyById(complaint.getCompanyId());

        System.out.println("RESULT: " + company);

        dto.setCompanyName(company != null ? company.getName() : "Unknown");
    } catch (Exception e) {
        System.out.println("ERROR while calling company service: " + e.getMessage());
        dto.setCompanyName("Unknown");
    }
        return dto;
    }

    public Complaint closeComplaint(Long id, Long userId) {
    Complaint complaint = complaintRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Complaint not found"));

   if (
        complaint.getStatus() != ComplaintStatus.ESCALATED &&
        complaint.getStatus() != ComplaintStatus.RESOLVED
    ) {
        throw new IllegalStateException(
            "Only escalated or resolved complaints can be closed."
        );
    }


    // Optional: verify userId is the complaint owner
    complaint.setStatus(ComplaintStatus.CLOSED);
    return complaintRepository.save(complaint);
}

@Override
public Complaint handleComplaint(Long id, Long helpdeskId) {
    Complaint c = complaintRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));

    // Fetch companyId from complaint
    Long companyId = c.getCompanyId();

    if (c.getStatus() != ComplaintStatus.PENDING) {
        throw new IllegalStateException("Complaint already handled");
    }

    c.setHandledBy(helpdeskId);
    c.setStatus(ComplaintStatus.HANDLED);

    return complaintRepository.save(c);
}

@Override
public List<Complaint> getMyComplaints(Long helpdeskId) {
    // Get all companies this helpdesk handles complaints for
    List<Long> companyIds = complaintRepository.findCompanyIdsByHandledBy(helpdeskId);
    System.out.println("DEBUG: companyIds = " + companyIds + ", helpdeskId = " + helpdeskId);

    if (companyIds == null || companyIds.isEmpty()) {
        // Return empty list if no companies found
        return Collections.emptyList();
    }

    List<Complaint> complaints = new ArrayList<>();

   
    for (Long companyId : companyIds) { 
    try {
        complaints.addAll(
            complaintRepository.findByCompanyIdAndHandledByAndStatusNot(
                companyId,
                helpdeskId,
                ComplaintStatus.PENDING 
            )
        );
    } catch (Exception e) {
        e.printStackTrace(); 
    }
}


    return complaints;
}



public Complaint escalateComplaint(Long complaintId, String reason) {
    Complaint complaint = complaintRepository.findById(complaintId)
        .orElseThrow(() -> new RuntimeException("Complaint not found"));

    complaint.setStatus(ComplaintStatus.ESCALATED);
    complaint.setEscalationReason(reason);

    return complaintRepository.save(complaint);
}

public long countByStatus(ComplaintStatus status) {
        return complaintRepository.countByStatus(status);
    }







}
