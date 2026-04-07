package com.CabBooking.repository;

import com.CabBooking.model.Cab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CabRepository extends JpaRepository<Cab, Long> {

    @Query("SELECT c FROM Cab c WHERE c.available = true ORDER BY c.id ASC LIMIT 1")
    Cab findNearestAvailableCab();
}
