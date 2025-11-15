package com.example.backend.model;

import java.util.Map;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "rooms")
public class Room {

	@Id
	private String id;

	private String name;

	private String location;

	private String type; // NORMAL, 3D

	private Integer capacity;

	private Map<String, Double> priceByAudience; // ADULT, CHILD, SENIOR

	public Room() {
	}

	public Room(String name, String location, String type, Integer capacity, Map<String, Double> priceByAudience) {
		this.name = name;
		this.location = location;
		this.type = type;
		this.capacity = capacity;
		this.priceByAudience = priceByAudience;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getCapacity() {
		return capacity;
	}

	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}

	public Map<String, Double> getPriceByAudience() {
		return priceByAudience;
	}

	public void setPriceByAudience(Map<String, Double> priceByAudience) {
		this.priceByAudience = priceByAudience;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Room room = (Room) o;
		return Objects.equals(id, room.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}
