package com.example.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.model.Showtime;

public interface ShowtimeRepository extends MongoRepository<Showtime, String> {
}
