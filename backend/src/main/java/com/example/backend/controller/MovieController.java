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

import com.example.backend.dto.MovieRequest;
import com.example.backend.dto.MovieResponse;
import com.example.backend.service.MovieService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "${CORS_ALLOWED_ORIGINS:http://localhost:5173}", allowCredentials = "true")
public class MovieController {

	private final MovieService movieService;

	public MovieController(MovieService movieService) {
		this.movieService = movieService;
	}

	@GetMapping
	public ResponseEntity<List<MovieResponse>> findAll() {
		return ResponseEntity.ok(movieService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<MovieResponse> findById(@PathVariable String id) {
		return ResponseEntity.ok(movieService.findById(id));
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN') or hasRole('TICKETER')")
	public ResponseEntity<MovieResponse> create(@Valid @RequestBody MovieRequest request) {
		return ResponseEntity.ok(movieService.create(request));
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('TICKETER')")
	public ResponseEntity<MovieResponse> update(@PathVariable String id, @Valid @RequestBody MovieRequest request) {
		return ResponseEntity.ok(movieService.update(id, request));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('TICKETER')")
	public ResponseEntity<Void> delete(@PathVariable String id) {
		movieService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
