package com.cmsproject.company_service.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cmsproject.company_service.model.ClientCustomer;

import java.util.Optional;
import java.util.List;
public interface ClientCustomerRepository extends JpaRepository<ClientCustomer, Long> {
    boolean existsByCompanyIdAndEmail(Long companyId, String email);

    Optional<ClientCustomer> findByEmail(String email);
    
    List<ClientCustomer> findAllByEmail(String email);
}
