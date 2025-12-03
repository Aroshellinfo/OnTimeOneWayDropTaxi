package com.project.booking2.service;

import com.project.booking2.entity.BookingEntity;
import com.project.booking2.repository.BookingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {

    private static final Logger log = LoggerFactory.getLogger(BookingServiceImpl.class);

    private final BookingRepository repo;
    private final EmailSender emailSender;
    private final WhatsAppService whatsAppService;

    public BookingServiceImpl(BookingRepository repo, EmailSender emailSender, WhatsAppService whatsAppService) {
        this.repo = repo;
        this.emailSender = emailSender;
        this.whatsAppService = whatsAppService;
    }

    // CREATE
    @Override
    public BookingEntity create(BookingEntity booking) {

        log.info("Received booking request: {}", booking);

        // Validations
        if (!StringUtils.hasText(booking.getTripType())) {
            log.error("tripType is missing");
            throw new IllegalArgumentException("tripType is required");
        }

        if (!StringUtils.hasText(booking.getEmail())) {
            log.error("email is missing");
            throw new IllegalArgumentException("email is required");
        }

        if (!StringUtils.hasText(booking.getPickup())) {
            log.error("pickup location is missing");
            throw new IllegalArgumentException("pickup is required");
        }

        if (!StringUtils.hasText(booking.getDropLocation())) {
            log.error("dropLocation is missing");
            throw new IllegalArgumentException("dropLocation is required");
        }

        if (!StringUtils.hasText(booking.getMobile())) {
            log.error("mobile number is missing");
            throw new IllegalArgumentException("mobile is required");
        }

        // Normalize tripType
        String type = booking.getTripType()
                .trim()
                .replace(" ", "_")
                .toUpperCase();

        if (type.equals("ONEWAY") || type.equals("ONE_WAY")) {
            type = "ONE_WAY";
        } else if (type.equals("ROUND") || type.equals("ROUND_TRIP") || type.equals("ROUNDTRIP")) {
            type = "ROUND_TRIP";
        }

        booking.setTripType(type);
        log.info("Normalized tripType: {}", type);

        // ONE WAY → remove return fields
        if (type.equals("ONE_WAY")) {
            booking.setReturnDate(null);
            booking.setReturnTime(null);
            log.info("Return fields cleared for ONE_WAY trip");
        }

        // default name
        if (!StringUtils.hasText(booking.getName())) {
            booking.setName("Guest");
        }

        log.info("Saving booking to database...");
        BookingEntity savedBooking = repo.save(booking);

        log.info("Booking saved successfully with ID: {}", savedBooking.getId());

        // Email
        log.info("Sending email to {}", savedBooking.getEmail());
        emailSender.sendEmail(savedBooking);

        // WhatsApp message
        String whatsappMessage = "Booking Confirmed! \n" +
                "ID: " + savedBooking.getId() + "\n" +
                "Name: " + savedBooking.getName() + "\n" +
                "Trip Type: " + savedBooking.getTripType() + "\n" +
                "Pickup: " + savedBooking.getPickup() + "\n" +
                "Drop: " + savedBooking.getDropLocation() + "\n" +
                "Pickup Date: " + savedBooking.getPickupDate() + "\n" +
                "Pickup Time: " + savedBooking.getPickupTime();

        String userNumber = savedBooking.getMobile();
        if (!userNumber.startsWith("+")) {
            userNumber = "+91" + userNumber;
        }

        log.info("Sending WhatsApp message to {}", userNumber);
        whatsAppService.sendBookingConfirmation(userNumber, whatsappMessage);

        log.info("Booking creation flow completed.");

        return savedBooking;
    }

    // READ ALL
    @Override
    public List<BookingEntity> findAll() {
        log.info("Fetching all bookings");
        return repo.findAll();
    }

    // READ ONE
    @Override
    public Optional<BookingEntity> findById(Long id) {
        log.info("Fetching booking by ID: {}", id);
        return repo.findById(id);
    }

    // UPDATE
    @Override
    public BookingEntity update(Long id, BookingEntity booking) {
        log.info("Updating booking with ID: {}", id);

        return repo.findById(id).map(existing -> {

            log.debug("Current booking before update: {}", existing);

            existing.setName(booking.getName());
            existing.setMobile(booking.getMobile());
            existing.setEmail(booking.getEmail());
            existing.setPickup(booking.getPickup());
            existing.setDropLocation(booking.getDropLocation());

            existing.setPickupDate(booking.getPickupDate());
            existing.setPickupTime(booking.getPickupTime());
            existing.setReturnDate(booking.getReturnDate());
            existing.setReturnTime(booking.getReturnTime());

            existing.setTripType(booking.getTripType());
            existing.setSelectedCar(booking.getSelectedCar());

            BookingEntity updated = repo.save(existing);
            log.info("Booking updated successfully ID: {}", id);
            return updated;

        }).orElseThrow(() -> {
            log.error("Booking not found with ID: {}", id);
            return new RuntimeException("Booking not found with id " + id);
        });
    }

    // DELETE
    @Override
    public void delete(Long id) {
        log.warn("Deleting booking with ID: {}", id);
        repo.deleteById(id);
    }

    // FIND BY TRIPTYPE
    @Override
    public List<BookingEntity> findByTripType(String tripType) {
        log.info("Fetching bookings by trip type: {}", tripType);
        return repo.findByTripType(tripType);
    }
}
