import { useEffect, useMemo, useState } from "react";
import SeatSelector from "./SeatSelector";

const DEFAULT_TICKET_PRICE = 12;

export default function BookingForm({
  showtimes,
  moviesById,
  roomsById,
  onPurchase,
  loading,
  preselectedShowtime,
  ticketPrice = DEFAULT_TICKET_PRICE,
}) {
  const [showtimeId, setShowtimeId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("TARJETA");
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (preselectedShowtime) {
      setShowtimeId(preselectedShowtime);
      setSelectedSeats([]);
    } else if (!showtimeId && showtimes.length) {
      setShowtimeId(showtimes[0].id);
    }
  }, [preselectedShowtime, showtimes]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!showtimes.some((show) => show.id === showtimeId) && showtimes.length) {
      setShowtimeId(showtimes[0].id);
    }
  }, [showtimes, showtimeId]);

  useEffect(() => {
    setSelectedSeats([]);
  }, [showtimeId]);

  if (!showtimes.length) {
    return <p className="muted">No hay funciones disponibles por el momento.</p>;
  }

  const currentShowtime = showtimes.find((show) => show.id === showtimeId);
  const currentMovie = currentShowtime ? moviesById.get(currentShowtime.movieId) : null;
  const currentRoom = currentShowtime ? roomsById.get(currentShowtime.roomId) : null;
  const total = selectedSeats.length * ticketPrice;

  const handleSeatToggle = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!showtimeId || selectedSeats.length === 0) {
      return;
    }
    onPurchase({
      showtimeId,
      seats: selectedSeats,
      paymentMethod,
      totalAmount: total,
    });
    setSelectedSeats([]);
  };

  const showtimeOptions = useMemo(
    () =>
      showtimes.map((show) => ({
        id: show.id,
        label: `${moviesById.get(show.movieId)?.title ?? "Función"} — ${new Date(
          show.startTime
        ).toLocaleString()}`,
      })),
    [showtimes, moviesById]
  );

  return (
    <form className="card booking-layout" onSubmit={handleSubmit}>
      <div className="booking-sidebar">
        {currentMovie && (
          <div className="movie-preview">
            <img
              src={
                currentMovie.posterUrl ||
                "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80"
              }
              alt={currentMovie.title}
            />
            <div>
              <h3>{currentMovie.title}</h3>
              <div className="chips">
                <span className="chip">{currentMovie.rating || "+12"}</span>
                <span className="chip secondary">{currentMovie.genre}</span>
                <span className="chip secondary">{currentMovie.durationMinutes} min</span>
              </div>
            </div>
          </div>
        )}
        <label>
          Función
          <select value={showtimeId} onChange={(e) => setShowtimeId(e.target.value)}>
            {showtimeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        {currentRoom && (
          <p className="muted">
            Sala {currentRoom.name} · {currentRoom.type} · Finaliza{" "}
            {currentShowtime && new Date(currentShowtime.endTime).toLocaleTimeString()}
          </p>
        )}
        <label>
          Método de pago
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="TARJETA">Tarjeta</option>
            <option value="EFECTIVO">Efectivo</option>
            <option value="TRANSFERENCIA">Transferencia</option>
          </select>
        </label>
        <div className="ticket-resume">
          <p>Asientos seleccionados:</p>
          <strong>{selectedSeats.join(", ") || "Ninguno"}</strong>
          <p>Total:</p>
          <h2>${total.toFixed(2)}</h2>
        </div>
        <button type="submit" disabled={loading || !selectedSeats.length}>
          {loading ? "Procesando..." : "Confirmar compra"}
        </button>
      </div>
      <div className="booking-seatmap">
        <SeatSelector selectedSeats={selectedSeats} onToggle={handleSeatToggle} />
      </div>
    </form>
  );
}
