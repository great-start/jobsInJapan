import { createTransport } from 'nodemailer';

import { Applicant } from "../entity";
import { config } from "../config";

const emailTransporter = createTransport({
  service: 'Gmail',
  auth: {
    user: config.NO_REPLY_EMAIL,
    // not an email pass. But generated App Password using Google personal account settings
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