package com.digitalpass.library.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "book_copies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookCopy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String copyId; // e.g. LIB-CC-001

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(nullable = false)
    private String status; // AVAILABLE, ISSUED, RESERVED, LOST, DAMAGED, MAINTENANCE

    @Column(unique = true, nullable = false)
    private String qrCode; // e.g. BOOK-COPY-LIB-CC-001

    private Long currentBorrowerId;
    private String location; // Shelf A-4, Row 2
    private String condition; // NEW, GOOD, FAIR, POOR
}
