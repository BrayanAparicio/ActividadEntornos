package com.example.backend.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.backend.dto.BookingRequest;
import com.example.backend.dto.BookingResponse;
import com.example.backend.model.Booking;
import com.example.backend.model.Showtime;
import com.example.backend.model.User;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.ShowtimeRepository;
import com.example.backend.repository.UserRepository;

@Service
public class BookingService {

	private final BookingRepository bookingRepository;
	private final ShowtimeRepository showtimeRepository;
	private final UserRepository userRepository;

	public BookingService(BookingRepository bookingRepository, ShowtimeRepository showtimeRepository,
			UserRepository userRepository) {
		this.bookingRepository = bookingRepository;
		this.showtimeRepository = showtimeRepository;
		this.userRepository = userRepository;
	}

	public List<BookingResponse> findAll() {
		return bookingRepository.findAll().stream().map(this::toResponse).toList();
	}

	public List<BookingResponse> findMine(Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		return bookingRepository.findByUserId(user.getId()).stream().map(this::toResponse).toList();
	}

	public BookingResponse create(Authentication authentication, BookingRequest request) {
		User user = (User) authentication.getPrincipal();
		Showtime showtime = showtimeRepository.findById(request.getShowtimeId())
				.orElseThrow(() -> new IllegalArgumentException("Función no encontrada"));
		Booking booking = new Booking(user.getId(), showtime.getId(), request.getSeats(), request.getTotalAmount(),
				request.getPaymentMethod(), "CONFIRMED");
		Booking saved = bookingRepository.save(booking);
		addLoyaltyPoints(user, request.getTotalAmount());
		return toResponse(saved);
	}

	public void cancel(Authentication authentication, String bookingId) {
		User user = (User) authentication.getPrincipal();
		Booking booking = bookingRepository.findById(bookingId)
				.orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada"));
		boolean isOwner = booking.getUserId().equals(user.getId());
		boolean isPrivileged = "ROLE_ADMIN".equals(user.getRole()) || "ROLE_TICKETER".equals(user.getRole());
		if (!isOwner && !isPrivileged) {
			throw new IllegalArgumentException("No tienes permisos para cancelar esta reserva");
		}
		booking.setStatus("CANCELLED");
		bookingRepository.save(booking);
	}

	private void addLoyaltyPoints(User user, Double amount) {
		int earned = (int) Math.floor(amount);
		user.setLoyaltyPoints((user.getLoyaltyPoints() == null ? 0 : user.getLoyaltyPoints()) + earned);
		userRepository.save(user);
	}

	private BookingResponse toResponse(Booking booking) {
		return new BookingResponse(booking.getId(), booking.getUserId(), booking.getShowtimeId(), booking.getSeats(),
				booking.getTotalAmount(), booking.getPaymentMethod(), booking.getStatus(), booking.getCreatedAt());
	}
}
