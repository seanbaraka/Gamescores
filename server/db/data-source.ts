import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './models/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE_NAME,
  synchronize: true,
  logging: false,
  //   entities hold models
  entities: [User],
  subscribers: [],
  migrations: [],
});
