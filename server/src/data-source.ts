import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Product } from './entity/Product';
import { Checkout } from './entity/Checkout';

export const AppDataSource: DataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User, Product, Checkout],
  migrations: [],
  subscribers: [],
});
