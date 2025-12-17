package com.cmsproject.user_service.service;

import com.cmsproject.user_service.model.User;
import com.cmsproject.user_service.model.Role;

import java.util.List;
import java.util.Map;

public interface UserService {

    // --- User Registration ---
    User registerConsumer(String email, String username, String phoneNumber,
                          String password, String address);

    User registerInternalUser(String email, String username, String phoneNumber,
                              String password, String address, Role role,Long companyId);


    // --- Authentication ---
    User login(String email, String password);


    // --- Company Linking ---
    void linkUserToCompany(Long userId, Long companyId);


    // --- User Information ---
    User getUserById(Long id);
    List<Map<String, Object>> getUserCompanies(Long userId);

    List<User> getAllUsers();

    Long getCompanyForStaff(Long userId);

}
