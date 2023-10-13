import "reflect-metadata"
import { DataSource } from 'typeorm';
import { User } from './models/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: 6434,
  username: 'postgres',
  password: process.env.PG_PASSWORD,
  database: 'railway',
  synchronize: true,
  logging: true,
//   entities hold models
  entities: [User],
  subscribers: [],
  migrations: [],
});


