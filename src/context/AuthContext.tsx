import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { signOut } from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';
import type { AuthSession, LoginPayload, RegisterPayload, Role, User } from '../types';
import { authService } from '../services/auth';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<AuthSession>;
  register: (payload: RegisterPayload) => Promise<AuthSession>;
  googleLogin: (firebaseUser: FirebaseUser) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'campusos_token';
const USER_KEY = 'campusos_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    const u = localStorage.getItem(USER_KEY);
    if (t && u) {
      try {
        setUser(JSON.parse(u));
        setToken(t);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Save authenticated user in local storage
  const persist = useCallback((session: AuthSession) => {
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    setUser(session.user);
    setToken(session.token);
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const session = await authService.login(payload);
      persist(session);
      return session;
    },
    [persist]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const session = await authService.register(payload);
      persist(session);
      return session;
    },
    [persist]
  );

  // Google Authentication
  const googleLogin = useCallback(
    async (firebaseUser: FirebaseUser) => {
      const session = await authService.googleLogin(firebaseUser);
      persist(session);
    },
    [persist]
  );

  // Logout from Firebase
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setToken(null);
  }, []);

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      localStorage.setItem(USER_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      role: user?.role ?? null,
      isAuthenticated: !!token,
      isLoading,
      login,
      register,
      googleLogin,
      logout,
      updateUser,
    }),
    [user, token, isLoading, login, register, googleLogin, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
