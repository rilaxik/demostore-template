import { type Route } from 'shared/types';
import { UserController } from './controller/UserController';
import { LoginController } from './controller/LoginController';

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
];
