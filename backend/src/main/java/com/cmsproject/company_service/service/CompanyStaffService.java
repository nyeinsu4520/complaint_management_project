package com.cmsproject.company_service.service;

import com.cmsproject.company_service.model.CompanyStaff;
import com.cmsproject.company_service.repository.CompanyStaffRepository;
import com.cmsproject.shared.enums.StaffRole;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyStaffService {

    private final CompanyStaffRepository staffRepo;

    public CompanyStaff assignStaff(Long userId, Long companyId, StaffRole role) {

        CompanyStaff staff = new CompanyStaff();
        staff.setuserId(userId);
        staff.setcompanyId(companyId);
        staff.setRole(role);

        return staffRepo.save(staff);
    }

    public Long getCompanyForStaff(Long userId) {
        return staffRepo.findByUserId(userId)
                .map(CompanyStaff::getcompanyId)
                .orElse(null);
    }
}
