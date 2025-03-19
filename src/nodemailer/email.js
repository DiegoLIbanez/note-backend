import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "../mailtrap/emailTemplate.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Corrección del host
  port: 587,
  secure: false,
  auth: {
    user: "diegoibanez336@gmail.com",
    pass: "klocahajjtlgegsn",
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const res = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, // Corrección del destinatario
      subject: "Verification Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });
    console.log("Email sent successfully", res);
  } catch (error) {
    console.error("Error sending email", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const res = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to our app",
      html: `<h1>Welcome ${name}</h1>`,
    });
    console.log("Email sent successfully", res);
  } catch (error) {
    console.error("Error sending email", error);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const res = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });
    console.log("Email sent successfully", res);
  } catch (error) {
    console.error("Error sending email", error);
  }
};

export const sendResetSuccessPassword = async (email) => {
  try {
    const res = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log("Email sent successfully", res);
  } catch (error) {
    console.error("Error sending email", error);
  }
};
