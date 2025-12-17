package com.cmsproject.user_service.dto;

public class LinkCompanyRequest {
    private Long userId;
    private Long companyId;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }
}