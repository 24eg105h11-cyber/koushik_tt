package com.digitalpass.library.service;

import com.digitalpass.library.dto.ScanDto.*;
import com.digitalpass.library.model.*;
import com.digitalpass.library.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class SmartScanService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookCopyRepository bookCopyRepository;

    @Autowired
    private IssueTransactionRepository transactionRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private LibrarySettingsRepository settingsRepository;

    @Transactional(readOnly = true)
    public SmartScanResult analyzeDualScan(String studentQr, String copyQr) {
        Optional<User> userOpt = userRepository.findByQrCode(studentQr);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByStudentId(studentQr);
        }

        Optional<BookCopy> copyOpt = bookCopyRepository.findByQrCode(copyQr);
        if (copyOpt.isEmpty()) {
            copyOpt = bookCopyRepository.findByCopyId(copyQr);
        }

        if (userOpt.isEmpty() || copyOpt.isEmpty()) {
            return SmartScanResult.builder()
                    .actionType("INVALID")
                    .eligible(false)
                    .message("Invalid QR code provided. " + (userOpt.isEmpty() ? "Student not found. " : "") + (copyOpt.isEmpty() ? "Book copy not found." : ""))
                    .build();
        }

        User user = userOpt.get();
        BookCopy copy = copyOpt.get();

        LibrarySettings settings = settingsRepository.findAll().stream().findFirst().orElse(new LibrarySettings());

        // Check if copy is currently issued to this user
        Optional<IssueTransaction> activeTxnOpt = transactionRepository.findByBookCopyIdAndStatus(copy.getId(), "ISSUED");

        if (activeTxnOpt.isPresent()) {
            IssueTransaction activeTxn = activeTxnOpt.get();
            if (activeTxn.getUser().getId().equals(user.getId())) {
                // Operation is RETURN or RENEW
                LocalDate today = LocalDate.now();
                long overdueDays = ChronoUnit.DAYS.between(activeTxn.getDueDate(), today);
                double fine = overdueDays > 0 ? overdueDays * settings.getFinePerDay() : 0.0;

                return SmartScanResult.builder()
                        .actionType(activeTxn.getRenewalCount() < settings.getMaxRenewals() && overdueDays <= 0 ? "RETURN_OR_RENEW" : "RETURN")
                        .eligible(true)
                        .message("Book currently issued to " + user.getName() + ". Proceed to Return or Renew.")
                        .user(user)
                        .bookCopy(copy)
                        .existingTransaction(activeTxn)
                        .calculatedFine(fine)
                        .daysOverdue(Math.max(0, overdueDays))
                        .build();
            } else {
                return SmartScanResult.builder()
                        .actionType("INVALID")
                        .eligible(false)
                        .message("Book copy is currently issued to another student (" + activeTxn.getUser().getName() + "). Must be returned first.")
                        .user(user)
                        .bookCopy(copy)
                        .build();
            }
        }

        // Copy is not issued. Check if available for ISSUE or RESERVATION_VERIFY
        List<IssueTransaction> userIssued = transactionRepository.findByUserIdAndStatus(user.getId(), "ISSUED");
        if (userIssued.size() >= settings.getMaxBooksPerStudent()) {
            return SmartScanResult.builder()
                    .actionType("INVALID")
                    .eligible(false)
                    .message("Student has reached maximum limit of " + settings.getMaxBooksPerStudent() + " issued books.")
                    .user(user)
                    .bookCopy(copy)
                    .build();
        }

        // Check reservation queue
        List<Reservation> reservations = reservationRepository.findByBookIdAndStatusOrderByPositionAsc(copy.getBook().getId(), "PENDING");
        if (!reservations.isEmpty()) {
            Reservation topRes = reservations.get(0);
            if (topRes.getUser().getId().equals(user.getId())) {
                return SmartScanResult.builder()
                        .actionType("RESERVATION_VERIFY")
                        .eligible(true)
                        .message("Student has priority reservation #" + topRes.getPosition() + " for this book.")
                        .user(user)
                        .bookCopy(copy)
                        .calculatedIssueDate(LocalDate.now())
                        .calculatedDueDate(LocalDate.now().plusDays(settings.getMaxLoanDays()))
                        .reservationPosition(topRes.getPosition())
                        .build();
            } else if (!"AVAILABLE".equals(copy.getStatus())) {
                return SmartScanResult.builder()
                        .actionType("INVALID")
                        .eligible(false)
                        .message("Book is reserved by student: " + topRes.getUser().getName())
                        .user(user)
                        .bookCopy(copy)
                        .build();
            }
        }

        // Normal Issue
        return SmartScanResult.builder()
                .actionType("ISSUE")
                .eligible(true)
                .message("Ready to issue " + copy.getBook().getTitle() + " to " + user.getName())
                .user(user)
                .bookCopy(copy)
                .calculatedIssueDate(LocalDate.now())
                .calculatedDueDate(LocalDate.now().plusDays(settings.getMaxLoanDays()))
                .build();
    }
}
