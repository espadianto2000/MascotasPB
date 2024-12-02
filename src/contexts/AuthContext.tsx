import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import {
  loginUser,
  registerUser,
  logoutUser,
  loadUserFromStorage,
} from '../actions/AuthActions';

interface AuthContextProps {
  user: any | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(undefined);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const { user, token } = await loginUser(email, password);
      setUser(user);
      setToken(token);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { user, token } = await registerUser(email, password);
      setUser(user);
      setToken(token);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setToken(null);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const loadUser = async () => {
    try {
      const data = await loadUserFromStorage();
      console.log('Loaded user from storage:', data);
      if (data) {
        setUser(data.user);
        setToken(data.token);
      } else {
        setUser(null);
      }
    } catch (error: any) {
      console.error('Error loading user from storage:', error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
