import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer' 

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2e57f7fe56463c",
    pass: "3d6a8f71eb0d1f"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
       await  transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: "Jean Carlos <jeannesi.carlos@gmail.com>",
        subject,
        html: body
  })
  };
}