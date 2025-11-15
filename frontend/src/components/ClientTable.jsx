export default function ClientTable({ clients, onEdit, onDelete }) {
  if (!clients.length) {
    return <p className="muted">No hay clientes registrados todavía.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Notas</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.notes || "—"}</td>
              <td className="actions">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => onEdit(client)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="danger"
                  onClick={() => onDelete(client.id)}
                >
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
