import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import {HashLoader , RingLoader} from 'react-spinners';

const HomePage = lazy(() => import('@pages/HomePage'));
const SearchResultsPage = lazy(() => import('@pages/SearchResultsPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));
const RestaurantPage = lazy(() => import('@pages/RestaurantPage'));
const CartPage = lazy(() => import('@pages/CartPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={ 
          <div className="fixed inset-0 z-50 bg-[#000000af] flex items-center justify-center text-white">
            <HashLoader color="#B68D67" size={50} />
          </div>}>
        <HomePage />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<RingLoader/>}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: '/search',
    element: (
      <Suspense fallback={<RingLoader/>}>
        <SearchResultsPage />
      </Suspense>
    ),
  },
  {
    path: '/restaurant/:id',
    element: (
      <Suspense fallback={<RingLoader />}>
        <RestaurantPage />
      </Suspense>
    ),
  },
  {
    path: '/cart',
    element: (
      <Suspense fallback={<RingLoader/>}>
        <CartPage />
      </Suspense>
    ),
  },
]);


export { router };