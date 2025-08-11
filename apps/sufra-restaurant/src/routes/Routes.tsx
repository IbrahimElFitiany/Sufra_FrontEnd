import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { Navigate } from 'react-router-dom';
import Layout from '@layouts/Layout';

const RestaurantRegistration = lazy(() => import("@pages/RestaurantRegistrationPage"));
const LandingPage = lazy(() => import('@pages/LandingPage'));
const DashboardPage = lazy(() => import("@pages/DashboardPage"));
const OrdersPage = lazy(() => import("@pages/OrdersPage"));
const ReservationsPage = lazy(() => import("@pages/ReservationsPage"));
const TableManagementPage = lazy(() => import("@pages/TableManagementPage"));
const ReviewsPage = lazy(() => import('@pages/ReviewsPage'));
const OpeningHoursPage = lazy(() => import("@pages/OpeningHoursPage"));
const MenuManagementPage = lazy(() => import("@pages/MenuManagementPage"));

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
      <Suspense fallback={loader}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={loader}>
        <RestaurantRegistration />
      </Suspense>
    ),
  },
  {
    element: <Layout/>,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/orders", element: <OrdersPage />},
      { path: "/reservations", element: <ReservationsPage />},
      { path: "/tables", element: <TableManagementPage />},
      { path: "/opening-hours", element: <OpeningHoursPage />},
      { path: "/reviews", element:<ReviewsPage/>},
      { path: "/menus", element: <MenuManagementPage />},
    ]
  }
]);

export { router };