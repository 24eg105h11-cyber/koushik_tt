package com.digitalpass.library.controller;

import com.digitalpass.library.model.Book;
import com.digitalpass.library.model.OrderItem;
import com.digitalpass.library.model.StoreOrder;
import com.digitalpass.library.model.User;
import com.digitalpass.library.repository.BookRepository;
import com.digitalpass.library.repository.StoreOrderRepository;
import com.digitalpass.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/store")
@CrossOrigin(origins = "*")
public class StoreController {

    @Autowired
    private StoreOrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping("/checkout")
    public ResponseEntity<?> checkoutOrder(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        User user = userRepository.findById(userId).orElseThrow();

        Double subtotal = Double.valueOf(payload.get("subtotal").toString());
        Double tax = Double.valueOf(payload.get("tax").toString());
        Double shipping = Double.valueOf(payload.get("shipping").toString());
        Double total = Double.valueOf(payload.get("total").toString());
        String address = payload.get("shippingAddress").toString();
        String paymentMethod = payload.get("paymentMethod").toString();

        List<Map<String, Object>> itemsRaw = (List<Map<String, Object>>) payload.get("items");
        List<OrderItem> items = new ArrayList<>();

        for (Map<String, Object> itemMap : itemsRaw) {
            Long bookId = Long.valueOf(itemMap.get("bookId").toString());
            Integer qty = Integer.valueOf(itemMap.get("quantity").toString());
            Double price = Double.valueOf(itemMap.get("price").toString());

            Book book = bookRepository.findById(bookId).orElseThrow();

            items.add(OrderItem.builder()
                    .book(book)
                    .quantity(qty)
                    .priceAtPurchase(price)
                    .build());
        }

        StoreOrder order = StoreOrder.builder()
                .orderNumber("ORD-" + System.currentTimeMillis() % 1000000)
                .user(user)
                .subtotal(subtotal)
                .tax(tax)
                .shippingFee(shipping)
                .totalAmount(total)
                .paymentStatus("PAID")
                .paymentMethod(paymentMethod)
                .paymentTransactionId("PAY-" + System.currentTimeMillis())
                .orderStatus("PROCESSING")
                .shippingAddress(address)
                .items(items)
                .createdAt(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(orderRepository.save(order));
    }

    @GetMapping("/orders/user/{userId}")
    public ResponseEntity<List<StoreOrder>> getUserOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(orderRepository.findByUserId(userId));
    }
}
