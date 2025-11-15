package com.example.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.model.Movie;

public interface MovieRepository extends MongoRepository<Movie, String> {
}
