package com.project.booking2.repository;
import com.project.booking2.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<BookingEntity, Long> {
    List<BookingEntity> findByTripType(String tripType);
}
