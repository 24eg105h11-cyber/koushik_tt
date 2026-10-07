package com.digitalpass.library.controller;

import com.digitalpass.library.model.EBook;
import com.digitalpass.library.model.ReadingProgress;
import com.digitalpass.library.model.User;
import com.digitalpass.library.repository.EBookRepository;
import com.digitalpass.library.repository.ReadingProgressRepository;
import com.digitalpass.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ebooks")
@CrossOrigin(origins = "*")
public class EBookController {

    @Autowired
    private EBookRepository ebookRepository;

    @Autowired
    private ReadingProgressRepository progressRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/public/all")
    public ResponseEntity<List<EBook>> getAllEBooks() {
        return ResponseEntity.ok(ebookRepository.findAll());
    }

    @GetMapping("/public/search")
    public ResponseEntity<List<EBook>> searchEBooks(@RequestParam("q") String query) {
        return ResponseEntity.ok(ebookRepository.searchEBooks(query));
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<EBook> getEBookById(@PathVariable Long id) {
        return ebookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/progress/user/{userId}")
    public ResponseEntity<List<ReadingProgress>> getUserProgress(@PathVariable Long userId) {
        return ResponseEntity.ok(progressRepository.findByUserIdOrderByLastReadAtDesc(userId));
    }

    @PostMapping("/progress/update")
    public ResponseEntity<ReadingProgress> updateProgress(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        Long ebookId = Long.valueOf(payload.get("ebookId").toString());
        Integer currentPage = Integer.valueOf(payload.get("currentPage").toString());
        String currentChapter = payload.get("currentChapter") != null ? payload.get("currentChapter").toString() : "Chapter 1";

        User user = userRepository.findById(userId).orElseThrow();
        EBook ebook = ebookRepository.findById(ebookId).orElseThrow();

        ReadingProgress progress = progressRepository.findByUserIdAndEbookId(userId, ebookId)
                .orElseGet(() -> ReadingProgress.builder().user(user).ebook(ebook).build());

        progress.setCurrentPage(currentPage);
        progress.setCurrentChapter(currentChapter);

        return ResponseEntity.ok(progressRepository.save(progress));
    }
}
