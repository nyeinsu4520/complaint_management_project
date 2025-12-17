package com.cmsproject.company_service.controller;

import com.cmsproject.company_service.model.Company;
import com.cmsproject.company_service.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "*")
public class CompanyController {

    private final CompanyService service;

    public CompanyController(CompanyService service) {
        this.service = service;
    }

    // GET all companies
    @GetMapping
    public List<Company> getAllCompanies() {
        System.out.println("HIT: getAllCompanies()");

        List<Company> companies = service.getAllCompanies();

        System.out.println("RESULT: " + companies);

        return companies;
    }

    // GET company by ID
    @GetMapping("/{id}")
    public Company getCompany(@PathVariable Long id) {
        return service.getCompanyById(id);
    }

    // POST to create a company
    @PostMapping
    public Company createCompany(@RequestBody Company company) {
        return service.createCompany(company);
    }

}
