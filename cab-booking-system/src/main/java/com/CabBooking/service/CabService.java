package com.CabBooking.service;

import com.CabBooking.model.Cab;
import com.CabBooking.model.Trip;
import com.CabBooking.model.User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CabService {

    // Store all cabs (cabId → Cab)
    private final Map<Integer, Cab> cabMap = new HashMap<>();

    // Trip history
    private final List<Trip> tripHistory = new ArrayList<>();

    private int activeUsers = 0;
    private int availableCabs = 0;

    // -------------------------------
    // ADD NEW CAB
    // -------------------------------
    public void addCab(Cab cab) {
        if (cab == null) return;

        cabMap.put(cab.getCabId(), cab);

        if (cab.isAvailable()) {
            availableCabs++;
        }
    }

    // -------------------------------
    // UPDATE CAB LOCATION
    // -------------------------------
    public void updateCabLocation(int cabId, double x, double y) {
        Cab cab = cabMap.get(cabId);
        if (cab != null) {
            cab.updateLocation(x, y);
        }
    }

    // -------------------------------
    // GET ALL AVAILABLE CABS
    // -------------------------------
    public List<Cab> getAllAvailableCabs() {
        List<Cab> available = new ArrayList<>();

        for (Cab cab : cabMap.values()) {
            if (cab.isAvailable()) {
                available.add(cab);
            }
        }
        return available;
    }

    // -------------------------------
    // BOOK A CAB
    // -------------------------------
    public Trip bookCab(User user) {

        if (user == null) {
            return new Trip(-1, -1, 0, 0, false, "❌ Invalid user");
        }

        activeUsers++;

        // Min-heap sorted by distance
        PriorityQueue<Cab> nearestCabs = new PriorityQueue<>(
                Comparator.comparingDouble(
                        cab -> distance(user.getX(), user.getY(), cab.getX(), cab.getY())
                )
        );

        for (Cab cab : cabMap.values()) {
            if (cab.isAvailable()) {
                nearestCabs.add(cab);
            }
        }

        // No cabs available
        if (nearestCabs.isEmpty()) {
            return new Trip(
                    user.getUserId(),
                    -1,
                    0,
                    0,
                    false,
                    "❌ No cabs available right now"
            );
        }

        // Pick nearest cab
        Cab nearestCab = nearestCabs.poll();
        nearestCab.setAvailable(false);
        availableCabs--;

        // Calculate distance
        double tripDistance = distance(user.getX(), user.getY(), nearestCab.getX(), nearestCab.getY());

        // Surge pricing
        boolean surgeApplied = activeUsers > availableCabs;
        double multiplier = surgeApplied ? 1.5 : 1.0;
        double fare = tripDistance * 10 * multiplier;

        // Create trip object
        Trip trip;
        trip = new Trip(
                (Integer) user.getUserId(),
                (Integer) nearestCab.getCabId(),
                (int) tripDistance,
                (int) fare,
                surgeApplied,
                "✅ Trip booked successfully"
        );

        // Save in trip history
        tripHistory.add(trip);

        return trip;
    }

    // -------------------------------
    // GET TRIP HISTORY
    // -------------------------------
    public List<Trip> getAllTrips() {
        return new ArrayList<>(tripHistory);
    }

    // -------------------------------
    // GET CAB BY ID
    // -------------------------------
    public Cab getCabById(int cabId) {
        return cabMap.get(cabId);
    }

    // -------------------------------
    // DISTANCE FORMULA
    // -------------------------------
    private double distance(double x1, double y1, double x2, double y2) {
        return Math.sqrt(
                Math.pow(x1 - x2, 2) +
                        Math.pow(y1 - y2, 2)
        );
    }

    // -------------------------------
    // TESTING UTILITIES
    // -------------------------------
    public void setActiveUsers(int activeUsers) {
        this.activeUsers = activeUsers;
    }

    public void setAvailableCabs(int availableCabs) {
        this.availableCabs = availableCabs;
    }
}
