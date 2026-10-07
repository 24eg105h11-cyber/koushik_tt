package com.digitalpass.library.repository;

import com.digitalpass.library.model.StoreOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreOrderRepository extends JpaRepository<StoreOrder, Long> {
    List<StoreOrder> findByUserId(Long userId);
    Optional<StoreOrder> findByOrderNumber(String orderNumber);
}
