"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { User } from "@/types";
import { mockUser } from "@/lib/data";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for authenticated user in localStorage (dev mode)
    const stored = localStorage.getItem("yaqeen-user");
    if (stored) {
      try {
        setUser(JSON.parse(stored) as User);
      } catch {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (email && password) {
        const loggedInUser: User =
          email.toLowerCase() === "admin@yaqeen.ps"
            ? { ...mockUser, email, role: "admin" }
            : { ...mockUser, email };
        setUser(loggedInUser);
        localStorage.setItem("yaqeen-user", JSON.stringify(loggedInUser));
      } else {
        throw new Error("Invalid credentials");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("yaqeen-user");
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newUser: User = {
        ...mockUser,
        name: data.name,
        nameAr: data.name,
        email: data.email,
        phone: data.phone,
      };
      setUser(newUser);
      localStorage.setItem("yaqeen-user", JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
