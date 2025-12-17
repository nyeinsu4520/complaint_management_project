package com.cmsproject.user_service.repository;

import com.cmsproject.user_service.model.UserClientLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;
public interface UserClientLinkRepository extends JpaRepository<UserClientLink, Long> {
    Optional<UserClientLink> findByUserIdAndCompanyId(Long userId, Long companyId);

    List<UserClientLink> findAllByUserId(Long userId);
    
    @Query("""
    SELECT c.companyId, c.company_name
    FROM UserClientLink u
    JOIN ClientCustomer c ON u.companyId = c.companyId
    WHERE u.userId = :userId
    """)
    List<Object[]> getCompaniesForUser(Long userId);
    }
