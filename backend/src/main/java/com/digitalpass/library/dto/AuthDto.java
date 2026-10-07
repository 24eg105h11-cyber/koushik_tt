package com.digitalpass.library.dto;

import com.digitalpass.library.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class AuthDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        private Role role; // STUDENT, LIBRARIAN, ADMIN
        private String department;
        private String studentId;
        private String phone;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AuthResponse {
        private String token;
        private Long id;
        private String name;
        private String email;
        private Role role;
        private String studentId;
        private String qrCode;
        private String department;
        private String avatarUrl;
        private Double totalFines;
    }
}
