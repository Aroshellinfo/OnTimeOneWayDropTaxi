package com.project.booking2.service;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class WhatsAppService {

    private final String FROM_NUMBER = "whatsapp:+14155238886"; // Twilio Sandbox number
    private final String ACCOUNT_SID = System.getenv("TWILIO_SID");
    private final String AUTH_TOKEN = System.getenv("TWILIO_TOKEN");

    public WhatsAppService() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public void sendBookingConfirmation(String userNumber, String message) {
        Message.creator(
                new PhoneNumber("whatsapp:" + userNumber), // User WhatsApp number
                new PhoneNumber(FROM_NUMBER),
                message
        ).create();
    }
}

