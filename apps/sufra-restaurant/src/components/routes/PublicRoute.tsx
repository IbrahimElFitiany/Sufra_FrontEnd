import { Navigate } from 'react-router-dom';
import { useManagerStore } from '@/stores/authStore';
import type { JSX } from 'react';

interface Props {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: Props) => {
  const manager = useManagerStore((state) => state.manager);

  if (manager != null) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};