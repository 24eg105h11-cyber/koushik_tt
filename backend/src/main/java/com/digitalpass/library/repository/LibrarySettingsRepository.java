package com.digitalpass.library.repository;

import com.digitalpass.library.model.LibrarySettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibrarySettingsRepository extends JpaRepository<LibrarySettings, Long> {
}
