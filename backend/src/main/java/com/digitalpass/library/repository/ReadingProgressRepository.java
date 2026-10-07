package com.digitalpass.library.repository;

import com.digitalpass.library.model.ReadingProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReadingProgressRepository extends JpaRepository<ReadingProgress, Long> {
    List<ReadingProgress> findByUserIdOrderByLastReadAtDesc(Long userId);
    Optional<ReadingProgress> findByUserIdAndEbookId(Long userId, Long ebookId);
}
