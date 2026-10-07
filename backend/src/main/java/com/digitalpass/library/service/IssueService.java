package com.digitalpass.library.service;

import com.digitalpass.library.model.*;
import com.digitalpass.library.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class IssueService {

    @Autowired
    private IssueTransactionRepository transactionRepository;

    @Autowired
    private BookCopyRepository bookCopyRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private LibrarySettingsRepository settingsRepository;

    @Transactional
    public IssueTransaction confirmIssue(Long userId, Long bookCopyId, String librarianName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        BookCopy copy = bookCopyRepository.findById(bookCopyId)
                .orElseThrow(() -> new RuntimeException("Book copy not found"));

        LibrarySettings settings = settingsRepository.findAll().stream().findFirst().orElse(new LibrarySettings());

        LocalDate issueDate = LocalDate.now();
        LocalDate dueDate = issueDate.plusDays(settings.getMaxLoanDays());

        IssueTransaction txn = IssueTransaction.builder()
                .transactionId("TXN-" + System.currentTimeMillis() % 1000000)
                .user(user)
                .bookCopy(copy)
                .issueDate(issueDate)
                .dueDate(dueDate)
                .status("ISSUED")
                .renewalCount(0)
                .fineAmount(0.0)
                .issuedBy(librarianName != null ? librarianName : "Librarian")
                .build();

        copy.setStatus("ISSUED");
        copy.setCurrentBorrowerId(user.getId());
        bookCopyRepository.save(copy);

        Book book = copy.getBook();
        book.setAvailableCopies(Math.max(0, book.getAvailableCopies() - 1));
        bookRepository.save(book);

        IssueTransaction saved = transactionRepository.save(txn);

        // Send notification
        Notification notif = Notification.builder()
                .user(user)
                .title("Book Issued Successfully")
                .message("You have borrowed '" + book.getTitle() + "' (Copy: " + copy.getCopyId() + "). Due date is " + dueDate + ".")
                .type("ISSUE")
                .build();
        notificationRepository.save(notif);

        return saved;
    }

    @Transactional
    public IssueTransaction confirmReturn(Long transactionId, String librarianName) {
        IssueTransaction txn = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        LibrarySettings settings = settingsRepository.findAll().stream().findFirst().orElse(new LibrarySettings());

        LocalDate returnDate = LocalDate.now();
        txn.setReturnDate(returnDate);
        txn.setStatus("RETURNED");
        txn.setReturnedBy(librarianName != null ? librarianName : "Librarian");

        long overdueDays = ChronoUnit.DAYS.between(txn.getDueDate(), returnDate);
        if (overdueDays > 0) {
            double fine = overdueDays * settings.getFinePerDay();
            txn.setFineAmount(fine);
            User user = txn.getUser();
            user.setTotalFines(user.getTotalFines() + fine);
            userRepository.save(user);

            Notification fineNotif = Notification.builder()
                    .user(user)
                    .title("Late Return Fine Applied")
                    .message("Book '" + txn.getBookCopy().getBook().getTitle() + "' returned " + overdueDays + " days late. Fine of ₹" + fine + " added to your account.")
                    .type("FINE")
                    .build();
            notificationRepository.save(fineNotif);
        }

        BookCopy copy = txn.getBookCopy();
        copy.setStatus("AVAILABLE");
        copy.setCurrentBorrowerId(null);
        bookCopyRepository.save(copy);

        Book book = copy.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);

        IssueTransaction saved = transactionRepository.save(txn);

        Notification notif = Notification.builder()
                .user(txn.getUser())
                .title("Book Returned")
                .message("You have returned '" + book.getTitle() + "' (Copy: " + copy.getCopyId() + "). Thank you!")
                .type("RETURN")
                .build();
        notificationRepository.save(notif);

        return saved;
    }

    @Transactional
    public IssueTransaction confirmRenew(Long transactionId) {
        IssueTransaction txn = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        LibrarySettings settings = settingsRepository.findAll().stream().findFirst().orElse(new LibrarySettings());

        if (txn.getRenewalCount() >= settings.getMaxRenewals()) {
            throw new RuntimeException("Maximum renewal limit (" + settings.getMaxRenewals() + ") reached for this book.");
        }

        txn.setRenewalCount(txn.getRenewalCount() + 1);
        txn.setDueDate(txn.getDueDate().plusDays(settings.getMaxLoanDays()));
        txn.setStatus("RENEWED");

        IssueTransaction saved = transactionRepository.save(txn);

        Notification notif = Notification.builder()
                .user(txn.getUser())
                .title("Book Renewed")
                .message("Your loan for '" + txn.getBookCopy().getBook().getTitle() + "' has been renewed. New due date is " + txn.getDueDate() + ".")
                .type("RENEW")
                .build();
        notificationRepository.save(notif);

        return saved;
    }
}
