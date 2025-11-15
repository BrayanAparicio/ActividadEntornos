import "./MovieShowcase.css";

const releaseBadge = (movie) => {
  if (!movie) return "CARTELERA";
  if (movie.year && movie.year >= new Date().getFullYear()) {
    return "ESTRENO";
  }
  return "CARTELERA";
};

export default function MovieShowcase({ movies, showtimes, onPickShowtime }) {
  const showtimesByMovie = movies.reduce((map, movie) => {
    map.set(
      movie.id,
      showtimes.filter((show) => show.movieId === movie.id).sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      )
    );
    return map;
  }, new Map());

  return (
    <div className="showcase-grid">
      {movies.map((movie) => {
        const poster =
          movie.posterUrl ||
          "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=600&q=80";
        const badge = releaseBadge(movie);
        const groupedShowtimes = showtimesByMovie.get(movie.id) ?? [];
        return (
          <article key={movie.id} className="showcase-card">
            <div className={`showcase-badge ${badge === "ESTRENO" ? "red" : "gold"}`}>{badge}</div>
            <img src={poster} alt={movie.title} className="showcase-poster" />
            <div className="showcase-body">
              <h4>{movie.title}</h4>
              <p>{movie.genre}</p>
              <small>{movie.durationMinutes} min</small>
              {groupedShowtimes.length ? (
                <div className="showtime-buttons">
                  {groupedShowtimes.map((showtime) => (
                    <button key={showtime.id} onClick={() => onPickShowtime(showtime.id)}>
                      {new Date(showtime.startTime).toLocaleDateString("es-ES", {
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="muted">Próximamente</p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
