package com.CabBooking.model;

import lombok.Data;
public class User {
    private Integer userId;
    private String name;
    private double x;
    private double y;

    // Constructor
    public User(int userId, String name, double x, double y) {
        this.userId = userId;
        this.name = name;
        this.x = x;
        this.y = y;
    }

    // Default constructor (needed for JSON deserialization)
    public User() {
    }

    // Getters & Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

}