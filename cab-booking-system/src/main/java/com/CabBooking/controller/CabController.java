package com.CabBooking.controller;

import com.CabBooking.dto.TripResponse;
import com.CabBooking.model.Cab;
import com.CabBooking.model.Trip;
import com.CabBooking.model.User;
import com.CabBooking.service.CabService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/cabs")
public class CabController {

    private final CabService cabService;
    private final SimpMessagingTemplate messagingTemplate;

    public CabController(CabService cabService, SimpMessagingTemplate messagingTemplate) {
        this.cabService = cabService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addCab(@RequestBody Cab cab) {
        cabService.addCab(cab);
        return ResponseEntity.ok("Cab added: " + cab.getCabId());
    }

    @PostMapping("/book")
    public TripResponse bookCab(@RequestBody User user) {
        Trip trip = cabService.bookCab(user);
        return new TripResponse(trip);
    }

    @PutMapping("/update-location/{cabId}")
    public ResponseEntity<String> updateLocation(
            @PathVariable int cabId,
            @RequestParam double x,
            @RequestParam double y) {
        Cab updated = cabService.getCabById(cabId);
        messagingTemplate.convertAndSend("/topic/cabs", updated);
        cabService.updateCabLocation(cabId, x, y);
        return ResponseEntity.ok("Cab " + cabId + " location updated.");
    }

    @GetMapping("/available")
    public List<Cab> getAvailableCabs() {
        return cabService.getAllAvailableCabs();
    }

    @GetMapping("/trips")
    public ResponseEntity<List<TripResponse>> getAllTrips() {
        return ResponseEntity.ok(
                cabService.getAllTrips()
                        .stream()
                        .map(TripResponse::new)
                        .toList()
        );
    }
}
