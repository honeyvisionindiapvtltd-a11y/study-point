import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("study_point_token")) return setLoading(false);
    api.get("/auth/me").then(r => setUser(r.data.user)).catch(() => localStorage.removeItem("study_point_token")).finally(() => setLoading(false));
  }, []);
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("study_point_token", data.token); setUser(data.user); return data.user;
  };
  const register = async payload => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("study_point_token", data.token); setUser(data.user); return data.user;
  };
  const logout = () => { localStorage.removeItem("study_point_token"); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
