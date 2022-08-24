import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';

import { AppDataSource } from './data-source';
import { apiRouter } from './router';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

const { PROTOCOL, HOST, PORT } = process.env;

app.listen(PORT, async () => {
    await AppDataSource.initialize()
        .then(() => {
            console.log('Data Source has been initialized!');
            console.log(`Server started at ${PROTOCOL}://${HOST}:${PORT}`);
        })
        .catch((error) =>
            console.log('Error during Data Source initialization!!!', error)
        );
});
