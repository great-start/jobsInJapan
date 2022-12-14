import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PROTOCOL: process.env.PROTOCOL,
    HOST: process.env.HOST,
    PORT: process.env.PORT,

    // DataBase config
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,

    // email-sender config
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    GOOGLE_GENERATED_APP_PASSWORD: process.env.GOOGLE_GENERATED_APP_PASSWORD,

    // path to email template
    EMAIL_TEMPLATE_PATH: 'src/email/email.pug',
};
