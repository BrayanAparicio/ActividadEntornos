package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.StaffRequest;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "${CORS_ALLOWED_ORIGINS:http://localhost:5173}", allowCredentials = "true")
public class StaffController {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public StaffController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<User>> list() {
		return ResponseEntity.ok(
				userRepository.findAll().stream().filter(user -> !user.getRole().equals("ROLE_CLIENT")).toList());
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<User> create(@Valid @RequestBody StaffRequest request) {
		User user = new User(request.getEmail(), request.getFullName(), passwordEncoder.encode(request.getPassword()),
				request.getRole());
		return ResponseEntity.ok(userRepository.save(user));
	}
}
