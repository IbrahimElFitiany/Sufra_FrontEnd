import { Navigate } from 'react-router-dom';
import { useManagerStore } from '@/stores/authStore';
import type { JSX } from 'react';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
  const manager = useManagerStore((state) => state.manager);

  if (!manager) {
    return <Navigate to="/" replace />;
  }

  return children;
};