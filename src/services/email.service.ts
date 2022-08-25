import { createTransport } from 'nodemailer';

import { Applicant } from "../entity";
import { config } from "../config";

const emailTransporter = createTransport({
  from: 'From NodeService job_in_Japan',
  // host: 'smtp.gmail.com',
  // port: 465,
  // secure: true,
  service: 'Gmail',
  auth: {
    // type: 'custom',
    // clientId: '810053192176-d0chn9j3l1qplkoniu7tsbr1r4idqqra.apps.googleusercontent.com',
    // clientSecret: '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',
    user: config.NO_REPLY_EMAIL,
    pass: config.GOOGLE_GENERATED_APP_PASSWORD
  },
});

class EmailService {
  async sendEmail(applicants: Applicant[]) {
    // const { subject, html } = emailInfo[action];

    console.log(applicants);

    let userEmails = [] as string[];

    applicants.forEach(item => {
      userEmails.push(item.email);
    })

    await emailTransporter.sendMail({
      to: userEmails,
      subject: 'New job',
    });
  }
}

export const emailService = new EmailService();