import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './models/user';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  entities: [User],
  synchronize: process.env.NODE_ENV !== 'production',
  migrations: ['./src/migrations/*.ts'],
});

dataSource.initialize();

export const database = dataSource;
