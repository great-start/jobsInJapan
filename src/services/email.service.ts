import { createTransport } from 'nodemailer';

import { Applicant } from "../entity";
import { config } from "../config";

const emailTransporter = createTransport({
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

    let userEmails = [] as string[];

    applicants.forEach(item => {
      userEmails.push(item.email);
    })

    await emailTransporter.sendMail({
      from: 'From NodeService job_in_Japan',
      sender: 'From NodeService job_in_Japan',
      to: userEmails,
      subject: 'New job position matching your application',
      html: '<html><head>From NodeService job_in_Japan</head></html>',

    });
  }
}

export const emailService = new EmailService();