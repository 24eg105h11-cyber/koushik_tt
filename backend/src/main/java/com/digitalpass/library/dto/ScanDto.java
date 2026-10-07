package com.digitalpass.library.dto;

import com.digitalpass.library.model.BookCopy;
import com.digitalpass.library.model.IssueTransaction;
import com.digitalpass.library.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

public class ScanDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SmartScanRequest {
        private String scannedQr; // Can be Student QR or Copy QR
        private String secondaryQr; // Optional second QR in dual scan
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DualScanRequest {
        private String studentQr;
        private String copyQr;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SmartScanResult {
        private String actionType; // ISSUE, RETURN, RENEW, RESERVATION_VERIFY, INVALID
        private String message;
        private boolean eligible;
        
        private User user;
        private BookCopy bookCopy;
        private IssueTransaction existingTransaction;

        private LocalDate calculatedIssueDate;
        private LocalDate calculatedDueDate;
        private Double calculatedFine;
        private Long daysOverdue;
        private Integer reservationPosition;
    }
}
