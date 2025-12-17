//package com.project.booking2.service;
//import com.twilio.Twilio;
//import com.twilio.rest.api.v2010.account.Message;
//import com.twilio.type.PhoneNumber;
//import org.springframework.stereotype.Service;
//
//@Service
//public class WhatsAppService {
//
//    private final String FROM_NUMBER = "whatsapp:+14155238886"; // Twilio Sandbox number
//    private final String ACCOUNT_SID = "AC2b3136bfc51a5e0dd139d124811786a0";
//    private final String AUTH_TOKEN = "6d023c52787e9eb6dade161bc28007a3";
//
//    public WhatsAppService() {
//        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
//    }
//
//    public void sendBookingConfirmation(String userNumber, String message) {
//        Message.creator(
//                new PhoneNumber("whatsapp:" + userNumber), // User WhatsApp number
//                new PhoneNumber(FROM_NUMBER),
//                message
//        ).create();
//    }
//}
//
