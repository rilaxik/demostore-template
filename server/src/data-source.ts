import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User, Product, Checkout } from '#entities';

export const AppDataSource: DataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User, Product, Checkout],
  migrations: [],
  subscribers: [],
});
