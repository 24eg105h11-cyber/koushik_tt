package com.digitalpass.library.repository;

import com.digitalpass.library.model.BookCopy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookCopyRepository extends JpaRepository<BookCopy, Long> {
    Optional<BookCopy> findByCopyId(String copyId);
    Optional<BookCopy> findByQrCode(String qrCode);
    List<BookCopy> findByBookId(Long bookId);
    List<BookCopy> findByBookIdAndStatus(Long bookId, String status);
    List<BookCopy> findByCurrentBorrowerId(Long userId);
}
