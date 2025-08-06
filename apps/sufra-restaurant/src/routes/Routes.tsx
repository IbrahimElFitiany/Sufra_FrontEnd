import AfterLandingPage from '@pages/AfterLandingPage';
import RestaurantRegistration from '@pages/RestaurantRegistrationPage';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { Navigate } from 'react-router-dom';


const LandingPage = lazy(() => import('@pages/LandingPage'));

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
    path: '/home',
    element: (
      <Suspense fallback={loader}>
        <AfterLandingPage/>
      </Suspense>
    ),
  },
]);

export { router };
