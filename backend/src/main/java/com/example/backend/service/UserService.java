package com.example.backend.service;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.dto.AuthResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService,
			AuthenticationManager authenticationManager) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}

	@Transactional
	public AuthResponse register(RegisterRequest request) {
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new IllegalArgumentException("Ya existe un usuario con el correo proporcionado.");
		}
		User user = new User(request.getEmail(), request.getFullName(),
				passwordEncoder.encode(request.getPassword()), "ROLE_CLIENT");
		user.setPhone(request.getPhone());
		user.setNotificationPreference(request.getNotificationPreference());
		User saved = userRepository.save(user);
		String token = jwtService.generateToken(saved);
		return new AuthResponse(token, saved.getEmail(), saved.getFullName(), saved.getRole());
	}

	public AuthResponse login(LoginRequest request) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		User principal = (User) authentication.getPrincipal();
		String token = jwtService.generateToken(principal);
		return new AuthResponse(token, principal.getEmail(), principal.getFullName(), principal.getRole());
	}

	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
}
