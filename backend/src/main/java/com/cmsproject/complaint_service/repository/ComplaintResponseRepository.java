package com.cmsproject.complaint_service.repository;

import com.cmsproject.complaint_service.model.ComplaintResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintResponseRepository extends JpaRepository<ComplaintResponse, Long> {
   List<ComplaintResponse> findByComplaintId(Long complaintId);
}
