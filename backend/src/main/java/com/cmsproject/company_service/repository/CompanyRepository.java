package com.cmsproject.company_service.repository;

import com.cmsproject.company_service.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CompanyRepository extends JpaRepository<Company, Long> {
}
