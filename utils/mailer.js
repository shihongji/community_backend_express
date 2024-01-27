import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  auth: {
    user: process.env.TEST_EMAIL_USER,
    pass: process.env.TEST_EMAIL_PASS,
  },
});

export default transporter;

export const sendVerificationEmail = (userEmail, code) => {

  const mailOptions = {
    from: process.env.TEST_EMAIL_USER,
    to: userEmail,
    subject: "Verify your email",
    html: `<h1>Enter the following code to verify your email</h1>
    <p>${code}</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

export const sendResetPasswordEmail = (userEmail, token) => {
  const mailOptions = {
    from: process.env.TEST_EMAIL_USER,
    to: userEmail,
    subject: "Reset your password",
    html: `<h1>Click on the following link to reset your password</h1>
    <p>http://localhost:3000/verify/reset-password?token=${token}</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}
