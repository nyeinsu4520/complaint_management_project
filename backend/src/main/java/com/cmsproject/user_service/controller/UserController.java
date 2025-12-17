package com.cmsproject.user_service.controller;

import com.cmsproject.user_service.dto.ConsumerRegistrationRequest;
import com.cmsproject.user_service.dto.InternalUserRegistrationRequest;
import com.cmsproject.user_service.dto.LinkCompanyRequest;
import com.cmsproject.user_service.dto.LoginRequest;
import com.cmsproject.user_service.model.User;
import com.cmsproject.user_service.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    // =====================================================
    // 1. HEALTH CHECK
    // =====================================================
    @GetMapping
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("User API is working");
    }

    // =====================================================
    // 2. REGISTER CONSUMER
    // =====================================================
    @PostMapping("/register/consumer")
    public ResponseEntity<?> registerConsumer(@RequestBody ConsumerRegistrationRequest request) {
        try {
            User user = userService.registerConsumer(
                    request.getEmail(),
                    request.getUsername(),
                    request.getPhoneNumber(),
                    request.getPassword(),
                    request.getAddress()
            );
            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    // =====================================================
    // 3. REGISTER INTERNAL USER
    // =====================================================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/register/internal")
    public ResponseEntity<?> registerInternal(@RequestBody InternalUserRegistrationRequest request) {

        try {
            User user = userService.registerInternalUser(
                    request.getEmail(),
                    request.getUsername(),
                    request.getPhoneNumber(),
                    request.getPassword(),
                    request.getAddress(),
                    request.getRole(),
                    request.getCompanyId()
            );

            return ResponseEntity.ok(user);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid role.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    // =====================================================
    // 4. LOGIN
    // =====================================================
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = userService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    // =====================================================
    // 5. LINK USER TO COMPANY
    // =====================================================
    @PostMapping("/link-company")
    public ResponseEntity<?> linkCompany(@RequestBody LinkCompanyRequest request) {
        try {
            userService.linkUserToCompany(request.getUserId(), request.getCompanyId());
            return ResponseEntity.ok("User linked to company successfully");

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    // =====================================================
    // 6. GET USER'S COMPANIES
    // =====================================================
    @GetMapping("/{userId}/companies")
    public ResponseEntity<?> getUserCompanies(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(userService.getUserCompanies(userId));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }


   @GetMapping("/{userId}/staff/company")
    public ResponseEntity<?> getStaffCompany(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(userService.getCompanyForStaff(userId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
