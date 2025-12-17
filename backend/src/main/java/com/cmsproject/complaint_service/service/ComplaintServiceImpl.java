package com.cmsproject.complaint_service.service;

import com.cmsproject.complaint_service.model.Complaint;
import com.cmsproject.complaint_service.model.ComplaintStatus;
import com.cmsproject.complaint_service.model.Severity;
import com.cmsproject.complaint_service.repository.ComplaintRepository;
import com.cmsproject.complaint_service.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        complaint.setStatus(ComplaintStatus.IN_PROGRESS); // <-- FIXED
        complaint.setHandledBy(handledBy);

        return complaintRepository.save(complaint);
    }

    // @Override
    // public Complaint resolveComplaint(Long complaintId, Long resolvedBy) {
    //     Complaint complaint = complaintRepository.findById(complaintId)
    //             .orElseThrow(() -> new RuntimeException("Complaint not found"));

    //     complaint.setStatus("RESOLVED");
    //     complaint.setResolvedBy(resolvedBy);

    //     return complaintRepository.save(complaint);
    // }

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


}
