import { useState } from "react";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_TICKETER",
};

export default function StaffForm({ onCreate, loading }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(formData);
    setFormData(initialState);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Agregar personal</h3>
      <label>
        Nombre completo
        <input name="fullName" value={formData.fullName} onChange={handleChange} required />
      </label>
      <label>
        Correo
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Contraseña
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          minLength={6}
          required
        />
      </label>
      <label>
        Rol
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="ROLE_TICKETER">Taquillero</option>
          <option value="ROLE_ADMIN">Administrador</option>
        </select>
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Creando..." : "Crear"}
      </button>
    </form>
  );
}
