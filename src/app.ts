import 'reflect-metadata';
import express from 'express';

import { AppDataSource } from './data-source';
import { apiRouter } from './router';
import { config } from './config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

const { PROTOCOL, HOST, PORT } = config;

app.listen(PORT, async () => {
    await AppDataSource.initialize()
        .then(() => {
            console.log('Data Source has been initialized!');
        })
        .catch((error) => console.log('Error during Data Source initialization!!!', error));
    console.log(`Server started at ${PROTOCOL}://${HOST}:${PORT}`);
});
