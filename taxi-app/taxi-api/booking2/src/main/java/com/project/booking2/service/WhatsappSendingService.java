//package com.project.booking2.service;
//
//
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class WhatsappSendingService {
//
//    @Value("${whatsapp.token}")
//    private String whatsappToken;
//
//    @Value("${whatsapp.phone.number.id}")
//    private String phoneNumberId;
//
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    public void sendBookingConfirmation(String userNumber, String message) {
//
//        String url = "https://graph.facebook.com/v20.0/" + phoneNumberId + "/messages";
//
//        Map<String, Object> payload = new HashMap<>();
//        payload.put("messaging_product", "whatsapp");
//        payload.put("to", userNumber);
//        payload.put("type", "text");
//
//        Map<String, String> text = new HashMap<>();
//        text.put("body", message);
//
//        payload.put("text", text);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.setBearerAuth(whatsappToken);
//
//        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
//
//        try {
//            restTemplate.postForObject(url, entity, String.class);
//            System.out.println("WhatsApp message sent successfully to " + userNumber);
//        } catch (Exception e) {
//            System.out.println("Failed to send WhatsApp message: " + e.getMessage());
//        }
//    }
//}
//
