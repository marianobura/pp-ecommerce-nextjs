'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';

type StoredAuth = {
  token: string;
  user: User;
};

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
  logout: () => void;
  clearError: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user && !!token;

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const storedAuthRaw = localStorage.getItem('auth');
      if (!storedAuthRaw) throw new Error('No user found');

      const storedAuth: StoredAuth = JSON.parse(storedAuthRaw);
      const storedUser = storedAuth.user;

      if (!storedUser.password || storedUser.email !== email || storedUser.password !== password) {
        throw new Error('Invalid credentials');
      }

      setUser(storedUser);
      setToken(storedAuth.token);
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

      const newUser: User = {
        id: crypto.randomUUID(),
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        fullName: `${userData.firstName} ${userData.lastName}`,
        phone: null,
        address: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        cart: [],
        orders: [],
      };

      const fakeToken = crypto.randomUUID();
      const authData = { token: fakeToken, user: newUser };
      localStorage.setItem('auth', JSON.stringify(authData));

      setUser(newUser);
      setToken(fakeToken);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth');
  };

  const clearError = () => setError(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const { user, token }: StoredAuth = JSON.parse(storedAuth);
      setUser(user);
      setToken(token);
    }
    setLoading(false);
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
