import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  CartPage,
  CheckoutFinalPage,
  CheckoutPage,
  ListingPage,
  LoginPage,
  ProductPage,
  RegisterPage
} from './pages';
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
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'register',
    element: <RegisterPage />
  },
  {
    path: 'product/:id',
    element: <ProductPage />
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
  }
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
