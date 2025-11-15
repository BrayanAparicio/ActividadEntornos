import { useEffect, useState } from "react";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
};

export default function AuthForm({ mode = "login", onSubmit, loading }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    setFormData(initialForm);
  }, [mode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload =
      mode === "login"
        ? { email: formData.email, password: formData.password }
        : formData;
    onSubmit(payload);
  };

  const isRegister = mode === "register";

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{isRegister ? "Crear cuenta" : "Iniciar sesión"}</h2>
      {isRegister && (
        <label>
          Nombre completo
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
        </label>
      )}
      <label>
        Correo electrónico
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="correo@dominio.com"
          required
        />
      </label>
      <label>
        Contraseña
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mínimo 6 caracteres"
          required
          minLength={6}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Procesando..." : isRegister ? "Registrarse" : "Entrar"}
      </button>
    </form>
  );
}
