import { shopInfo, discounts, products } from './data.ts';
import {
  Product,
  ProductShort,
  Discounts,
  CartDiscount,
  UserPrivacy,
  DB_Response,
  UserBilling,
  UserBillingShipping,
  UserBillingPayment,
  ShopCategories
} from './types.ts';
import store from './store.ts';

export {
  shopInfo,
  discounts,
  products,
  type Product,
  type ProductShort,
  type Discounts,
  type CartDiscount,
  type UserPrivacy,
  type DB_Response,
  type UserBilling,
  UserBillingShipping,
  UserBillingPayment,
  ShopCategories,
  store
};
