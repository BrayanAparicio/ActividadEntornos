package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dto.MovieRequest;
import com.example.backend.dto.MovieResponse;
import com.example.backend.model.Movie;
import com.example.backend.repository.MovieRepository;

@Service
public class MovieService {

	private final MovieRepository movieRepository;

	public MovieService(MovieRepository movieRepository) {
		this.movieRepository = movieRepository;
	}

	public List<MovieResponse> findAll() {
		return movieRepository.findAll().stream().map(this::toResponse).toList();
	}

	public MovieResponse findById(String id) {
		Movie movie = movieRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Película no encontrada"));
		return toResponse(movie);
	}

	public MovieResponse create(MovieRequest request) {
		Movie movie = new Movie(request.getTitle(), request.getGenre(), request.getYear(), request.getSynopsis(),
				request.getDurationMinutes(), request.getRating(), request.getPosterUrl());
		return toResponse(movieRepository.save(movie));
	}

	public MovieResponse update(String id, MovieRequest request) {
		Movie movie = movieRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Película no encontrada"));
		movie.setTitle(request.getTitle());
		movie.setGenre(request.getGenre());
		movie.setYear(request.getYear());
		movie.setSynopsis(request.getSynopsis());
		movie.setDurationMinutes(request.getDurationMinutes());
		movie.setRating(request.getRating());
		movie.setPosterUrl(request.getPosterUrl());
		return toResponse(movieRepository.save(movie));
	}

	public void delete(String id) {
		if (!movieRepository.existsById(id)) {
			throw new IllegalArgumentException("Película no encontrada");
		}
		movieRepository.deleteById(id);
	}

	private MovieResponse toResponse(Movie movie) {
		return new MovieResponse(movie.getId(), movie.getTitle(), movie.getGenre(), movie.getYear(),
				movie.getSynopsis(), movie.getDurationMinutes(), movie.getRating(), movie.getPosterUrl(),
				movie.getCreatedAt(), movie.getUpdatedAt());
	}
}
