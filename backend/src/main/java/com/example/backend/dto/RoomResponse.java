package com.example.backend.dto;

import java.util.Map;

public class RoomResponse {

	private String id;
	private String name;
	private String location;
	private String type;
	private Integer capacity;
	private Map<String, Double> priceByAudience;

	public RoomResponse() {
	}

	public RoomResponse(String id, String name, String location, String type, Integer capacity,
			Map<String, Double> priceByAudience) {
		this.id = id;
		this.name = name;
		this.location = location;
		this.type = type;
		this.capacity = capacity;
		this.priceByAudience = priceByAudience;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
}
