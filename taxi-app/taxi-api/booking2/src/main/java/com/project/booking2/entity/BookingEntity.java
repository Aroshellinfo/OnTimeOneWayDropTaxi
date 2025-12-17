package com.project.booking2.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "booking")
public class BookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Your custom booking ID (primary key)
    @Column(length = 20, unique = true)
    private String bookingId;

    private String tripType;        // oneway / round
    private String selectedCar;     // Sedan / SUV etc

    private String pickup;          // pickup location
    @Column(name = "drop_location")
    private String dropLocation;           // drop location

    private String pickupDate;      // string from input type=date
    private String returnDate;      // string

    private String pickupTime;      // string from time input
    private String returnTime;      // string

    private String mobile;
    private String name;
    private String email;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTripType() {
        return tripType;
    }

    public void setTripType(String tripType) {
        this.tripType = tripType;
    }

    public String getSelectedCar() {
        return selectedCar;
    }

    public void setSelectedCar(String selectedCar) {
        this.selectedCar = selectedCar;
    }

    public String getPickup() {
        return pickup;
    }

    public void setPickup(String pickup) {
        this.pickup = pickup;
    }

    public String getDropLocation() {
        return dropLocation;
    }

    public void setDropLocation(String dropLocation) {
        this.dropLocation = dropLocation;
    }

    public String getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(String pickupDate) {
        this.pickupDate = pickupDate;
    }

    public String getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }

    public String getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(String pickupTime) {
        this.pickupTime = pickupTime;
    }

    public String getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(String returnTime) {
        this.returnTime = returnTime;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        this.updatedAt = this.createdAt;


        if (this.name == null || this.name.isEmpty()) {
            this.name = "Guest";
        }
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        if (this.name == null || this.name.isEmpty()) {
            this.name = "Guest";
        }
    }
}
