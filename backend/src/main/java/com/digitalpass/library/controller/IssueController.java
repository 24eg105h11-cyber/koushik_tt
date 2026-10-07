package com.digitalpass.library.controller;

import com.digitalpass.library.model.IssueTransaction;
import com.digitalpass.library.repository.IssueTransactionRepository;
import com.digitalpass.library.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/issues")
@CrossOrigin(origins = "*")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private IssueTransactionRepository transactionRepository;

    @PostMapping("/confirm-issue")
    @PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
    public ResponseEntity<?> confirmIssue(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        Long bookCopyId = Long.valueOf(payload.get("bookCopyId").toString());
        String librarianName = payload.get("librarianName") != null ? payload.get("librarianName").toString() : "Librarian";

        IssueTransaction txn = issueService.confirmIssue(userId, bookCopyId, librarianName);
        return ResponseEntity.ok(txn);
    }

    @PostMapping("/confirm-return")
    @PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
    public ResponseEntity<?> confirmReturn(@RequestBody Map<String, Object> payload) {
        Long transactionId = Long.valueOf(payload.get("transactionId").toString());
        String librarianName = payload.get("librarianName") != null ? payload.get("librarianName").toString() : "Librarian";

        IssueTransaction txn = issueService.confirmReturn(transactionId, librarianName);
        return ResponseEntity.ok(txn);
    }

    @PostMapping("/confirm-renew")
    public ResponseEntity<?> confirmRenew(@RequestBody Map<String, Object> payload) {
        Long transactionId = Long.valueOf(payload.get("transactionId").toString());
        IssueTransaction txn = issueService.confirmRenew(transactionId);
        return ResponseEntity.ok(txn);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<IssueTransaction>> getUserTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionRepository.findByUserId(userId));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
    public ResponseEntity<List<IssueTransaction>> getAllTransactions() {
        return ResponseEntity.ok(transactionRepository.findAll());
    }
}
