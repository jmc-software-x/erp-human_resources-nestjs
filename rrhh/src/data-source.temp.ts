import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { Area } from './area/entities/area.entity';
import { Contrato } from './contrato/entities/contrato.entity';
import { Personal } from './personal/entities/personal.entity';
import { User } from './users/entities/user.entity';
import { Cargo } from './cargo/entities/cargo.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Area, Contrato, Personal, User, Cargo],
  migrations: ['src/migrations/*.ts'],
});
