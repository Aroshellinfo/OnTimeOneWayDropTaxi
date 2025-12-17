package com.project.booking2.service;

import com.project.booking2.entity.BookingEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailSender {

    private static final Logger log = LoggerFactory.getLogger(EmailSender.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Value("${spring.company.mail}")
    private String companyMail;

    public void sendEmail(BookingEntity booking) {

        sendUserEmail(booking);
        sendCompanyEmail(booking);
    }

    private void sendUserEmail(BookingEntity booking) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(sender);
            message.setTo(booking.getEmail());
            message.setSubject("Your ride is confirmed");

            String body =
                    "Hi " + booking.getName() + ",\n\n" +
                            "Thank you for booking your ride with On Time One Way Drop Taxi.\n" +
                            "Your cab has been confirmed successfully.\n\n" +
                            "Booking Details:\n" +
                            "Booking ID: " + booking.getBookingId() + "\n" +
                            "Pickup Location: " + booking.getPickup() + "\n" +
                            "Drop Location: " + booking.getDropLocation() + "\n" +
                            "Pickup Date: " + booking.getPickupDate() + "\n" +
                            "Pickup Time: " + booking.getPickupTime() + "\n" +
                            "Vehicle Type: " + booking.getSelectedCar() + "\n\n" +
                            "Thank you!\n" +
                            "On Time One Way Drop Taxi";

            message.setText(body);
            mailSender.send(message);

            log.info("Email sent to user: {}", booking.getEmail());

        } catch (Exception e) {
            log.error("Failed to send email to user: {}", booking.getEmail(), e);
        }
    }

    private void sendCompanyEmail(BookingEntity booking) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(sender);
            message.setTo(companyMail);
            message.setSubject("New Booking Received");

            String body =
                    "New booking received.\n\n" +
                            "Booking Details:\n" +
                            "Booking ID: " + booking.getBookingId() + "\n" +
                            "Name: " + booking.getName() + "\n" +
                            "Mobile: " + booking.getMobile() + "\n" +
                            "Pickup: " + booking.getPickup() + "\n" +
                            "Drop: " + booking.getDropLocation() + "\n" +
                            "Pickup Date: " + booking.getPickupDate() + "\n" +
                            "Pickup Time: " + booking.getPickupTime() + "\n" +
                            "trip type: " + booking.getTripType() + "\n" +
                            "Vehicle: " + booking.getSelectedCar() + "\n\n" +
                            "Regards \n " +
                            "On Time One Way Drop Taxi";


            message.setText(body);
            mailSender.send(message);

            log.info("Booking details sent to company email: {}", companyMail);

        } catch (Exception e) {
            log.error("Failed to send booking details to company email: {}", companyMail, e);
        }
    }
}