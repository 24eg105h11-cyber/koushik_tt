package com.digitalpass.library.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "issue_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String transactionId; // e.g. TXN-982347

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_copy_id", nullable = false)
    private BookCopy bookCopy;

    @Column(nullable = false)
    private LocalDate issueDate;

    @Column(nullable = false)
    private LocalDate dueDate;

    private LocalDate returnDate;

    @Column(nullable = false)
    private String status; // ISSUED, RETURNED, OVERDUE, RENEWED, LOST

    @Builder.Default
    private Integer renewalCount = 0;

    @Builder.Default
    private Double fineAmount = 0.0;

    private String issuedBy; // Librarian name or ID
    private String returnedBy;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
