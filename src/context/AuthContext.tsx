import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SessionUser } from "../data/types.ts";

const STORAGE_KEY = "borrowblock_session";

interface AuthContextValue {
  user: SessionUser | null;
  login: (email: string, displayName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStoredUser(): SessionUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "id" in parsed &&
      "email" in parsed &&
      "displayName" in parsed &&
      typeof parsed.id === "string" &&
      typeof parsed.email === "string" &&
      typeof parsed.displayName === "string"
    ) {
      return {
        id: parsed.id,
        email: parsed.email,
        displayName: parsed.displayName,
      };
    }
    return null;
  } catch {
    return null;
  }
}

function createUserId(email: string): string {
  return `usr_${email.trim().toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12)}`;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(() => loadStoredUser());

  const login = useCallback((email: string, displayName: string) => {
    const trimmedEmail = email.trim();
    const trimmedName = displayName.trim();
    const sessionUser: SessionUser = {
      id: createUserId(trimmedEmail),
      email: trimmedEmail,
      displayName: trimmedName,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
