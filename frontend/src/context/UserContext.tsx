'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser, logoutUser, getStoredAuthData } from '@/services/auth';

type RegisterData = Pick<User, 'email' | 'password' | 'firstName' | 'lastName'> & {
  phone?: string;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user && !!token;

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await loginUser(email, password);
      setUser(user);
      setToken(token);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await registerUser(userData);
      setUser(user);
      setToken(token);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setToken(null);
  };

  const clearError = () => setError(null);

  useEffect(() => {
    (async () => {
      const storedAuth = await getStoredAuthData();
      if (storedAuth) {
        setUser(storedAuth.user);
        setToken(storedAuth.token);
      }
      setLoading(false);
    })();
  }, []);

  const value: UserContextType = {
    user,
    setUser,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}
