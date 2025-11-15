package com.example.backend.dto;

import java.util.Map;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class RoomRequest {

	@NotBlank
	private String name;

	@NotBlank
	private String location;

	@NotBlank
	private String type;

	@NotNull
	@Min(20)
	private Integer capacity;

	@NotNull
	private Map<String, Double> priceByAudience;

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
