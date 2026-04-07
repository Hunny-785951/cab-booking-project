package com.CabBooking.dto;

import com.CabBooking.model.Trip;

public class TripResponse {
    private Long userId;
    private Long cabId;
    private double distance;
    private double fare;
    private boolean surgeApplied;
    private String message;

    public TripResponse(Long userId, Long cabId, double distance, double fare, boolean surgeApplied, String message) {
        this.userId = userId;
        this.cabId = cabId;
        this.distance = distance;
        this.fare = fare;
        this.surgeApplied = surgeApplied;
        this.message = message;
    }
    public TripResponse(Trip trip) {
        this.userId = trip.getUserId();
        this.cabId = trip.getCabId();
        this.distance = trip.getDistance();
        this.fare = trip.getFare();
        this.surgeApplied = trip.isSurgeApplied();
        this.message = "✅ Trip booked successfully";
    }


    // Getters
    public Long getUserId() { return userId; }
    public Long getCabId() { return cabId; }
    public double getDistance() { return distance; }
    public double getFare() { return fare; }
    public boolean isSurgeApplied() { return surgeApplied; }
    public String getMessage() { return message; }
}
