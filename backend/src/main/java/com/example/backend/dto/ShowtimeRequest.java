package com.example.backend.dto;

import java.time.Instant;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ShowtimeRequest {

	@NotBlank
	private String movieId;

	@NotBlank
	private String roomId;

	@NotNull
	private Instant startTime;

	@NotNull
	@Min(5)
	private Integer preparationMinutes;

	public String getMovieId() {
		return movieId;
	}

	public void setMovieId(String movieId) {
		this.movieId = movieId;
	}

	public String getRoomId() {
		return roomId;
	}

	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}

	public Instant getStartTime() {
		return startTime;
	}

	public void setStartTime(Instant startTime) {
		this.startTime = startTime;
	}

	public Integer getPreparationMinutes() {
		return preparationMinutes;
	}

	public void setPreparationMinutes(Integer preparationMinutes) {
		this.preparationMinutes = preparationMinutes;
	}
}
