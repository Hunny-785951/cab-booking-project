package com.CabBooking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cabs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cab {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer cabNumber;

    private String cabType;

    private String driverName;

    private String driverPhone;

    private double x;
    private double y;

    private boolean available;

    // Update cab location
    public void updateLocation(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public Integer getCabId() {
        return cabNumber;
    }
}
