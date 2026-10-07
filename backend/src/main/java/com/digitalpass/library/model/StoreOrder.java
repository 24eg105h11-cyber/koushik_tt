package com.digitalpass.library.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "store_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String orderNumber; // ORD-83921

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Double subtotal;
    private Double tax;
    private Double shippingFee;
    private Double totalAmount;

    private String paymentStatus; // PAID, PENDING, FAILED
    private String paymentMethod; // CARD, UPI, NETBANKING
    private String paymentTransactionId;

    private String orderStatus; // PROCESSING, SHIPPED, DELIVERED, CANCELLED

    private String shippingAddress;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    private LocalDateTime createdAt;
}
