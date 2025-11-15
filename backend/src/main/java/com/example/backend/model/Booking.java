package com.example.backend.model;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookings")
public class Booking {

	@Id
	private String id;

	private String userId;

	private String showtimeId;

	private List<String> seats;

	private Double totalAmount;

	private String paymentMethod;

	private String status; // CONFIRMED, CANCELLED

	@CreatedDate
	private Instant createdAt;

	public Booking() {
	}

	public Booking(String userId, String showtimeId, List<String> seats, Double totalAmount, String paymentMethod,
			String status) {
		this.userId = userId;
		this.showtimeId = showtimeId;
		this.seats = seats;
		this.totalAmount = totalAmount;
		this.paymentMethod = paymentMethod;
		this.status = status;
	}

	public String getId() {
		return id;
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

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Booking booking = (Booking) o;
		return Objects.equals(id, booking.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}
