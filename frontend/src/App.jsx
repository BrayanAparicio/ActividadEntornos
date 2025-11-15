import { useEffect, useMemo, useState } from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import ClientForm from "./components/ClientForm";
import ClientTable from "./components/ClientTable";
import MovieForm from "./components/MovieForm";
import MovieTable from "./components/MovieTable";
import RoomForm from "./components/RoomForm";
import RoomTable from "./components/RoomTable";
import ShowtimeForm from "./components/ShowtimeForm";
import ShowtimeTable from "./components/ShowtimeTable";
import BookingForm from "./components/BookingForm";
import BookingHistory from "./components/BookingHistory";
import StaffForm from "./components/StaffForm";
import StaffTable from "./components/StaffTable";
import MovieShowcase from "./components/MovieShowcase";
import {
  cancelBooking,
  createBooking,
  createClient,
  createMovie,
  createRoom,
  createShowtime,
  createStaff,
  deleteClient,
  deleteMovie,
  deleteRoom,
  deleteShowtime,
  getAccount,
  getBookings,
  getClients,
  getMovies,
  getMyBookings,
  getReportDashboard,
  getRooms,
  getShowtimes,
  getStaff,
  login,
  register,
  updateAccount,
  updateClient,
  updateMovie,
  updateRoom,
  updateShowtime,
} from "./services/api";

const ADMIN_TABS = ["resumen", "peliculas", "salas", "horarios", "clientes", "ventas", "personal"];
const CLIENT_TABS = ["cartelera", "compras", "cuenta", "historial", "fidelizacion"];

