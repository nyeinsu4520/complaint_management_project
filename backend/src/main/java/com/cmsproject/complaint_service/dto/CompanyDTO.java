package com.cmsproject.complaint_service.dto;

public class CompanyDTO {

    private Long companyId;
    private String name;

    public CompanyDTO() {
    }

    public CompanyDTO(Long companyId, String name) {
        this.companyId = companyId;
        this.name = name;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "CompanyDTO{" +
                "companyId=" + companyId +
                ", name='" + name + '\'' +
                '}';
    }
}
