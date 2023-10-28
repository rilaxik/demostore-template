import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ListingPage, ProductPage, CartPage, CheckoutPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ListingPage />
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
    path: 'product', //:id
    element: <ProductPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
