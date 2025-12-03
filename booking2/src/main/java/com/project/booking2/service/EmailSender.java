package com.project.booking2.service;

import com.project.booking2.entity.BookingEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSender {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender; // your configured email in application.properties

    // Send email using BookingEntity directly
    public void sendEmail(BookingEntity booking) {

        // DEBUG: print user email and booking details
        System.out.println("DEBUG: Email method called for: " + booking.getEmail());
        System.out.println("DEBUG: Booking details: " + booking);

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(sender); // must match spring.mail.username
            message.setTo(booking.getEmail());
            message.setSubject("Your ride is confirmed");

            String body = "Hi " + booking.getName() + ",\n\n" +
                    "Thank you for booking your ride with on time one way drop taxi.\n" +
                    "We’re happy to confirm that your cab has been successfully scheduled. \n\n" +
                    "Booking Details:\n\n" +
                    "Booking ID: " + booking.getId() + "\n" +
                    "Date: " + booking.getPickupDate() + "\n" +
                    "Pickup time: " +booking.getPickupTime() +"\n"+
                    "Pickup Location: " + booking.getPickup() + "\n" +
                    "Drop-off Location: " + booking.getDropLocation() + "\n" +
                    "Vehicle Type: " + booking.getSelectedCar() + "\n\n" +
                    "Thank you for riding with us!.\n" +
                    "-On time one way drop taxi.\n ";

            message.setText(body);

            mailSender.send(message);

            System.out.println("DEBUG: Email sent successfully to " + booking.getEmail());
        } catch (Exception e) {
            System.out.println("DEBUG: Error sending email: " + e.getMessage());
        }
    }
    // Optional: you can keep your previous method too
    public void sendBookingConfirmation(String toEmail, String bookingDetails) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(toEmail);
        message.setSubject("Booking Confirmation");
        message.setText(bookingDetails);
        mailSender.send(message);
        System.out.println("Email sent successfully!");
    }
}
