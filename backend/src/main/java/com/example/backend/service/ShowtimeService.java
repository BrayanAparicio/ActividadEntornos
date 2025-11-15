package com.example.backend.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dto.ShowtimeRequest;
import com.example.backend.dto.ShowtimeResponse;
import com.example.backend.model.Movie;
import com.example.backend.model.Room;
import com.example.backend.model.Showtime;
import com.example.backend.repository.MovieRepository;
import com.example.backend.repository.RoomRepository;
import com.example.backend.repository.ShowtimeRepository;

@Service
public class ShowtimeService {

	private final ShowtimeRepository showtimeRepository;
	private final MovieRepository movieRepository;
	private final RoomRepository roomRepository;

	public ShowtimeService(ShowtimeRepository showtimeRepository, MovieRepository movieRepository,
			RoomRepository roomRepository) {
		this.showtimeRepository = showtimeRepository;
		this.movieRepository = movieRepository;
		this.roomRepository = roomRepository;
	}

	public List<ShowtimeResponse> findAll() {
		return showtimeRepository.findAll().stream().map(this::toResponse).toList();
	}

	public ShowtimeResponse create(ShowtimeRequest request) {
		Movie movie = movieRepository.findById(request.getMovieId())
				.orElseThrow(() -> new IllegalArgumentException("Película no encontrada"));
		Room room = roomRepository.findById(request.getRoomId())
				.orElseThrow(() -> new IllegalArgumentException("Sala no encontrada"));
		Instant endTime = calculateEndTime(request.getStartTime(), movie.getDurationMinutes(),
				request.getPreparationMinutes());
		validateCapacity(room);
		Showtime showtime = new Showtime(movie.getId(), room.getId(), request.getStartTime(), endTime,
				request.getPreparationMinutes());
		return toResponse(showtimeRepository.save(showtime));
	}

	public ShowtimeResponse update(String id, ShowtimeRequest request) {
		Showtime showtime = showtimeRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Función no encontrada"));
		Movie movie = movieRepository.findById(request.getMovieId())
				.orElseThrow(() -> new IllegalArgumentException("Película no encontrada"));
		roomRepository.findById(request.getRoomId())
				.orElseThrow(() -> new IllegalArgumentException("Sala no encontrada"));
		Instant endTime = calculateEndTime(request.getStartTime(), movie.getDurationMinutes(),
				request.getPreparationMinutes());
		showtime.setMovieId(movie.getId());
		showtime.setRoomId(request.getRoomId());
		showtime.setStartTime(request.getStartTime());
		showtime.setEndTime(endTime);
		showtime.setPreparationMinutes(request.getPreparationMinutes());
		return toResponse(showtimeRepository.save(showtime));
	}

	public void delete(String id) {
		showtimeRepository.deleteById(id);
	}

	private Instant calculateEndTime(Instant startTime, Integer duration, Integer prepMinutes) {
		int totalMinutes = (duration != null ? duration : 0) + (prepMinutes != null ? prepMinutes : 0);
		return startTime.plus(totalMinutes, ChronoUnit.MINUTES);
	}

	private void validateCapacity(Room room) {
		if (room.getCapacity() == null || room.getCapacity() <= 0) {
			throw new IllegalArgumentException("La sala no tiene una capacidad válida configurada.");
		}
	}

	private ShowtimeResponse toResponse(Showtime showtime) {
		return new ShowtimeResponse(showtime.getId(), showtime.getMovieId(), showtime.getRoomId(),
				showtime.getStartTime(), showtime.getEndTime(), showtime.getPreparationMinutes());
	}
}
