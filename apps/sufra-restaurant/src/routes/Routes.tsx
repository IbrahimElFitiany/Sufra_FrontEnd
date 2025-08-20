import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { Navigate } from 'react-router-dom';
import Layout from '@layouts/Layout';
import { ProtectedRoute } from '@components/routes/ProtectedRoute';
import { PublicRoute } from '@components/routes/PublicRoute';

const RestaurantRegistration = lazy(() => import("@pages/RestaurantRegistrationPage"));
const LandingPage = lazy(() => import('@pages/LandingPage'));
const LoginPage = lazy(() => import('@pages/LoginPage'));
const DashboardPage = lazy(() => import("@pages/managerPages/DashboardPage"));
const OrdersPage = lazy(() => import("@pages/managerPages/OrdersPage"));
const ReservationsPage = lazy(() => import("@pages/managerPages/ReservationsPage"));
const TableManagementPage = lazy(() => import("@pages/managerPages/TableManagementPage"));
const ReviewsPage = lazy(() => import('@pages/managerPages/ReviewsPage'));
const OpeningHoursPage = lazy(() => import("@pages/managerPages/OpeningHoursPage"));
const MenuManagementPage = lazy(() => import("@pages/managerPages/MenuManagementPage"));
const SettingsPage = lazy(()=> import('@pages/managerPages/SettingsPage'));


const loader = (
  <div className="fixed inset-0 z-50 bg-[#000000af] flex items-center justify-center text-white">
    <HashLoader color="#B68D67" size={50} />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/partner-with-sufra" replace />
  },
  {
    path: '/partner-with-sufra',
    element: (
      <PublicRoute>
        <Suspense fallback={loader}>
          <LandingPage />
        </Suspense>
      </PublicRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Suspense fallback={loader}>
          <LoginPage/>
        </Suspense>
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Suspense fallback={loader}>
          <RestaurantRegistration />
        </Suspense>
      </PublicRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element:<DashboardPage/>},
      { path: "/orders", element: <OrdersPage />},
      { path: "/reservations", element: <ReservationsPage />},
      { path: "/tables", element: <TableManagementPage />},
      { path: "/opening-hours", element: <OpeningHoursPage />},
      { path: "/reviews", element:<ReviewsPage/>},
      { path: "/menus", element: <MenuManagementPage />},
      { path: "/settings", element: <SettingsPage/>},
    ]
  }
]);

export { router };