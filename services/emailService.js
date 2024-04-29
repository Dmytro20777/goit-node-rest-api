import nodemailer from "nodemailer";
import { v4 } from "uuid";

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
      text: `Please click the following link to verify your email: /users/verify/${verificationToken}`,
      html: `<p>Please click the following link to verify your email:</p>
      <p><a href="http://localhost:3000/users/verify/${verificationToken}">Verify Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Error sending verification email');
  }
}
