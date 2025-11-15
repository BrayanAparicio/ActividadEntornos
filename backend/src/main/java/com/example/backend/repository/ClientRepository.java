package com.example.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.model.Client;

public interface ClientRepository extends MongoRepository<Client, String> {
}
