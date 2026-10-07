package com.digitalpass.library.repository;

import com.digitalpass.library.model.Role;
import com.digitalpass.library.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByStudentId(String studentId);
    Optional<User> findByQrCode(String qrCode);
    Boolean existsByEmail(String email);
    Boolean existsByStudentId(String studentId);
    List<User> findByRole(Role role);
}
