package com.example.backend.dto;

import java.time.Instant;

public class ShowtimeResponse {

	private String id;
	private String movieId;
	private String roomId;
	private Instant startTime;
	private Instant endTime;
	private Integer preparationMinutes;

	public ShowtimeResponse() {
	}

	public ShowtimeResponse(String id, String movieId, String roomId, Instant startTime, Instant endTime,
			Integer preparationMinutes) {
		this.id = id;
		this.movieId = movieId;
		this.roomId = roomId;
		this.startTime = startTime;
		this.endTime = endTime;
		this.preparationMinutes = preparationMinutes;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

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

	public Instant getEndTime() {
		return endTime;
	}

	public void setEndTime(Instant endTime) {
		this.endTime = endTime;
	}

	public Integer getPreparationMinutes() {
		return preparationMinutes;
	}

	public void setPreparationMinutes(Integer preparationMinutes) {
		this.preparationMinutes = preparationMinutes;
	}
}
