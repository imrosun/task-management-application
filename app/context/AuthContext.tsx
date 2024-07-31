"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginService, signup as signupService } from '../services/auth';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  userFullName?: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userFullName, setUserFullName] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      const storedUserFullName = localStorage.getItem('userFullName');
      if (storedUserFullName) {
        setUserFullName(storedUserFullName);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService({ email, password });
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userFullName', response.fullName); 
      setIsAuthenticated(true);
      setUserFullName(response.fullName);
      setError(null);
    } catch (error) {
      setIsAuthenticated(false);
      setError('Invalid credentials');
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (fullName: string, email: string, password: string): Promise<void> => {
    try {
      const response = await signupService({ fullName, email, password });
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userFullName', response.fullName); 
      setIsAuthenticated(true);
      setUserFullName(response.fullName);
      setError(null);
    } catch (error) {
      setIsAuthenticated(false);
      setError('Signup failed');
      throw new Error('Signup failed');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserFullName(undefined);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout, error, userFullName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
