import express from 'express';
import dotenv from 'dotenv';

dotenv.config({
    path: '.env.example',
})


const app = express();


const PROTOCOL = process.env.PROTOCOL;
const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
    console.log(`Server started at ${PROTOCOL}://${HOST}:${PORT}`);
})
