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
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Reset your FitBook password</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
              font-family: Arial, Helvetica, sans-serif;
              color: #171717;
            "
          >
            <table
              role="presentation"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
              style="
                background-color: #f5f5f5;
                padding: 40px 16px;
              "
            >
              <tr>
                <td align="center">

                  <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="
                      max-width: 560px;
                      background-color: #ffffff;
                      border-radius: 16px;
                      overflow: hidden;
                      border: 1px solid #e5e5e5;
                    "
                  >

                    <!-- Header -->
                    <tr>
                      <td
                        style="
                          padding: 28px 32px;
                          background-color: #111111;
                          text-align: center;
                        "
                      >
                        <div
                          style="
                            font-size: 24px;
                            font-weight: 700;
                            letter-spacing: -0.5px;
                            color: #ffffff;
                          "
                        >
                          FitBook
                        </div>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 40px 32px;">

                        <h1
                          style="
                            margin: 0 0 16px;
                            font-size: 28px;
                            line-height: 1.3;
                            font-weight: 700;
                            color: #171717;
                          "
                        >
                          Reset your password
                        </h1>

                        <p
                          style="
                            margin: 0 0 18px;
                            font-size: 16px;
                            line-height: 1.6;
                            color: #525252;
                          "
                        >
                          We received a request to reset the password
                          for your FitBook account.
                        </p>

                        <p
                          style="
                            margin: 0 0 28px;
                            font-size: 16px;
                            line-height: 1.6;
                            color: #525252;
                          "
                        >
                          Click the button below to create a new password
                          and regain access to your account.
                        </p>

                        <!-- Reset Button -->
                        <table
                          role="presentation"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          style="margin: 0 0 28px;"
                        >
                          <tr>
                            <td
                              align="center"
                              style="
                                border-radius: 8px;
                                background-color: #dc2626;
                              "
                            >
                              <a
                                href="${resetUrl}"
                                target="_blank"
                                style="
                                  display: inline-block;
                                  padding: 14px 28px;
                                  font-size: 15px;
                                  font-weight: 700;
                                  line-height: 1;
                                  color: #ffffff;
                                  text-decoration: none;
                                  border-radius: 8px;
                                "
                              >
                                Reset Password
                              </a>
                            </td>
                          </tr>
                        </table>

                        <!-- Security Notice -->
                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          style="
                            margin-bottom: 28px;
                            background-color: #fafafa;
                            border: 1px solid #e5e5e5;
                            border-radius: 10px;
                          "
                        >
                          <tr>
                            <td
                              style="
                                padding: 14px 16px;
                                font-size: 14px;
                                line-height: 1.5;
                                color: #525252;
                              "
                            >
                              <strong style="color: #171717;">
                                Security notice:
                              </strong>
                              This password reset link will expire in
                              <strong>15 minutes</strong>.
                            </td>
                          </tr>
                        </table>

                        <p
                          style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.6;
                            color: #737373;
                          "
                        >
                          If you didn't request a password reset, you can
                          safely ignore this email. Your password will
                          remain unchanged.
                        </p>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td
                        style="
                          padding: 24px 32px;
                          background-color: #fafafa;
                          border-top: 1px solid #e5e5e5;
                          text-align: center;
                        "
                      >
                        <p
                          style="
                            margin: 0 0 6px;
                            font-size: 13px;
                            font-weight: 600;
                            color: #404040;
                          "
                        >
                          FitBook
                        </p>

                        <p
                          style="
                            margin: 0;
                            font-size: 12px;
                            line-height: 1.5;
                            color: #a3a3a3;
                          "
                        >
                          This is an automated message. Please do not
                          reply to this email.
                        </p>
                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });
  }
}

export default new EmailService();
