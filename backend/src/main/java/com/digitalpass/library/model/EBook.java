package com.digitalpass.library.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "ebooks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 1000)
    private String coverImage;

    private String fileUrl; // Path or URL to e-pub/PDF content

    private String category;
    private String language;
    private Integer totalPages;
    private String isbn;
    private String publisher;
    private Integer publicationYear;

    @Builder.Default
    private Boolean isFeatured = true;

    @Builder.Default
    private Boolean isActive = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book physicalBookRef;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