function App() {
  const [mode, setMode] = useState("login");
  const [authLoading, setAuthLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "info", message: "" });

  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [account, setAccount] = useState(null);
  const [staff, setStaff] = useState([]);
  const [reports, setReports] = useState(null);

  const [saving, setSaving] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [preselectedShowtimeId, setPreselectedShowtimeId] = useState(null);

  const [activeAdminTab, setActiveAdminTab] = useState("resumen");
  const [activeClientTab, setActiveClientTab] = useState("cartelera");

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = useMemo(() => Boolean(localStorage.getItem("token")), [user]);
  const isAdmin = user?.role === "ROLE_ADMIN";
  const isStaff = user?.role === "ROLE_TICKETER";
  const isClient = user?.role === "ROLE_CLIENT";

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const notify = (message, type = "info") => {
    setFeedback({ message, type });
    if (message) {
      setTimeout(() => setFeedback({ message: "", type: "info" }), 4500);
    }
  };

  const loadAllData = async () => {
    await Promise.all([loadMovies(), loadRooms(), loadShowtimes(), loadAccount()]);
    if (isAdmin || isStaff) {
      loadClients();
      loadBookings();
      loadStaff();
      loadReports();
    } else if (isClient) {
      loadMyBookings();
    }
  };

  const loadClients = async () => {
    try {
      setClientsLoading(true);
      const { data } = await getClients();
      setClients(data);
    } catch (error) {
      notify(error.response?.data?.message ?? "Error al cargar clientes", "error");
    } finally {
      setClientsLoading(false);
    }
  };

  const loadMovies = async () => {
    try {
      const { data } = await getMovies();
      setMovies(data);
    } catch (error) {
      notify(error.response?.data?.message ?? "No se pudieron cargar películas", "error");
    }
  };

  const loadRooms = async () => {
    try {
      const { data } = await getRooms();
      setRooms(data);
    } catch (error) {
      notify(error.response?.data?.message ?? "No se pudieron cargar salas", "error");
    }
  };

  const loadShowtimes = async () => {
    try {
      const { data } = await getShowtimes();
      setShowtimes(data);
    } catch (error) {
      notify(error.response?.data?.message ?? "No se pudieron cargar horarios", "error");
    }
  };

  const loadBookings = async () => {
    try {
      const { data } = await getBookings();
      setBookings(data);
    } catch (error) {
      notify(error.response?.data?.message ?? "No se pudieron cargar ventas", "error");
    }
  };

  const loadMyBookings = async () => {
    try {
      const { data } = await getMyBookings();
      setMyBookings(data);
    } catch (error) {
      notify(error.response?.data?.message ?? "No se pudo cargar tu historial", "error");
    }
  };

  const loadStaff = async () => {
    try {
      const { data } = await getStaff();
      setStaff(data);
    } catch (error) {
      notify(error.response?.data?.message ?? "No se pudo cargar el personal", "error");
    }
  };

  const loadReports = async () => {
    try {
      const { data } = await getReportDashboard();
      setReports(data);
    } catch (error) {
      notify("No se pudo cargar el resumen financiero", "error");
    }
  };

  const loadAccount = async () => {
    try {
      const { data } = await getAccount();
      setAccount(data);
    } catch (error) {
      // ignore until user updates
    }
  };

  const handleAuth = async (payload) => {
    try {
      setAuthLoading(true);
      const action = mode === "login" ? login : register;
      const { data } = await action(payload);
      localStorage.setItem("token", data.token);
      const userData = {
        email: data.email,
        fullName: data.fullName,
        role: data.role,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setMode("login");
      notify("Autenticación exitosa.");
    } catch (error) {
      notify(error.response?.data?.message ?? "No fue posible autenticar", "error");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setClients([]);
    setMovies([]);
    setRooms([]);
    setShowtimes([]);
    setBookings([]);
    setMyBookings([]);
    setStaff([]);
    setAccount(null);
    setReports(null);
  };

  const handleSaveClient = async (clientPayload) => {
    try {
      setSaving(true);
      if (selectedClient) {
        await updateClient(selectedClient.id, clientPayload);
        notify("Cliente actualizado.");
      } else {
        await createClient(clientPayload);
        notify("Cliente creado.");
      }
      setSelectedClient(null);
      loadClients();
    } catch (error) {
      notify(error.response?.data?.message ?? "No fue posible guardar el cliente", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClient = async (id) => {
    if (!window.confirm("¿Desea eliminar este cliente?")) {
      return;
    }
    try {
      await deleteClient(id);
      setClients((prev) => prev.filter((client) => client.id !== id));
      notify("Cliente eliminado.");
    } catch (error) {
      notify(error.response?.data?.message ?? "No fue posible eliminar el cliente", "error");
    }
  };

  const handleSaveMovie = async (payload) => {
    try {
      setSaving(true);
      if (selectedMovie) {
        await updateMovie(selectedMovie.id, payload);
        notify("Película actualizada.");
      } else {
        await createMovie(payload);
        notify("Película creada.");
      }
      setSelectedMovie(null);
      loadMovies();
    } catch (error) {
      notify(error.response?.data?.message ?? "No fue posible guardar la película", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm("¿Eliminar esta película?")) return;
    try {
      await deleteMovie(id);
      loadMovies();
      notify("Película eliminada.");
    } catch (error) {
      notify("No se pudo eliminar la película", "error");
    }
  };

  const handleSaveRoom = async (payload) => {
    try {
      setSaving(true);
      if (selectedRoom) {
        await updateRoom(selectedRoom.id, payload);
        notify("Sala actualizada.");
      } else {
        await createRoom(payload);
        notify("Sala creada.");
      }
      setSelectedRoom(null);
      loadRooms();
    } catch (error) {
      notify("No se pudo guardar la sala", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm("¿Eliminar esta sala?")) return;
    try {
      await deleteRoom(id);
      loadRooms();
      notify("Sala eliminada.");
    } catch (error) {
      notify("No se pudo eliminar la sala", "error");
    }
  };

  const handleSaveShowtime = async (payload) => {
    try {
      setSaving(true);
      if (selectedShowtime) {
        await updateShowtime(selectedShowtime.id, payload);
        notify("Función actualizada.");
      } else {
        await createShowtime(payload);
        notify("Función creada.");
      }
      setSelectedShowtime(null);
      loadShowtimes();
    } catch (error) {
      notify(error.response?.data?.message ?? "No se pudo guardar la función", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteShowtime = async (id) => {
    if (!window.confirm("¿Eliminar esta función?")) return;
    try {
      await deleteShowtime(id);
      loadShowtimes();
      notify("Función eliminada.");
    } catch (error) {
      notify("No se pudo eliminar la función", "error");
    }
  };

  const handleStaffCreate = async (payload) => {
    try {
      await createStaff(payload);
      loadStaff();
      notify("Personal creado.");
    } catch (error) {
      notify(error.response?.data?.message ?? "No se pudo crear el usuario", "error");
    }
  };

  const handlePurchase = async (payload) => {
    try {
      setSaving(true);
      await createBooking(payload);
      notify("Compra realizada correctamente.");
      loadMyBookings();
      loadReports();
      setPreselectedShowtimeId(null);
    } catch (error) {
      notify(error.response?.data?.message ?? "No se pudo procesar la compra", "error");
    } finally {
      setSaving(false);
    }
  };

  const handlePickShowtime = (showtimeId) => {
    setPreselectedShowtimeId(showtimeId);
    setActiveClientTab("compras");
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm("¿Cancelar esta reserva?")) return;
    try {
      await cancelBooking(id);
      loadMyBookings();
      loadBookings();
    } catch (error) {
      notify("No se pudo cancelar la reserva", "error");
    }
  };

  const handleAccountUpdate = async (payload) => {
    try {
      const { data } = await updateAccount(payload);
      setAccount(data);
      notify("Perfil actualizado.");
    } catch (error) {
      notify("No se pudo actualizar el perfil", "error");
    }
  };

  const moviesById = new Map(movies.map((movie) => [movie.id, movie]));
  const roomsById = new Map(rooms.map((room) => [room.id, room]));
  const showtimesById = new Map(showtimes.map((showtime) => [showtime.id, showtime]));

  if (!isAuthenticated) {
    return (
      <div className="app-shell">
        <section className="hero">
          <h1>Suite Cinematográfica</h1>
          <p>
            Administra la cartelera, las ventas y las experiencias de tus clientes desde un solo lugar con seguridad
            JWT.
          </p>
        </section>

        <div className="card">
          <div className="pill-nav">
            <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
              Ingresar
            </button>
            <button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>
              Registrarme
            </button>
          </div>
          <p className="muted">
            Los registros automáticos crean cuentas de cliente. Administradores y taquilleros se configuran en el
            backend.
          </p>
          {feedback.message && (
            <p className={`feedback ${feedback.type === "error" ? "error" : ""}`}>{feedback.message}</p>
          )}
          <AuthForm mode={mode} onSubmit={handleAuth} loading={authLoading} />
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <section className="hero">
        <h1>Hola, {user?.fullName}</h1>
        <p>
          {isAdmin && "Panel administrador para controlar cartelera, salas, personal y finanzas."}
          {isStaff && "Panel operativo para gestionar películas, horarios y ventas."}
          {isClient && "Explora la cartelera, compra entradas y consulta tus beneficios de fidelización."}
        </p>
        <div className="tab-buttons">
          {(isAdmin || isStaff) &&
            ADMIN_TABS.map((tab) => (
              <button
                key={tab}
                className={activeAdminTab === tab ? "active" : "secondary"}
                onClick={() => setActiveAdminTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          {isClient &&
            CLIENT_TABS.map((tab) => (
              <button
                key={tab}
                className={activeClientTab === tab ? "active" : "secondary"}
                onClick={() => setActiveClientTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          <button className="secondary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </section>

      {feedback.message && (
        <p className={`feedback ${feedback.type === "error" ? "error" : ""}`}>{feedback.message}</p>
      )}

      {(isAdmin || isStaff) && (
        <>
          {activeAdminTab === "resumen" && (
            <section className="card">
              <h3>Resumen financiero</h3>
              {reports ? (
                <div className="grid two">
                  <div>
                    <p>Total vendido</p>
                    <h2>${reports.totalSales?.toFixed(2)}</h2>
                  </div>
                  <div>
                    <p>Operaciones</p>
                    <h2>{reports.transactions}</h2>
                  </div>
                  <div>
                    <p>Ticket promedio</p>
                    <h2>${reports.avgTicket?.toFixed(2)}</h2>
                  </div>
                  <div>
                    <p>Última actualización</p>
                    <h2>{new Date(reports.lastUpdate).toLocaleString()}</h2>
                  </div>
                </div>
              ) : (
                <p className="muted">Sin datos de ventas aún.</p>
              )}
            </section>
          )}

          {activeAdminTab === "peliculas" && (
            <div className="grid responsive">
              <MovieForm
                selected={selectedMovie}
                onSave={handleSaveMovie}
                onCancel={() => setSelectedMovie(null)}
                saving={saving}
              />
              <section className="card">
                <div className="section-header">
                  <h3>Cartelera</h3>
                  <button className="secondary" onClick={loadMovies}>
                    Actualizar
                  </button>
                </div>
                <MovieTable
                  movies={movies}
                  onEdit={setSelectedMovie}
                  onDelete={handleDeleteMovie}
                  canEdit
                />
              </section>
            </div>
          )}

          {activeAdminTab === "salas" && (
            <div className="grid responsive">
              <RoomForm
                selected={selectedRoom}
                onSave={handleSaveRoom}
                onCancel={() => setSelectedRoom(null)}
                saving={saving}
              />
              <section className="card">
                <div className="section-header">
                  <h3>Salas</h3>
                  <button className="secondary" onClick={loadRooms}>
                    Actualizar
                  </button>
                </div>
                <RoomTable rooms={rooms} onEdit={setSelectedRoom} onDelete={handleDeleteRoom} />
              </section>
            </div>
          )}

          {activeAdminTab === "horarios" && (
            <div className="grid responsive">
              <ShowtimeForm
                movies={movies}
                rooms={rooms}
                selected={selectedShowtime}
                onSave={handleSaveShowtime}
                onCancel={() => setSelectedShowtime(null)}
                saving={saving}
              />
              <section className="card">
                <div className="section-header">
                  <h3>Funciones</h3>
                  <button className="secondary" onClick={loadShowtimes}>
                    Actualizar
                  </button>
                </div>
                <ShowtimeTable
                  showtimes={showtimes}
                  moviesById={moviesById}
                  roomsById={roomsById}
                  onEdit={setSelectedShowtime}
                  onDelete={handleDeleteShowtime}
                />
              </section>
            </div>
          )}

          {activeAdminTab === "clientes" && (
            <div className="grid responsive">
              <ClientForm
                selected={selectedClient}
                onSave={handleSaveClient}
                onCancel={() => setSelectedClient(null)}
                saving={saving}
              />
              <section className="card">
                <div className="section-header">
                  <h3>Clientes</h3>
                  <button className="secondary" onClick={loadClients}>
                    Actualizar
                  </button>
                </div>
                {clientsLoading ? (
                  <p>Cargando clientes...</p>
                ) : (
                  <ClientTable clients={clients} onEdit={setSelectedClient} onDelete={handleDeleteClient} />
                )}
              </section>
            </div>
          )}

          {activeAdminTab === "ventas" && (
            <section className="card">
              <div className="section-header">
                <h3>Ventas y reservas</h3>
                <button className="secondary" onClick={loadBookings}>
                  Actualizar
                </button>
              </div>
              <BookingHistory
                bookings={bookings}
                showtimesById={showtimesById}
                moviesById={moviesById}
                onCancel={handleCancelBooking}
              />
            </section>
          )}

          {activeAdminTab === "personal" && (
            <div className="grid responsive">
              <StaffForm onCreate={handleStaffCreate} loading={saving} />
              <section className="card">
                <div className="section-header">
                  <h3>Equipo</h3>
                  <button className="secondary" onClick={loadStaff}>
                    Actualizar
                  </button>
                </div>
                <StaffTable staff={staff} />
              </section>
            </div>
          )}
        </>
      )}

      {isClient && (
        <>
          {activeClientTab === "cartelera" && (
            <section className="card">
              <div className="section-header">
                <h3>Cartelera actual</h3>
                <button className="secondary" onClick={loadMovies}>
                  Actualizar
                </button>
              </div>
              <MovieShowcase movies={movies} showtimes={showtimes} onPickShowtime={handlePickShowtime} />
            </section>
          )}

          {activeClientTab === "compras" && (
            <BookingForm
              showtimes={showtimes}
              moviesById={moviesById}
              roomsById={roomsById}
              onPurchase={handlePurchase}
              loading={saving}
              preselectedShowtime={preselectedShowtimeId}
            />
          )}

          {activeClientTab === "cuenta" && (
            <section className="card">
              <h3>Mi cuenta</h3>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = new FormData(event.currentTarget);
                  handleAccountUpdate(Object.fromEntries(form.entries()));
                }}
                className="grid"
              >
                <label>
                  Nombre completo
                  <input name="fullName" defaultValue={account?.fullName} />
                </label>
                <label>
                  Teléfono
                  <input name="phone" defaultValue={account?.phone} />
                </label>
                <label>
                  Preferencia de notificación
                  <select name="notificationPreference" defaultValue={account?.notificationPreference ?? "EMAIL"}>
                    <option value="EMAIL">Email</option>
                    <option value="SMS">SMS</option>
                    <option value="PUSH">Push</option>
                  </select>
                </label>
                <button type="submit">Guardar cambios</button>
              </form>
            </section>
          )}

          {activeClientTab === "historial" && (
            <section className="card">
              <div className="section-header">
                <h3>Mis reservas</h3>
                <button className="secondary" onClick={loadMyBookings}>
                  Actualizar
                </button>
              </div>
              <BookingHistory
                bookings={myBookings}
                showtimesById={showtimesById}
                moviesById={moviesById}
                onCancel={handleCancelBooking}
              />
            </section>
          )}

          {activeClientTab === "fidelizacion" && (
            <section className="card">
              <h3>Programa de fidelización</h3>
              <p>Puntos acumulados: {account?.loyaltyPoints ?? 0}</p>
              <p className="muted">
                Suma 1 punto por cada unidad monetaria gastada. Canjea tus puntos en taquilla para obtener beneficios
                exclusivos.
              </p>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default App;
