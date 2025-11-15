package com.example.backend.model;

import java.time.Instant;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "showtimes")
public class Showtime {

	@Id
	private String id;

	private String movieId;

	private String roomId;

	private Instant startTime;

	private Instant endTime;

	private Integer preparationMinutes;

	public Showtime() {
	}

	public Showtime(String movieId, String roomId, Instant startTime, Instant endTime, Integer preparationMinutes) {
		this.movieId = movieId;
		this.roomId = roomId;
		this.startTime = startTime;
		this.endTime = endTime;
		this.preparationMinutes = preparationMinutes;
	}

	public String getId() {
		return id;
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

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Showtime showtime = (Showtime) o;
		return Objects.equals(id, showtime.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}
