import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export interface IProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: IProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
}
