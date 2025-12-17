package com.cmsproject.company_service.service;

import com.cmsproject.shared.api.CompanyServiceAPI;
import com.cmsproject.shared.enums.StaffRole;
import com.cmsproject.company_service.repository.ClientCustomerRepository;
import com.cmsproject.company_service.repository.CompanyRepository;
import com.cmsproject.company_service.repository.CompanyStaffRepository;
import com.cmsproject.company_service.model.CompanyStaff;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyServiceAPIImpl implements CompanyServiceAPI {

    private final ClientCustomerRepository customerRepo;
    private final CompanyRepository companyRepo;
    private final CompanyStaffRepository staffRepo;

    @Override
    public Long verifyCustomerEmail(String email) {
        return customerRepo.findByEmail(email)
                .map(c -> c.getCompanyId())
                .orElse(null);
    }

    @Override
    public boolean companyExists(Long companyId) {
        return companyRepo.existsById(companyId);
    }

    @Override
    public java.util.List<Long> getCompaniesByEmail(String email) {
        return customerRepo.findAllByEmail(email)
                .stream()
                .map(c -> c.getCompanyId())
                .toList();
    }

    @Override
    public void assignStaffToCompany(Long userId, Long companyId, StaffRole role) {
        CompanyStaff staff = new CompanyStaff();
        staff.setuserId(userId);
        staff.setcompanyId(companyId);
        staff.setRole(role);
        staffRepo.save(staff);
    }

    @Override
    public Long getCompanyForStaff(Long userId) {
        return staffRepo.findByUserId(userId)
                .map(CompanyStaff::getcompanyId)
                .orElse(null);
    }
}
