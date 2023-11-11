import { shopInfo, discounts, users, products } from './data.ts';
import {
  Product,
  ProductShort,
  Discounts,
  CartDiscount,
  UserPrivacy,
  DBUsers,
  UserBilling,
  UserBillingShipping,
  UserBillingPayment,
  ShopCategories
} from './types.ts';
import store from './store.ts';

export {
  shopInfo,
  discounts,
  users,
  products,
  type Product,
  type ProductShort,
  type Discounts,
  type CartDiscount,
  type UserPrivacy,
  type DBUsers,
  type UserBilling,
  UserBillingShipping,
  UserBillingPayment,
  ShopCategories,
  store
};
