package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ShowtimeRequest;
import com.example.backend.dto.ShowtimeResponse;
import com.example.backend.service.ShowtimeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/showtimes")
@CrossOrigin(origins = "${CORS_ALLOWED_ORIGINS:http://localhost:5173}", allowCredentials = "true")
public class ShowtimeController {

	private final ShowtimeService showtimeService;

	public ShowtimeController(ShowtimeService showtimeService) {
		this.showtimeService = showtimeService;
	}

	@GetMapping
	public ResponseEntity<List<ShowtimeResponse>> findAll() {
		return ResponseEntity.ok(showtimeService.findAll());
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN') or hasRole('TICKETER')")
	public ResponseEntity<ShowtimeResponse> create(@Valid @RequestBody ShowtimeRequest request) {
		return ResponseEntity.ok(showtimeService.create(request));
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('TICKETER')")
	public ResponseEntity<ShowtimeResponse> update(@PathVariable String id, @Valid @RequestBody ShowtimeRequest request) {
		return ResponseEntity.ok(showtimeService.update(id, request));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('TICKETER')")
	public ResponseEntity<Void> delete(@PathVariable String id) {
		showtimeService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
