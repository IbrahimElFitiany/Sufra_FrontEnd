import { createRoot } from 'react-dom/client'
import {RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'
import './index.css'
import { useManagerStore } from './stores/authStore';
import { fetchMe } from '@services/authServices';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient()

const AuthInitialize = ({ children }: { children: React.ReactNode }) => {
  const { setManager, clearManager } = useManagerStore.getState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const validManager = await fetchMe();
        setManager(validManager);
      } catch (error) {
        clearManager();
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [setManager, clearManager]);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
};

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthInitialize>
      <RouterProvider router={router} />
    </AuthInitialize>
  </QueryClientProvider>
);