import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (email, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: {
        name: "Rx-Clinic",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Throw error to be caught in the controller
  }
};

export const sendEmailWithAttachments = async (
  email,
  subject,
  text,
  html,
  attachments
) => {
  try {
    const mailAttachments = attachments.map((file) => {
      return {
        filename: file.filename,
        path: file.path,
        contentType: file.mimetype,
      };
    });

    const info = await transporter.sendMail({
      from: {
        name: "Rx-Clinic",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: subject,
      text: text,
      html: html,
      attachments: mailAttachments,
    });

    console.log("Email with attachments sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email with attachments:", error);
    throw error;
  }
};
