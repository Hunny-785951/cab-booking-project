package com.CabBooking.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "trips")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripId;

    private Long userId;
    private Long cabId;

    private String cabNumber;
    private String cabType;
    private String driverName;
    private String driverPhone;

    private String pickupLocation;
    private String dropLocation;

    private double distance;
    private double fare;
    private boolean surgeApplied;

    private LocalDateTime bookingTime;

    private String status;

    public Trip(int i, int i1, int i2, int i3, boolean b, String s) {
    }
}
