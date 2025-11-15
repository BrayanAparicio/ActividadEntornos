export default function MovieTable({ movies, onEdit, onDelete, canEdit = true }) {
  if (!movies.length) {
    return <p className="muted">No hay películas registradas.</p>;
  }

  return (
    <div className="cards-grid">
      {movies.map((movie) => (
        <article key={movie.id} className="movie-card">
          <header>
            <div>
              <h4>{movie.title}</h4>
              <small>{movie.rating}</small>
            </div>
            <span>{movie.year}</span>
          </header>
          <p className="chip">{movie.genre}</p>
          <p className="muted">{movie.durationMinutes} min</p>
          <p className="synopsis">{movie.synopsis || "Sin descripción"}</p>
          {canEdit && (
            <div className="actions">
              <button type="button" className="secondary" onClick={() => onEdit(movie)}>
                Editar
              </button>
              <button type="button" className="danger" onClick={() => onDelete(movie.id)}>
                Eliminar
              </button>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
