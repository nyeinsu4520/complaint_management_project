package com.cmsproject.complaint_service.repository;

import com.cmsproject.complaint_service.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByUserId(Long userId);

    List<Complaint> findByCompanyId(Long companyId);

    List<Complaint> findByStatus(String status);
}