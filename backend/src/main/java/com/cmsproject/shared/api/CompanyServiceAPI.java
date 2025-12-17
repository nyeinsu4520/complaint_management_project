package com.cmsproject.shared.api;

import com.cmsproject.shared.enums.StaffRole;

public interface CompanyServiceAPI {

    // For Consumer Customers
    Long verifyCustomerEmail(String email);
    boolean companyExists(Long companyId);

    // For customer with multiple company accounts
    java.util.List<Long> getCompaniesByEmail(String email);

    // Staff assignment (Helpdesk / Support)
    void assignStaffToCompany(Long userId, Long companyId, StaffRole role);

    Long getCompanyForStaff(Long userId);
}
