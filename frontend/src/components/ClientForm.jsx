import { useEffect, useState } from "react";

const emptyClient = {
  name: "",
  email: "",
  phone: "",
  notes: "",
};

export default function ClientForm({ selected, onSave, onCancel, saving }) {
  const [formData, setFormData] = useState(emptyClient);

  useEffect(() => {
    setFormData(selected ?? emptyClient);
  }, [selected]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>{selected ? "Editar cliente" : "Nuevo cliente"}</h3>
      <div className="grid">
        <label>
          Nombre
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Correo
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <label>
        Teléfono
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Notas
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
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
