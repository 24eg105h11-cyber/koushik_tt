package com.digitalpass.library.repository;

import com.digitalpass.library.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByBookIdAndStatusOrderByPositionAsc(Long bookId, String status);
    List<Reservation> findByStatus(String status);
    Optional<Reservation> findByUserIdAndBookIdAndStatus(Long userId, Long bookId, String status);
}
