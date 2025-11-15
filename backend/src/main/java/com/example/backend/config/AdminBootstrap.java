package com.example.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

@Component
public class AdminBootstrap implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(AdminBootstrap.class);

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final String email;
	private final String password;
	private final String name;

	public AdminBootstrap(UserRepository userRepository, PasswordEncoder passwordEncoder,
			@Value("${app.admin.email}") String email,
			@Value("${app.admin.password}") String password,
			@Value("${app.admin.name}") String name) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.email = email;
		this.password = password;
		this.name = name;
	}

	@Override
	public void run(String... args) {
		createIfMissing(email, name, password, "ROLE_ADMIN");
		createIfMissing("taquilla@demo.com", "Taquillero Generico", "Taquilla123!", "ROLE_TICKETER");
		createIfMissing("cliente.demo@demo.com", "Cliente Demo", "Cliente123!", "ROLE_CLIENT");
	}

	private void createIfMissing(String email, String fullName, String rawPassword, String role) {
		if (userRepository.existsByEmail(email)) {
			return;
		}
		User admin = new User(email, fullName, passwordEncoder.encode(rawPassword), role);
		userRepository.save(admin);
		log.info("Usuario {} creado con correo {}", role, email);
	}
}
