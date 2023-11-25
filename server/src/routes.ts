import { type Route } from '@ecommerce/shared/types';
import { UserController } from './controller/UserController';
import { LoginController } from './controller/LoginController';
import { ProductController } from './controller/ProductController';
import { CheckoutController } from './controller/CheckoutController';

export const Routes: Route[] = [
  // users
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save',
  },
  // {
  //   method: 'delete',
  //   route: '/users/:id',
  //   controller: UserController,
  //   action: 'remove',
  // },
  // login & register
  {
    method: 'get',
    route: '/users/:email',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/login',
    controller: LoginController,
    action: 'one',
  },
  // products
  {
    method: 'get',
    route: '/products',
    controller: ProductController,
    action: 'all',
  },
  {
    method: 'post',
    route: '/products/ids',
    controller: ProductController,
    action: 'many',
  },
  {
    method: 'post',
    route: '/products',
    controller: ProductController,
    action: 'save',
  },
  // {
  //   method: 'delete',
  //   route: '/products/:id',
  //   controller: ProductController,
  //   action: 'remove',
  // },
  {
    method: 'get',
    route: '/checkout',
    controller: CheckoutController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/checkout/:id',
    controller: CheckoutController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/checkout',
    controller: CheckoutController,
    action: 'save',
  },
];
