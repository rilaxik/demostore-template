import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CartPage, CheckoutFinalPage, CheckoutPage, ListingPage, ProductPage } from './pages';
import { FilteredProducts } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ListingPage />,
    children: [
      {
        index: true,
        element: <FilteredProducts />
      }
    ]
  },
  {
    path: 'cart',
    element: <CartPage />
  },
  {
    path: 'checkout',
    element: <CheckoutPage />
  },
  {
    path: 'checkout/:cartId',
    element: <CheckoutFinalPage />
  },
  {
    path: 'product/:id',
    element: <ProductPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
