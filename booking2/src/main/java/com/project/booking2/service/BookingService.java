package com.project.booking2.service;
import com.project.booking2.entity.BookingEntity;
import java.util.List;
import java.util.Optional;

public interface BookingService {
    BookingEntity create(BookingEntity booking);
    List<BookingEntity> findAll();
    Optional<BookingEntity> findById(Long id);
    BookingEntity update(Long id, BookingEntity booking);
    void delete(Long id);
    List<BookingEntity> findByTripType(String tripType);
}

