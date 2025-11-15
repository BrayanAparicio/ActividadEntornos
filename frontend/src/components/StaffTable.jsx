export default function StaffTable({ staff }) {
  if (!staff.length) {
    return <p className="muted">No hay personal registrado.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr key={member.id}>
              <td>{member.fullName}</td>
              <td>{member.email}</td>
              <td>{member.role.replace("ROLE_", "")}</td>
              <td>{member.loyaltyPoints ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
