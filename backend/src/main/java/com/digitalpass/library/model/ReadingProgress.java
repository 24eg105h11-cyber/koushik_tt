package com.digitalpass.library.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reading_progress", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "ebook_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ebook_id", nullable = false)
    private EBook ebook;

    @Builder.Default
    private Integer currentPage = 1;

    private String currentChapter;

    @Builder.Default
    private Double percentage = 0.0;

    private LocalDateTime lastReadAt;

    @Builder.Default
    private Boolean completed = false;

    @PrePersist
    @PreUpdate
    protected void onSave() {
        lastReadAt = LocalDateTime.now();
        if (ebook != null && ebook.getTotalPages() != null && ebook.getTotalPages() > 0) {
            this.percentage = Math.min(100.0, Math.round(((double) currentPage / ebook.getTotalPages()) * 100.0));
            if (this.currentPage >= ebook.getTotalPages()) {
                this.completed = true;
            }
        }
    }
}
