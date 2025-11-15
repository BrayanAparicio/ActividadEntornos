package com.example.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.model.Room;

public interface RoomRepository extends MongoRepository<Room, String> {
}
