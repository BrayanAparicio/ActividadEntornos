package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ClientRequest;
import com.example.backend.dto.ClientResponse;
import com.example.backend.service.ClientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "${CORS_ALLOWED_ORIGINS:http://localhost:5173}", allowCredentials = "true")
public class ClientController {

	private final ClientService clientService;

	public ClientController(ClientService clientService) {
		this.clientService = clientService;
	}

	@GetMapping
	public ResponseEntity<List<ClientResponse>> findAll() {
		return ResponseEntity.ok(clientService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ClientResponse> findById(@PathVariable String id) {
		return ResponseEntity.ok(clientService.findById(id));
	}

	@PostMapping
	public ResponseEntity<ClientResponse> create(@Valid @RequestBody ClientRequest request) {
		return ResponseEntity.ok(clientService.create(request));
	}

	@PutMapping("/{id}")
	public ResponseEntity<ClientResponse> update(@PathVariable String id, @Valid @RequestBody ClientRequest request) {
		return ResponseEntity.ok(clientService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable String id) {
		clientService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
