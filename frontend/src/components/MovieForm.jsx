import { useEffect, useState } from "react";

const emptyMovie = {
  title: "",
  genre: "",
  year: new Date().getFullYear(),
  synopsis: "",
  durationMinutes: 120,
  rating: "PG-13",
  posterUrl: "",
};

export default function MovieForm({ selected, onSave, onCancel, saving }) {
  const [formData, setFormData] = useState(emptyMovie);

  useEffect(() => {
    if (selected) {
      setFormData({ ...emptyMovie, ...selected });
    } else {
      setFormData(emptyMovie);
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
      year: Number(formData.year),
    });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>{selected ? "Editar película" : "Nueva película"}</h3>
      <label>
        Título
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <div className="grid two">
        <label>
          Género
          <input
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Año
          <input
            type="number"
            name="year"
            min="1900"
            max="2100"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <label>
        Duración (min)
        <input
          type="number"
          name="durationMinutes"
          min="30"
          max="400"
          value={formData.durationMinutes}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Clasificación
        <input
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Sinopsis
        <textarea
          name="synopsis"
          rows={3}
          value={formData.synopsis}
          onChange={handleChange}
        />
      </label>
      <label>
        Imagen / Poster (URL)
        <input
          name="posterUrl"
          value={formData.posterUrl}
          onChange={handleChange}
          placeholder="https://..."
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
