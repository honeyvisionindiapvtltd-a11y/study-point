import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState("");
  const refreshUser = async () => {
    const { data } = await api.get("/auth/me");
    setUser(data.user);
    return data.user;
  };
  useEffect(() => {
    const expired = event => { setUser(null); setAuthMessage(event.detail?.message || "Your session has expired. Please log in again."); };
    window.addEventListener("study-point-auth-expired", expired);
    if (!localStorage.getItem("study_point_token")) { setLoading(false); return () => window.removeEventListener("study-point-auth-expired", expired); }
    refreshUser().catch(() => { localStorage.removeItem("study_point_token"); setUser(null); }).finally(() => setLoading(false));
    return () => window.removeEventListener("study-point-auth-expired", expired);
  }, []);
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("study_point_token", data.token); setUser(data.user); return data.user;
  };
  const register = async payload => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("study_point_token", data.token); setUser(data.user); return data.user;
  };
  const logout = async () => { try { await api.post("/auth/logout"); } catch {} localStorage.removeItem("study_point_token"); setUser(null); };
  return <AuthContext.Provider value={{ user, token: localStorage.getItem("study_point_token"), isAuthenticated: Boolean(user), loading, authMessage, login, register, logout, refreshUser }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
