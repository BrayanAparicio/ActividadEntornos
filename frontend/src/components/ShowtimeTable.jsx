import { format } from "../utils/date";

export default function ShowtimeTable({ showtimes, moviesById, roomsById, onEdit, onDelete }) {
  if (!showtimes.length) {
    return <p className="muted">No hay funciones programadas.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Película</th>
            <th>Sala</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Prep.</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {showtimes.map((showtime) => (
            <tr key={showtime.id}>
              <td>{moviesById.get(showtime.movieId)?.title ?? "N/D"}</td>
              <td>{roomsById.get(showtime.roomId)?.name ?? "N/D"}</td>
              <td>{format(showtime.startTime)}</td>
              <td>{format(showtime.endTime)}</td>
              <td>{showtime.preparationMinutes} min</td>
              <td className="actions">
                <button type="button" className="secondary" onClick={() => onEdit(showtime)}>
                  Editar
                </button>
                <button type="button" className="danger" onClick={() => onDelete(showtime.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
