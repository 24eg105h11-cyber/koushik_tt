package com.digitalpass.library.controller;

import com.digitalpass.library.model.Book;
import com.digitalpass.library.model.BookCopy;
import com.digitalpass.library.repository.BookCopyRepository;
import com.digitalpass.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookCopyRepository bookCopyRepository;

    @GetMapping("/public/all")
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookRepository.findAll());
    }

    @GetMapping("/public/search")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam("q") String query) {
        return ResponseEntity.ok(bookRepository.searchBooks(query));
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/public/{id}/copies")
    public ResponseEntity<List<BookCopy>> getBookCopies(@PathVariable Long id) {
        return ResponseEntity.ok(bookCopyRepository.findByBookId(id));
    }

    @PostMapping("/admin/add")
    @PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book saved = bookRepository.save(book);
        // Create initial physical copies
        int copiesCount = book.getTotalCopies() != null ? book.getTotalCopies() : 1;
        for (int i = 1; i <= copiesCount; i++) {
            String copyId = "LIB-" + book.getIsbn().substring(Math.max(0, book.getIsbn().length() - 4)) + "-" + String.format("%03d", i);
            BookCopy copy = BookCopy.builder()
                    .copyId(copyId)
                    .book(saved)
                    .status("AVAILABLE")
                    .qrCode("BOOK-COPY-" + copyId)
                    .location("Shelf MAIN")
                    .condition("NEW")
                    .build();
            bookCopyRepository.save(copy);
        }
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/admin/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setCategory(bookDetails.getCategory());
            book.setDescription(bookDetails.getDescription());
            book.setPrice(bookDetails.getPrice());
            book.setCoverImage(bookDetails.getCoverImage());
            return ResponseEntity.ok(bookRepository.save(book));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
        return ResponseEntity.ok("Book deleted successfully");
    }
}
