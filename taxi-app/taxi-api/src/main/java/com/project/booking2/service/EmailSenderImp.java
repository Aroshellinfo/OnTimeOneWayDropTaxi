package com.project.booking2.service;

import com.project.booking2.entity.BookingEntity;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Properties;

//@Service
//public class EmailSenderImp implements EmailSender {
//
//    @Autowired
//    private JavaMailSender javaMailSender;
//
//    @Value("${spring.mail.username}")
//    private String sender;
//
//   //email sending
//    @Override
//    public String sendEmail(BookingEntity booking) {
//
//        System.out.println("Email method called: " + booking.getEmail());
//        try {
//            SimpleMailMessage mailMessage = new SimpleMailMessage();
//
//            mailMessage.setFrom(sender);
//            mailMessage.setTo(booking.getEmail());
//            mailMessage.setSubject("Booking Confirmation");
//
//            String body =
//                    "Hi " + booking.getName() + ",\n\n" +
//                            "Your booking has been confirmed!\n\n" +
//                            "Pickup: " + booking.getPickup() + "\n" +
//                            "Drop: " + booking.getDropLocation() + "\n\n" +
//                            "Thank you for choosing our service!";
//
//            mailMessage.setText(body);
//
//            javaMailSender.send(mailMessage);
//            return "Booking confirmation email sent!";
//        } catch (Exception e) {
//            return "Error while sending email: " + e.getMessage();
//        }
//    }
//    @Override
//    public String sendEmailAttachment(BookingEntity booking) {
//
//        String username = sender;     // gmail
//        String password = "smwvmzwwplsmbixa";  // remove booking.getAppPassword()
//
//        Properties props = new Properties();
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.smtp.host", "smtp.gmail.com");
//        props.put("mail.smtp.port", "587");
//
//        Session session = Session.getInstance(props,
//                new Authenticator() {
//                    @Override
//                    protected PasswordAuthentication getPasswordAuthentication() {
//                        return new PasswordAuthentication(username, password);
//                    }
//                });
//
//        try {
//            Message message = new MimeMessage(session);
//            message.setFrom(new InternetAddress(username));
//            message.setRecipients(
//                    Message.RecipientType.TO,
//                    InternetAddress.parse(booking.getEmail())
//            );
//            message.setSubject("Booking Details With Attachment");
//            message.setText("Your booking details are attached.");
//
//            Transport.send(message);
//            return "Mail with attachment sent!";
//        } catch (MessagingException e) {
//            return "Mail not sent: " + e.getMessage();
//        }
//    }
//}
//
//
