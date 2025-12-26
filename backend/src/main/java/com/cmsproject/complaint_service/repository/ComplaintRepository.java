package com.cmsproject.complaint_service.repository;

import com.cmsproject.complaint_service.model.Complaint;
import com.cmsproject.complaint_service.model.ComplaintStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByUserId(Long userId);

    List<Complaint> findByCompanyId(Long companyId);

    List<Complaint> findByStatus(String status);


    @Query("SELECT DISTINCT c.companyId FROM Complaint c WHERE c.handledBy = :helpdeskId")
    List<Long> findCompanyIdsByHandledBy(@Param("helpdeskId") Long helpdeskId);

   @Query("SELECT c FROM Complaint c WHERE c.companyId = :companyId AND c.status = :status AND c.handledBy IS NULL")
    List<Complaint> findPendingByCompanyId(@Param("companyId") Long companyId, @Param("status") ComplaintStatus status);

    List<Complaint> findByCompanyIdAndHandledByAndStatusNot(Long companyId, Long handledBy, ComplaintStatus status);


    @Query("SELECT c FROM Complaint c WHERE c.companyId = :companyId AND c.handledBy = :handledBy AND c.status = :status")
    List<Complaint> findByCompanyIdAndHandledByAndStatus(
            @Param("companyId") Long companyId,
            @Param("handledBy") Long handledBy,
            @Param("status") ComplaintStatus status
    );


    List<Complaint> findByCompanyIdAndStatusAndHandledByIsNull(Long companyId,ComplaintStatus status);
    
    Optional<Complaint> findByIdAndCompanyId(Long id, Long companyId);

    Long countByStatus(ComplaintStatus status);

}