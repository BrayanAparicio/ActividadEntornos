package com.example.backend.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = "${CORS_ALLOWED_ORIGINS:http://localhost:5173}", allowCredentials = "true")
public class AccountController {

	private final UserRepository userRepository;

	public AccountController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping
	public ResponseEntity<User> me(@AuthenticationPrincipal User user) {
		return ResponseEntity.ok(user);
	}

	@PatchMapping
	public ResponseEntity<User> update(@AuthenticationPrincipal User principal,
			@RequestBody Map<String, String> request) {
		principal.setFullName(request.getOrDefault("fullName", principal.getFullName()));
		principal.setPhone(request.getOrDefault("phone", principal.getPhone()));
		principal.setNotificationPreference(
				request.getOrDefault("notificationPreference", principal.getNotificationPreference()));
		return ResponseEntity.ok(userRepository.save(principal));
	}
}
