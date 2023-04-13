import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
  useMemo,
} from 'react';
import jwtDecode from 'jwt-decode';

import { IPayload, IVerifyTokenResponse } from '../types';
import authService from '../services/auth.service';

export interface IAuthContext {
  isAuthenticated: boolean;
  username: string | null;
  login(token: string): void;
  logout(): void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  username: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuthentication() {
      const token: string | null = localStorage.getItem('token');

      if (token) {
        const { message, payload }: IVerifyTokenResponse =
          await authService.verifyToken(token);

        if (message === 'ok') {
          setIsAuthenticated(true);
          setUsername(payload.username);
        } else {
          setIsAuthenticated(false);
          setUsername(null);
        }
      }
    }

    checkAuthentication();
  }, []);

  function login(token: string) {
    const decoded: IPayload = jwtDecode(token);

    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUsername(decoded.username);
  }

  function logout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUsername(null);
  }

  const contextValue: IAuthContext = useMemo(
    () => ({
      isAuthenticated,
      username,
      login,
      logout,
    }),
    [isAuthenticated, username]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
