import "reflect-metadata"
import { DataSource } from 'typeorm';
import { User } from './models/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'containers-us-west-168.railway.app',
  port: 6434,
  username: 'postgres',
  password: 'nvnFqFyuTyaEHF0keJHh',
  database: 'railway',
  synchronize: true,
  logging: true,
//   entities hold models
  entities: [User],
  subscribers: [],
  migrations: [],
});


