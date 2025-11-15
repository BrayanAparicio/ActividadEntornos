package com.example.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.model.Booking;

public interface BookingRepository extends MongoRepository<Booking, String> {

	List<Booking> findByUserId(String userId);
}
