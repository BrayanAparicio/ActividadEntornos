import { format } from "../utils/date";

export default function BookingHistory({ bookings, showtimesById, moviesById, onCancel }) {
  if (!bookings.length) {
    return <p className="muted">Aún no tienes compras registradas.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Película</th>
            <th>Función</th>
            <th>Asientos</th>
            <th>Método</th>
            <th>Total</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const showtime = showtimesById.get(booking.showtimeId);
            const movie = showtime ? moviesById.get(showtime.movieId) : null;
            return (
              <tr key={booking.id}>
                <td>{movie?.title ?? "N/D"}</td>
                <td>{showtime ? format(showtime.startTime) : "N/D"}</td>
                <td>{booking.seats.join(", ")}</td>
                <td>{booking.paymentMethod}</td>
                <td>${booking.totalAmount?.toFixed(2)}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status === "CONFIRMED" && (
                    <button type="button" className="secondary" onClick={() => onCancel(booking.id)}>
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
