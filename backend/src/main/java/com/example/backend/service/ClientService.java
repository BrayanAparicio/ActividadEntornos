package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dto.ClientRequest;
import com.example.backend.dto.ClientResponse;
import com.example.backend.model.Client;
import com.example.backend.repository.ClientRepository;

@Service
public class ClientService {

	private final ClientRepository clientRepository;

	public ClientService(ClientRepository clientRepository) {
		this.clientRepository = clientRepository;
	}

	public List<ClientResponse> findAll() {
		return clientRepository.findAll().stream().map(this::toResponse).toList();
	}

	public ClientResponse findById(String id) {
		Client client = clientRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
		return toResponse(client);
	}

	public ClientResponse create(ClientRequest request) {
		Client client = new Client(request.getName(), request.getEmail(), request.getPhone(), request.getNotes());
		Client saved = clientRepository.save(client);
		return toResponse(saved);
	}

	public ClientResponse update(String id, ClientRequest request) {
		Client client = clientRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
		client.setName(request.getName());
		client.setEmail(request.getEmail());
		client.setPhone(request.getPhone());
		client.setNotes(request.getNotes());
		return toResponse(clientRepository.save(client));
	}

	public void delete(String id) {
		if (!clientRepository.existsById(id)) {
			throw new IllegalArgumentException("Cliente no encontrado");
		}
		clientRepository.deleteById(id);
	}

	private ClientResponse toResponse(Client client) {
		return new ClientResponse(client.getId(), client.getName(), client.getEmail(), client.getPhone(),
				client.getNotes(), client.getCreatedAt(), client.getUpdatedAt());
	}
}
