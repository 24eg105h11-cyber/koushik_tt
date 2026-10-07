package com.digitalpass.library.repository;

import com.digitalpass.library.model.IssueTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IssueTransactionRepository extends JpaRepository<IssueTransaction, Long> {
    List<IssueTransaction> findByUserId(Long userId);
    List<IssueTransaction> findByUserIdAndStatus(Long userId, String status);
    Optional<IssueTransaction> findByBookCopyIdAndStatus(Long bookCopyId, String status);
    List<IssueTransaction> findByStatus(String status);
    Optional<IssueTransaction> findByTransactionId(String transactionId);
}
