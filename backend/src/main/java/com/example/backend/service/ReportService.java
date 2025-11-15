package com.example.backend.service;

import java.time.Instant;
import java.util.DoubleSummaryStatistics;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.backend.model.Booking;
import com.example.backend.model.Movie;
import com.example.backend.model.Room;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.MovieRepository;
import com.example.backend.repository.RoomRepository;
import com.example.backend.repository.ShowtimeRepository;

@Service
public class ReportService {

	private final BookingRepository bookingRepository;
	private final MovieRepository movieRepository;
	private final RoomRepository roomRepository;
	private final ShowtimeRepository showtimeRepository;

	public ReportService(BookingRepository bookingRepository, MovieRepository movieRepository,
			RoomRepository roomRepository, ShowtimeRepository showtimeRepository) {
		this.bookingRepository = bookingRepository;
		this.movieRepository = movieRepository;
		this.roomRepository = roomRepository;
		this.showtimeRepository = showtimeRepository;
	}

	public Map<String, Object> getDashboard() {
		List<Booking> bookings = bookingRepository.findAll();
		DoubleSummaryStatistics summary = bookings.stream()
				.filter(b -> "CONFIRMED".equals(b.getStatus()))
				.collect(Collectors.summarizingDouble(this::amount));

		Map<String, Double> byMovie = bookings.stream()
				.filter(b -> "CONFIRMED".equals(b.getStatus()))
				.collect(Collectors.groupingBy(this::movieName, Collectors.summingDouble(this::amount)));
		Map<String, Double> byRoom = bookings.stream()
				.filter(b -> "CONFIRMED".equals(b.getStatus()))
				.collect(Collectors.groupingBy(this::roomName, Collectors.summingDouble(this::amount)));
		Map<String, Long> byPayment = bookings.stream()
				.filter(b -> "CONFIRMED".equals(b.getStatus()))
				.collect(Collectors.groupingBy(Booking::getPaymentMethod, Collectors.counting()));

		return Map.of(
				"totalSales", summary.getSum(),
				"transactions", summary.getCount(),
				"avgTicket", summary.getCount() == 0 ? 0 : summary.getAverage(),
				"salesByMovie", byMovie,
				"salesByRoom", byRoom,
				"countByPaymentMethod", byPayment,
				"lastUpdate", Instant.now());
	}

	private double amount(Booking booking) {
		return booking.getTotalAmount() == null ? 0 : booking.getTotalAmount();
	}

	private String movieName(Booking booking) {
		return showtimeRepository.findById(booking.getShowtimeId())
				.flatMap(showtime -> movieRepository.findById(showtime.getMovieId()))
				.map(Movie::getTitle)
				.orElse("N/D");
	}

	private String roomName(Booking booking) {
		return showtimeRepository.findById(booking.getShowtimeId())
				.flatMap(showtime -> roomRepository.findById(showtime.getRoomId()))
				.map(Room::getName)
				.orElse("N/D");
	}
}
