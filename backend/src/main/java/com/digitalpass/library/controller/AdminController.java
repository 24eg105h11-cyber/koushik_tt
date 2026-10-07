package com.digitalpass.library.controller;

import com.digitalpass.library.model.LibrarySettings;
import com.digitalpass.library.model.User;
import com.digitalpass.library.repository.LibrarySettingsRepository;
import com.digitalpass.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    @Autowired
    private LibrarySettingsRepository settingsRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/settings")
    public ResponseEntity<LibrarySettings> getSettings() {
        LibrarySettings settings = settingsRepository.findAll().stream().findFirst().orElse(new LibrarySettings());
        return ResponseEntity.ok(settings);
    }

    @PutMapping("/settings")
    public ResponseEntity<LibrarySettings> updateSettings(@RequestBody LibrarySettings newSettings) {
        LibrarySettings existing = settingsRepository.findAll().stream().findFirst().orElse(new LibrarySettings());
        existing.setFinePerDay(newSettings.getFinePerDay());
        existing.setMaxBooksPerStudent(newSettings.getMaxBooksPerStudent());
        existing.setMaxLoanDays(newSettings.getMaxLoanDays());
        existing.setMaxRenewals(newSettings.getMaxRenewals());
        existing.setReservationExpiryHours(newSettings.getReservationExpiryHours());
        existing.setStoreTaxPercent(newSettings.getStoreTaxPercent());
        existing.setStoreShippingFee(newSettings.getStoreShippingFee());
        return ResponseEntity.ok(settingsRepository.save(existing));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}
