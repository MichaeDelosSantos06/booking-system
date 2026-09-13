import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import nodemailer from "nodemailer";

const transporter = vi.hoisted(() => ({
  sendMail: vi.fn(),
  verify: vi.fn(),
  createTransport: vi.fn(),
}));

vi.mock("nodemailer", () => ({
  default: {
    createTransport: transporter.createTransport,
  },
}));

vi.mock("../../config/env.js", () => ({
  env: {
    SMTP_HOST: "smtp.test.com",
    SMTP_PORT: 465,
    SMTP_USER: "smtp_user",
    SMTP_PASSWORD: "smtp_pass",
    EMAIL_FROM: "no-reply@fitbook.test",
  },
}));

const createTransportMock = nodemailer.createTransport as unknown as ReturnType<
  typeof vi.fn
>;

describe("EmailService", () => {
  beforeAll(() => {
    // Simulate an SMTP connection failure during startup verification.
    transporter.createTransport.mockImplementation(() => ({
      sendMail: transporter.sendMail,
      verify: transporter.verify,
    }));
    transporter.verify.mockImplementation(
      (callback: (error?: Error | null) => void) => callback(new Error("SMTP boom")),
    );
  });

  beforeEach(() => {
    transporter.sendMail.mockClear();
    transporter.verify.mockClear();
  });

  it("should create the transporter with the configured options and verify the connection on startup", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    // The module is loaded lazily so the startup verify callback runs here.
    await import("../../services/email.service.js");

    expect(createTransportMock).toHaveBeenCalledWith({
      host: "smtp.test.com",
      port: 465,
      secure: true,
      auth: { user: "smtp_user", pass: "smtp_pass" },
    });
    expect(transporter.verify).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith("SMTP connection failed:", expect.any(Error));

    errorSpy.mockRestore();
  });

  it("should send a password reset email with the correct options", async () => {
    const { default: EmailService } = await import("../../services/email.service.js");
    transporter.sendMail.mockResolvedValue({ messageId: "m1" });

    await EmailService.sendPasswordResetEmail(
      "user@example.com",
      "https://app.test/reset-password?token=abc",
    );

    expect(transporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "no-reply@fitbook.test",
        to: "user@example.com",
        subject: "Reset your FitBook password",
      }),
    );
  });

  it("should embed the reset link in the html body", async () => {
    const { default: EmailService } = await import("../../services/email.service.js");
    transporter.sendMail.mockResolvedValue({ messageId: "m2" });

    await EmailService.sendPasswordResetEmail(
      "someone@example.com",
      "https://app.test/reset?token=xyz",
    );

    const mailOptions = transporter.sendMail.mock.calls[0]![0] as { html: string };
    expect(mailOptions.html).toContain("https://app.test/reset?token=xyz");
  });

  it("should propagate the error when sending the email fails", async () => {
    const { default: EmailService } = await import("../../services/email.service.js");
    transporter.sendMail.mockRejectedValueOnce(new Error("SMTP send failed"));

    await expect(
      EmailService.sendPasswordResetEmail(
        "fail@example.com",
        "https://app.test/reset?token=fail",
      ),
    ).rejects.toThrow("SMTP send failed");
  });

  it("should log ready when SMTP verification succeeds", async () => {
    vi.resetModules();
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
    transporter.verify.mockImplementationOnce(
      (callback: (error?: Error | null) => void) => callback(null),
    );

    await import("../../services/email.service.js");

    expect(transporter.verify).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith("SMTP server is ready");

    logSpy.mockRestore();
  });
});