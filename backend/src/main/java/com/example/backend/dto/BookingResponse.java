package com.example.backend.dto;

import java.time.Instant;
import java.util.List;

public class BookingResponse {

	private String id;
	private String userId;
	private String showtimeId;
	private List<String> seats;
	private Double totalAmount;
	private String paymentMethod;
	private String status;
	private Instant createdAt;

	public BookingResponse() {
	}

	public BookingResponse(String id, String userId, String showtimeId, List<String> seats, Double totalAmount,
			String paymentMethod, String status, Instant createdAt) {
		this.id = id;
		this.userId = userId;
		this.showtimeId = showtimeId;
		this.seats = seats;
		this.totalAmount = totalAmount;
		this.paymentMethod = paymentMethod;
		this.status = status;
		this.createdAt = createdAt;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getShowtimeId() {
		return showtimeId;
	}

	public void setShowtimeId(String showtimeId) {
		this.showtimeId = showtimeId;
	}

	public List<String> getSeats() {
		return seats;
	}

	public void setSeats(List<String> seats) {
		this.seats = seats;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
}
