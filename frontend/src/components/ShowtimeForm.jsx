import { useEffect, useState } from "react";

const emptyShowtime = {
  movieId: "",
  roomId: "",
  startTime: "",
  preparationMinutes: 15,
};

export default function ShowtimeForm({
  movies,
  rooms,
  selected,
  onSave,
  onCancel,
  saving,
}) {
  const [formData, setFormData] = useState(emptyShowtime);

  useEffect(() => {
    if (selected) {
      setFormData({
        ...emptyShowtime,
        ...selected,
      });
    } else {
      setFormData(emptyShowtime);
    }
  }, [selected]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...formData,
      preparationMinutes: Number(formData.preparationMinutes),
      startTime: new Date(formData.startTime).toISOString(),
    });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>{selected ? "Editar función" : "Nueva función"}</h3>
      <label>
        Película
        <select
          name="movieId"
          value={formData.movieId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Sala
        <select
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Fecha y hora de inicio
        <input
          type="datetime-local"
          name="startTime"
          value={
            formData.startTime
              ? new Date(formData.startTime).toISOString().slice(0, 16)
              : ""
          }
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Minutos de preparación
        <input
          type="number"
          min="5"
          name="preparationMinutes"
          value={formData.preparationMinutes}
          onChange={handleChange}
          required
        />
      </label>
      <div className="actions">
        <button type="submit" disabled={saving}>
          {saving ? "Guardando..." : selected ? "Actualizar" : "Crear"}
        </button>
        {selected && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
