import { DataSource } from 'typeorm';

import { config } from './config';
import { Applicant, Position } from './entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [Applicant, Position],
    subscribers: [],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    migrationsRun: true
});
