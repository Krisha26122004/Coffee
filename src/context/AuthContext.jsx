import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("brewnestUser") || "null"));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("brewnestUser", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("brewnestToken", data.token);
    setUser(data.user);
    setToast(`Welcome back, ${data.user.name}! We're thrilled to have you brew with us again. ☕`);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("brewnestToken", data.token);
    setUser(data.user);
    setToast(`Welcome to BrewNest, ${data.user.name}! Your journey into artisanal coffee begins here. 🌟`);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("brewnestToken");
    localStorage.removeItem("brewnestUser");
    setUser(null);
    setToast("Logged out successfully. See you again soon!");
  };

  const value = useMemo(() => ({ user, login, register, logout, toast, setToast }), [user, toast]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
