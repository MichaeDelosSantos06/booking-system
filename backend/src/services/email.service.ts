import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("SMTP connection failed:", error);
  } else {
    console.log("SMTP server is ready");
  }
});

class EmailService {
  async sendPasswordResetEmail(email: string, resetUrl: string) {
    await transporter.sendMail({
      from: env.EMAIL_FROM,
      to: email,
      subject: "Reset your FitBook password",
      html: `
        <h2>Reset your password</h2>

        <p>
          We received a request to reset your password.
        </p>

        <p>
          Click the button below to reset your password.
        </p>

        <a href="${resetUrl}">
          Reset Password
        </a>

        <p>
          This link will expire in 15 minutes.
        </p>

        <p>
          If you did not request this, you can safely ignore this email.
        </p>
      `,
    });
  }
}

export default new EmailService();
