package com.digitalpass.library.repository;

import com.digitalpass.library.model.EBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EBookRepository extends JpaRepository<EBook, Long> {
    List<EBook> findByCategoryIgnoreCase(String category);
    List<EBook> findByIsFeaturedTrue();
    
    @Query("SELECT e FROM EBook e WHERE LOWER(e.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(e.author) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<EBook> searchEBooks(String query);
}
