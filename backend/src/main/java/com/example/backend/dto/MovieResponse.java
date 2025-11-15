package com.example.backend.dto;

import java.time.Instant;

public class MovieResponse {

	private String id;
	private String title;
	private String genre;
	private Integer year;
	private String synopsis;
	private Integer durationMinutes;
	private String rating;
	private String posterUrl;
	private Instant createdAt;
	private Instant updatedAt;

	public MovieResponse() {
	}

	public MovieResponse(String id, String title, String genre, Integer year, String synopsis, Integer durationMinutes,
			String rating, String posterUrl, Instant createdAt, Instant updatedAt) {
		this.id = id;
		this.title = title;
		this.genre = genre;
		this.year = year;
		this.synopsis = synopsis;
		this.durationMinutes = durationMinutes;
		this.rating = rating;
		this.posterUrl = posterUrl;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getSynopsis() {
		return synopsis;
	}

	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}

	public Integer getDurationMinutes() {
		return durationMinutes;
	}

	public void setDurationMinutes(Integer durationMinutes) {
		this.durationMinutes = durationMinutes;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getPosterUrl() {
		return posterUrl;
	}

	public void setPosterUrl(String posterUrl) {
		this.posterUrl = posterUrl;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Instant updatedAt) {
		this.updatedAt = updatedAt;
	}
}
