package com.digitalpass.library.controller;

import com.digitalpass.library.model.Book;
import com.digitalpass.library.model.Reservation;
import com.digitalpass.library.model.User;
import com.digitalpass.library.repository.BookRepository;
import com.digitalpass.library.repository.ReservationRepository;
import com.digitalpass.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createReservation(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        Long bookId = Long.valueOf(payload.get("bookId").toString());

        User user = userRepository.findById(userId).orElseThrow();
        Book book = bookRepository.findById(bookId).orElseThrow();

        List<Reservation> existing = reservationRepository.findByBookIdAndStatusOrderByPositionAsc(bookId, "PENDING");
        int nextPos = existing.size() + 1;

        Reservation reservation = Reservation.builder()
                .reservationId("RES-" + System.currentTimeMillis() % 100000)
                .user(user)
                .book(book)
                .position(nextPos)
                .status("PENDING")
                .reservationDate(LocalDateTime.now())
                .expiryDate(LocalDateTime.now().plusHours(48))
                .build();

        return ResponseEntity.ok(reservationRepository.save(reservation));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reservation>> getUserReservations(@PathVariable Long userId) {
        return ResponseEntity.ok(reservationRepository.findByUserId(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationRepository.findAll());
    }
}
