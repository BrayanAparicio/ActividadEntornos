package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.BookingRequest;
import com.example.backend.dto.BookingResponse;
import com.example.backend.service.BookingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "${CORS_ALLOWED_ORIGINS:http://localhost:5173}", allowCredentials = "true")
public class BookingController {

	private final BookingService bookingService;

	public BookingController(BookingService bookingService) {
		this.bookingService = bookingService;
	}

	@GetMapping
	@PreAuthorize("hasRole('ADMIN') or hasRole('TICKETER')")
	public ResponseEntity<List<BookingResponse>> findAll() {
		return ResponseEntity.ok(bookingService.findAll());
	}

	@GetMapping("/mine")
	public ResponseEntity<List<BookingResponse>> findMine(Authentication authentication) {
		return ResponseEntity.ok(bookingService.findMine(authentication));
	}

	@PostMapping
	public ResponseEntity<BookingResponse> create(Authentication authentication,
			@Valid @RequestBody BookingRequest request) {
		return ResponseEntity.ok(bookingService.create(authentication, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> cancel(Authentication authentication, @PathVariable String id) {
		bookingService.cancel(authentication, id);
		return ResponseEntity.noContent().build();
	}
}
