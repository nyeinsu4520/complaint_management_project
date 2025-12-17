package com.cmsproject.company_service.repository;

import com.cmsproject.company_service.model.CompanyStaff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyStaffRepository extends JpaRepository<CompanyStaff, Long> {

    Optional<CompanyStaff> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
