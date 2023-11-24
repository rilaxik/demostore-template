import { type Route } from '@ecommerce/shared/types';
import { UserController } from './controller/UserController';
import { LoginController } from './controller/LoginController';
import { ProductController } from './controller/ProductController';

export const Routes: Route[] = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/users/:login',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove',
  },
  {
    method: 'post',
    route: '/login',
    controller: LoginController,
    action: 'one',
  },
  {
    method: 'get',
    route: '/products',
    controller: ProductController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/products/:id',
    controller: ProductController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/products',
    controller: ProductController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/products/:id',
    controller: ProductController,
    action: 'remove',
  },
];
