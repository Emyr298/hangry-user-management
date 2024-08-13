import { DataSource } from 'typeorm';
import { User } from './models/user';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  entities: [User],
  synchronize: true,
});

dataSource.initialize();

export const database = dataSource;
