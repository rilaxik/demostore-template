import { DB_Response, Route } from "./request";

import {
  UsersGetSchema,
  UsersRegisterSchema,
  type UsersType,
  UsersLoginSchema,
} from "./users";

import {
  ProductRegisterSchema,
  type ProductType,
  ProductGetOneSchema,
} from "./product";

import {
  ShopCategoriesEnum,
  ShopCategoriesSchema,
  ShopQuerySchema,
} from "./shop";

const SERVER_CONFIG: any = {
  PROTO: "http",
  PATH: "localhost",
  PORT: 3001,
};

export {
  SERVER_CONFIG,
  type DB_Response,
  type Route,
  UsersGetSchema,
  UsersRegisterSchema,
  type UsersType,
  UsersLoginSchema,
  ProductRegisterSchema,
  type ProductType,
  ProductGetOneSchema,
  ShopCategoriesEnum,
  ShopCategoriesSchema,
  ShopQuerySchema,
};
