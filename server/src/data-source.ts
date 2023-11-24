import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Product } from './entity/Product';

export const AppDataSource: DataSource = new DataSource({
  type: 'sqlite',
  database: 'db-test.sqlite',
  synchronize: true,
  logging: false,
  entities: [User, Product],
  migrations: [],
  subscribers: [],
});
