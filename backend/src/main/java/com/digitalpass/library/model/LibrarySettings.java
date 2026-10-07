package com.digitalpass.library.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "library_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibrarySettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    private Double finePerDay = 10.0;

    @Builder.Default
    private Integer maxBooksPerStudent = 5;

    @Builder.Default
    private Integer maxLoanDays = 14;

    @Builder.Default
    private Integer maxRenewals = 2;

    @Builder.Default
    private Integer reservationExpiryHours = 48;

    @Builder.Default
    private Double storeTaxPercent = 5.0;

    @Builder.Default
    private Double storeShippingFee = 40.0;
}
