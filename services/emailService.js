import nodemailer from "nodemailer";
import pug from "pug";
import { v4 } from "uuid";
// import { convert } from "html-to-text";
import path from "path";

// export class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.name = user.name;
//     this.url = url;
//     this.from = process.env.EMAIL_FROM
//   }

//   _initTransport() {
//     const transporterConfig = {
//       host: process.env.MAILTRAP_HOST,
//       port: process.env.MAILTRAP_PORT,
//       secure: false,
//       auth: {
//         user: process.env.MAILTRAP_USER,
//         pass: process.env.MAILTRA_PASS,
//       },
//     };

//     return nodemailer.createTransport(transporterConfig);
//   }

//   async _send(template, subject) {
//     const html = pug.renderFile(path.join(process.cwd(), 'emails', `${template}.pug`))
    
//     const emailConfig = {
//       from: this.from,
//       to: this.to,
//       subject,
//       text: convert(html),
//       html
//     };

//     await this._initTransport().sendMail(emailConfig);
//   }
//   async sendHello() {
//     await this._send('hello', 'Welcome email');
//   }

//   async verification() {
//     await this._send('verification', 'Verification email')
//   }
// }

export const generateVerificationToken = () => {
  const token = v4();
  return token
};

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRA_PASS,
      },
    });
      
    const mailOptions = {
      from: 'email@example.com',
      to: '08dmutro11@gmail.com',
      subject: 'Email Verification',
      html:  pug.renderFile(path.join(process.cwd(), 'emails', `verification.pug`), {verificationToken})
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Error sending verification email');
  }
}
