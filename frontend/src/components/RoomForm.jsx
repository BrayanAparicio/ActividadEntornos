import { useEffect, useState } from "react";

const emptyRoom = {
  name: "",
  location: "",
  type: "NORMAL",
  capacity: 100,
  priceByAudience: {
    ADULTO: 10,
    NINO: 7,
    SENIOR: 8,
  },
};

export default function RoomForm({ selected, onSave, onCancel, saving }) {
  const [formData, setFormData] = useState(emptyRoom);

  useEffect(() => {
    if (selected) {
      setFormData({
        ...emptyRoom,
        ...selected,
        priceByAudience: { ...emptyRoom.priceByAudience, ...(selected.priceByAudience ?? {}) },
      });
    } else {
      setFormData(emptyRoom);
    }
  }, [selected]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      priceByAudience: { ...prev.priceByAudience, [name]: Number(value) },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...formData,
      capacity: Number(formData.capacity),
    });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>{selected ? "Editar sala" : "Nueva sala"}</h3>
      <label>
        Nombre
        <input name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Ubicación
        <input name="location" value={formData.location} onChange={handleChange} required />
      </label>
      <div className="grid two">
        <label>
          Tipo
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="NORMAL">Normal</option>
            <option value="3D">3D</option>
            <option value="IMAX">IMAX</option>
          </select>
        </label>
        <label>
          Capacidad
          <input
            type="number"
            min="20"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="grid two">
        <label>
          Precio adulto
          <input
            type="number"
            min="1"
            step="0.5"
            name="ADULTO"
            value={formData.priceByAudience.ADULTO ?? ""}
            onChange={handlePriceChange}
          />
        </label>
        <label>
          Precio niño
          <input
            type="number"
            min="1"
            step="0.5"
            name="NINO"
            value={formData.priceByAudience.NINO ?? ""}
            onChange={handlePriceChange}
          />
        </label>
        <label>
          Precio tercera edad
          <input
            type="number"
            min="1"
            step="0.5"
            name="SENIOR"
            value={formData.priceByAudience.SENIOR ?? ""}
            onChange={handlePriceChange}
          />
        </label>
      </div>
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
