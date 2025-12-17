package com.cmsproject.company_service.service;

import com.cmsproject.company_service.model.Company;
import com.cmsproject.company_service.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository repository;

    public CompanyService(CompanyRepository repository) {
        this.repository = repository;
    }

    public List<Company> getAllCompanies() {
        return repository.findAll();
    }

    public Company getCompanyById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Company createCompany(Company company) {
        return repository.save(company);
    }
}
