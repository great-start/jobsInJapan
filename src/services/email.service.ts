import { createTransport } from 'nodemailer';
import Email from 'email-templates';
import path from 'path';

import { Applicant, Position } from '../entity';
import { config } from '../config';

const emailTransporter = createTransport({
    service: 'Gmail',
    auth: {
        user: config.NO_REPLY_EMAIL,
        // not an email pass. But generated App Password using Google personal account settings
        pass: config.GOOGLE_GENERATED_APP_PASSWORD,
    },
});

class EmailService {
    async sendEmail(emailAction: { subject: string, header: string }, applicants: Applicant[], position: Position) {
        const { subject, header } = emailAction;
        const { category, level, company, japaneseRequired, description } = position;

        let userEmails = [] as string[];

        applicants.forEach((item) => {
            userEmails.push(item.email);
        });

        const emailTemplatePath = path.join(process.cwd(), 'src/email/email.pug');

        const renderedEmail = await new Email().render(emailTemplatePath, {
            header,
            subject,
            category,
            level,
            company,
            japaneseRequired,
            description,
        });

        await emailTransporter.sendMail({
            to: userEmails,
            subject,
            html: renderedEmail,
        });
    }
}

export const emailService = new EmailService();
