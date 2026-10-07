package com.digitalpass.library.controller;

import com.digitalpass.library.dto.AuthDto.*;
import com.digitalpass.library.model.Role;
import com.digitalpass.library.model.User;
import com.digitalpass.library.repository.UserRepository;
import com.digitalpass.library.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        String jwt = tokenProvider.generateToken(authentication);
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();

        return ResponseEntity.ok(AuthResponse.builder()
                .token(jwt)
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .studentId(user.getStudentId())
                .qrCode(user.getQrCode())
                .department(user.getDepartment())
                .avatarUrl(user.getAvatarUrl())
                .totalFines(user.getTotalFines())
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already registered!");
        }

        Role userRole = registerRequest.getRole() != null ? registerRequest.getRole() : Role.ROLE_STUDENT;
        String stuId = registerRequest.getStudentId() != null ? registerRequest.getStudentId() : "STU-" + System.currentTimeMillis() % 100000;
        String qr = "USER-" + stuId;

        User user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(userRole)
                .department(registerRequest.getDepartment() != null ? registerRequest.getDepartment() : "General Science")
                .studentId(stuId)
                .qrCode(qr)
                .phone(registerRequest.getPhone())
                .avatarUrl("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80")
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
