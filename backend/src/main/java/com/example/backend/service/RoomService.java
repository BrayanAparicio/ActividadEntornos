package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dto.RoomRequest;
import com.example.backend.dto.RoomResponse;
import com.example.backend.model.Room;
import com.example.backend.repository.RoomRepository;

@Service
public class RoomService {

	private final RoomRepository roomRepository;

	public RoomService(RoomRepository roomRepository) {
		this.roomRepository = roomRepository;
	}

	public List<RoomResponse> findAll() {
		return roomRepository.findAll().stream().map(this::toResponse).toList();
	}

	public RoomResponse create(RoomRequest request) {
		Room room = new Room(request.getName(), request.getLocation(), request.getType(), request.getCapacity(),
				request.getPriceByAudience());
		return toResponse(roomRepository.save(room));
	}

	public RoomResponse update(String id, RoomRequest request) {
		Room room = roomRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Sala no encontrada"));
		room.setName(request.getName());
		room.setLocation(request.getLocation());
		room.setType(request.getType());
		room.setCapacity(request.getCapacity());
		room.setPriceByAudience(request.getPriceByAudience());
		return toResponse(roomRepository.save(room));
	}

	public void delete(String id) {
		roomRepository.deleteById(id);
	}

	private RoomResponse toResponse(Room room) {
		return new RoomResponse(room.getId(), room.getName(), room.getLocation(), room.getType(), room.getCapacity(),
				room.getPriceByAudience());
	}
}
