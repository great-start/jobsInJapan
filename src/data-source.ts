import { DataSource } from 'typeorm';
import { config } from './config';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.DB_HOST,
    port: Number(config.PORT),
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
});
