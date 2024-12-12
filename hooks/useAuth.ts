import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserRole, AuthProvider } from "@/server/utils/interfaces";
import { R } from "@/utils/types";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export interface IUsers {
  _id?: string;
  email: string;
  avatar: string;
  state: string;
  provider?: AuthProvider;
  lastName: string;
  firstName: string;
  address: string;
  // state?: string;
  propertyInterest?: string[];
  locationInterest?: string[];
  phoneNumber: string;
  refCode?: string;
  refCount?: number;
  propertyCount?: number;
  role: UserRole;
  isOnboarded?: R;
}
export interface IUser {
  _id?: string;
  email: string;
  avatar?: string;
  state?: string;
  provider?: AuthProvider;
  lastName: string;
  firstName: string;
  address: string;
  // state?: string;
  propertyInterest?: string[];
  locationInterest?: string[];
  phoneNumber: string;
  refCode?: string;
  refCount?: number;
  propertyCount?: number;
  role: UserRole;
  isOnboarded?: boolean;
}

const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState("");

  const isWindow = typeof window !== "undefined";

  const { push } = useRouter();

  useEffect(() => {
    if (isWindow) {
      const userFromLocalStorage = localStorage.getItem("userData");
      if (userFromLocalStorage) {
        const { token, user } = JSON.parse(userFromLocalStorage);
        setToken(token);
        setUser(user);
      }
    }
  }, [isWindow]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      const token = response?.data?.token;
      const userData = response?.data?.data;
      console.log("token", token);
      localStorage.setItem("token", token);
      setUser(userData);
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
    setToken("");
    push("/auth");
  };

  const reset = async (credentials: {
    email: string;
    old_password: string;
    new_password: string;
    confirm_new_password: string;
  }) => {
    try {
      const req = await axios.put("/api/auth/reset", credentials);
      return req as any;
    } catch (error) {
      throw error;
    }
  };

  const authProtectedFn = (fn: (args?: any) => unknown, route: string) => {
    if (token) {
      fn();
    } else {
      window.sessionStorage.setItem("authRoute", route);
      push("/auth");
    }
  };

  return {
    user,
    loading,
    error,
    isWindow,
    token,
    login,
    logout,
    reset,
    authProtectedFn,
    setUser
  };
};

export default useAuth;
