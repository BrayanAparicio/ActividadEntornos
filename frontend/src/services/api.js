import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (payload) => api.post("/auth/login", payload);
export const register = (payload) => api.post("/auth/register", payload);

export const getClients = () => api.get("/clients");
export const createClient = (payload) => api.post("/clients", payload);
export const updateClient = (id, payload) => api.put(`/clients/${id}`, payload);
export const deleteClient = (id) => api.delete(`/clients/${id}`);

export const getMovies = () => api.get("/movies");
export const createMovie = (payload) => api.post("/movies", payload);
export const updateMovie = (id, payload) => api.put(`/movies/${id}`, payload);
export const deleteMovie = (id) => api.delete(`/movies/${id}`);

export const getRooms = () => api.get("/rooms");
export const createRoom = (payload) => api.post("/rooms", payload);
export const updateRoom = (id, payload) => api.put(`/rooms/${id}`, payload);
export const deleteRoom = (id) => api.delete(`/rooms/${id}`);

export const getShowtimes = () => api.get("/showtimes");
export const createShowtime = (payload) => api.post("/showtimes", payload);
export const updateShowtime = (id, payload) => api.put(`/showtimes/${id}`, payload);
export const deleteShowtime = (id) => api.delete(`/showtimes/${id}`);

export const getBookings = () => api.get("/bookings");
export const getMyBookings = () => api.get("/bookings/mine");
export const createBooking = (payload) => api.post("/bookings", payload);
export const cancelBooking = (id) => api.delete(`/bookings/${id}`);

export const getAccount = () => api.get("/account");
export const updateAccount = (payload) => api.patch("/account", payload);

export const getStaff = () => api.get("/staff");
export const createStaff = (payload) => api.post("/staff", payload);

export const getReportDashboard = () => api.get("/reports/dashboard");
