"use client"
import React, { createContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
};

const defaultProvider: AuthContextType = {
  isAuthenticated: false,
  loading: true,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

export const AuthContext = createContext(defaultProvider);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = () => setIsAuthenticated(true); 
  const logout = () => setIsAuthenticated(false); 

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
