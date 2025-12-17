package com.cmsproject.user_service.service;

import com.cmsproject.shared.api.CompanyServiceAPI;
import com.cmsproject.shared.enums.StaffRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyServiceClient {

    private final CompanyServiceAPI companyServiceAPI;

    public Long verifyCustomerEmail(String email) {
        return companyServiceAPI.verifyCustomerEmail(email);
    }

    public boolean companyExists(Long companyId) {
        return companyServiceAPI.companyExists(companyId);
    }

    public java.util.List<Long> getCompaniesByEmail(String email) {
        return companyServiceAPI.getCompaniesByEmail(email);
    }

    public void assignStaffToCompany(Long userId, Long companyId, StaffRole role) {
        companyServiceAPI.assignStaffToCompany(userId, companyId, role);
    }

    public Long getCompanyForStaff(Long userId) {
        return companyServiceAPI.getCompanyForStaff(userId);
    }
}
