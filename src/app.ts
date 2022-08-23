import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PROTOCOL, HOST, PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Server started at ${PROTOCOL}://${HOST}:${PORT}`);
});
