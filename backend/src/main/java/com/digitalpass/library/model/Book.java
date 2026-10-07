package com.digitalpass.library.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(unique = true, nullable = false)
    private String isbn;

    @Column(nullable = false)
    private String author;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String publisher;
    private Integer publicationYear;
    private String category;
    private String language;
    private Integer pages;
    
    @Column(length = 1000)
    private String coverImage;

    private Double price; // Store sale price
    private Integer totalCopies;
    private Integer availableCopies;

    @Builder.Default
    private String status = "AVAILABLE"; // AVAILABLE, OUT_OF_STOCK, DISCONTINUED

    @Builder.Default
    private Double rating = 4.8;

    @Builder.Default
    private Integer reviewsCount = 12;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (availableCopies == null) availableCopies = totalCopies;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
