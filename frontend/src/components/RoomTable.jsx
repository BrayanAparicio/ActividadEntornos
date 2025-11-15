export default function RoomTable({ rooms, onEdit, onDelete }) {
  if (!rooms.length) {
    return <p className="muted">No hay salas registradas.</p>;
  }

  return (
    <div className="cards-grid">
      {rooms.map((room) => (
        <article key={room.id} className="movie-card">
          <header>
            <h4>{room.name}</h4>
            <span>{room.type}</span>
          </header>
          <p className="muted">{room.location}</p>
          <p>Capacidad: {room.capacity}</p>
          <ul>
            {Object.entries(room.priceByAudience ?? {}).map(([key, value]) => (
              <li key={key}>
                {key}: ${value}
              </li>
            ))}
          </ul>
          <div className="actions">
            <button type="button" className="secondary" onClick={() => onEdit(room)}>
              Editar
            </button>
            <button type="button" className="danger" onClick={() => onDelete(room.id)}>
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
