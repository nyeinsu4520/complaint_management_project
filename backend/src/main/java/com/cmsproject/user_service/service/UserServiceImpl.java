package com.cmsproject.user_service.service;

import com.cmsproject.user_service.dto.LinkCompanyRequest;
import com.cmsproject.user_service.exceptions.ResourceConflictException;
import com.cmsproject.user_service.exceptions.UnauthorizedOperationException;
import com.cmsproject.user_service.model.Role;
import com.cmsproject.user_service.model.User;
import com.cmsproject.user_service.model.UserClientLink;
import com.cmsproject.user_service.repository.UserClientLinkRepository;
import com.cmsproject.user_service.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserClientLinkRepository linkRepository;
    private final PasswordEncoder passwordEncoder;
    private final CompanyServiceClient companyClient;

    // =====================================================
    // 1. REGISTER CONSUMER
    // =====================================================
    @Transactional
    @Override
    public User registerConsumer(
            String email, String username, String phoneNumber,
            String password, String address) {

        if (userRepository.existsByEmail(email)) {
            throw new ResourceConflictException("User with this email already exists");
        }

        // Ask company service to verify user belongs to some company
        Long companyId = companyClient.verifyCustomerEmail(email);

        if (companyId == null) {
            throw new UnauthorizedOperationException("User email not linked to any company");
        }

        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPhoneNumber(phoneNumber);
        user.setPassword(passwordEncoder.encode(password));
        user.setAddress(address);
        user.setRole(Role.CONSUMER);
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        User saved = userRepository.save(user);

        // Link user → company
        linkUserToCompany(saved.getId(), companyId);

        return saved;
    }

    // =====================================================
    // 2. LOGIN
    // =====================================================
    @Override
    public User login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // auto-link all companies the user is part of
        List<Long> companies = companyClient.getCompaniesByEmail(email);

        for (Long companyId : companies) {
            linkUserToCompany(user.getId(), companyId);
        }

        return user;
    }

    // =====================================================
    // 3. LINK USER TO COMPANY (SOA-COMPLIANT)
    // =====================================================
    @Transactional
    @Override
    public void linkUserToCompany(Long userId, Long companyId) {

        // validate user exists
        User user = getUserById(userId);

        // validate company exists (SOA: call remote service)
        if (!companyClient.companyExists(companyId)) {
            throw new RuntimeException("Company not found");
        }

        // check if link already exists
        boolean exists = linkRepository
                .findByUserIdAndCompanyId(userId, companyId)
                .isPresent();

        if (!exists) {
            linkRepository.save(new UserClientLink(userId, companyId, true));
        }
    }

    // =====================================================
    // 4. REGISTER INTERNAL USER
    // =====================================================
    @Override
public User registerInternalUser(
        String email, String username, String phoneNumber,
        String password, String address, Role role, Long companyId) {

    if (!Role.isInternalRole(role)) {
        throw new RuntimeException("Invalid internal role");
    }

    if (userRepository.existsByEmail(email)) {
        throw new ResourceConflictException("User already exists");
    }

    if (companyId == null) {
        throw new RuntimeException("companyId is required for internal roles");
    }

    // 1. Create user
    User user = new User();
    user.setEmail(email);
    user.setUsername(username);
    user.setPhoneNumber(phoneNumber);
    user.setPassword(passwordEncoder.encode(password));
    user.setAddress(address);
    user.setRole(role);
    user.setCreatedAt(new Timestamp(System.currentTimeMillis()));

    User savedUser = userRepository.save(user);

    companyClient.assignStaffToCompany(
        savedUser.getId(),
        companyId,
        role.toStaffRole()
    );

    return savedUser;
}


    // =====================================================
    // 5. GET USER
    // =====================================================
    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // =====================================================
    // 6. GET ALL COMPANIES LINKED TO USER
    // =====================================================
    @Override
    public List<Map<String, Object>> getUserCompanies(Long userId) {

        List<Object[]> results = linkRepository.getCompaniesForUser(userId);

        List<Map<String, Object>> companies = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", row[0]);
            map.put("name", row[1]);
            companies.add(map);
        }

        return companies;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Long getCompanyForStaff(Long userId) {
        return companyClient.getCompanyForStaff(userId);
    }

}
