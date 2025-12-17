package com.project.booking2.repository;

import com.project.booking2.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookingEntity, Long> {

    List<BookingEntity> findByTripType(String tripType);

    // For auto-generating bookingId
    @Query(
            value = "SELECT b.booking_id FROM booking b " +
                    "WHERE b.booking_id LIKE :prefix% " +
                    "ORDER BY b.booking_id DESC LIMIT 1",
            nativeQuery = true
    )
    String findLastBookingIdForDate(@Param("prefix") String prefix);
}
