import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import * as dotenv from 'dotenv';

const dbConfig = config.get('db');
dotenv.config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: String(process.env.RDS_HOSTNAME),
  port: parseInt(process.env.RDS_PORT),
  username: String(process.env.RDS_USERNAME),
  password: String(process.env.RDS_PASSWORD),
  database: String(process.env.RDS_DB_NAME),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};
