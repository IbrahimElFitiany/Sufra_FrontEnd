import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@pages/HomePage';
import SearchResultsPage from '@pages/SearchResultsPage';
import NotFoundPage from '@pages/NotFoundPage';
import RestaurantPage from '@pages/RestaurantPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/search',
    element: <SearchResultsPage />,
  },
  {
    path: '/restaurant/:id',
    element: <RestaurantPage />,
  },
]);

export { router };