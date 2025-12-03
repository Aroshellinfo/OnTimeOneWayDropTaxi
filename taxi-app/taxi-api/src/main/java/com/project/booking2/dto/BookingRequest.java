// BookingRequest.java (DTO)
package com.project.booking2.dto;

import com.project.booking2.mordel.TripType;
import com.project.booking2.mordel.VehicleType;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public class BookingRequest {

    @NotNull
    private TripType tripType;

    @NotNull
    private VehicleType vehicleType;

    @Email @NotBlank
    private String email;

    @NotBlank
    private String pickupLocation;

    @NotBlank
    private String dropLocation;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate pickupDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate returnDate;

    @NotNull
    @JsonFormat(pattern = "HH:mm")
    private LocalTime pickupTime;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime returnTime;

    @NotBlank
    private String mobile;

    private String name;

    // getters and setters...
}
