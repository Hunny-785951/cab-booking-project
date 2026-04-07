package com.CabBooking.dto;

import lombok.Data;

@Data
public class BookingRequest {
    private Long userId;
    private String pickupLocation;
    private String dropLocation;
    private double pickupLat;
    private double pickupLng;
    private double dropLat;
    private double dropLng;
}
