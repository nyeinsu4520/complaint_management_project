package com.cmsproject.complaint_service.service;

import com.cmsproject.complaint_service.dto.CompanyDTO;
import com.cmsproject.company_service.model.Company;
import com.cmsproject.company_service.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyClientService {

    private final CompanyService companyService;

    public CompanyDTO getCompanyById(Long id) {
        Company company = companyService.getCompanyById(id);

        if (company == null) return null;

        CompanyDTO dto = new CompanyDTO();
        dto.setCompanyId(company.getId());
        dto.setName(company.getName());

        return dto;
    }
}
