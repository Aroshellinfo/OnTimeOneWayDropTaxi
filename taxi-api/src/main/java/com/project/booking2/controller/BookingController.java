package com.project.booking2.controller;

import com.project.booking2.entity.BookingEntity;
import com.project.booking2.service.BookingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private static final Logger log = LoggerFactory.getLogger(BookingController.class);

    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<BookingEntity> create(@RequestBody BookingEntity booking) {

        log.info("Received CREATE request: {}", booking);

        // Default values
        if (!StringUtils.hasText(booking.getName())) {
            log.debug("Name was empty, setting default name 'Guest'");
            booking.setName("Guest");
        }

        // If trip is ONE_WAY, remove return details
        if ("ONE_WAY".equalsIgnoreCase(booking.getTripType())
                || "oneway".equalsIgnoreCase(booking.getTripType())) {

            log.debug("Trip type is ONE_WAY → removing return date/time");
            booking.setReturnDate(null);
            booking.setReturnTime(null);
        }

        BookingEntity saved = service.create(booking);
        log.info("Booking created successfully with ID: {}", saved.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public List<BookingEntity> getAll(@RequestParam(required = false) String tripType) {

        if (tripType != null) {
            log.info("Fetching bookings by trip type: {}", tripType);
            String type = tripType.trim().replace(" ", "_").toUpperCase();
            return service.findByTripType(type);
        }

        log.info("Fetching all bookings");
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingEntity> getById(@PathVariable Long id) {

        log.info("Fetching booking by ID: {}", id);

        return service.findById(id)
                .map(b -> {
                    log.info("Booking found: {}", b);
                    return ResponseEntity.ok(b);
                })
                .orElseGet(() -> {
                    log.warn("Booking NOT FOUND for ID: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingEntity> update(@PathVariable Long id,
                                                @RequestBody BookingEntity booking) {

        log.info("Received UPDATE request for ID {}: {}", id, booking);

        BookingEntity updated = service.update(id, booking);

        log.info("Booking updated successfully for ID: {}", id);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {

        log.info("Deleting booking with ID: {}", id);

        service.delete(id);

        log.info("Booking deleted successfully: {}", id);
        return ResponseEntity.ok("Booking deleted successfully!");
    }
}
