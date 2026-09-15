import { beforeEach, describe, expect, it, vi } from "vitest";

const brevoMocks = vi.hoisted(() => {
  const sendTransacEmail = vi.fn();
  let lastOptions: unknown;
  // Use a real class so `new BrevoClient()` works and records its options.
  class BrevoClient {
    transactionalEmails = { sendTransacEmail };
    constructor(options: unknown) {
      lastOptions = options;
    }
  }
  return {
    sendTransacEmail,
    BrevoClient,
    getLastOptions: () => lastOptions,
  };
});

vi.mock("@getbrevo/brevo", () => ({
  BrevoClient: brevoMocks.BrevoClient,
}));

vi.mock("../../config/env.js", () => ({
  env: {
    BREVO_API_KEY: "test-brevo-api-key",
    EMAIL_FROM: "no-reply@fitbook.test",
  },
}));

import { BrevoClient } from "@getbrevo/brevo";
import EmailService from "../../services/email.service.js";

const sendTransacEmailMock = brevoMocks.sendTransacEmail as unknown as ReturnType<
  typeof vi.fn
>;
// Keep TS happy that the mocked module shape matches the real one.
void BrevoClient;

beforeEach(() => {
  sendTransacEmailMock.mockClear();
  sendTransacEmailMock.mockResolvedValue({ messageId: "brevo-id" } as never);
});

describe("EmailService.sendPasswordReset", () => {
  it("should construct the Brevo client with the configured API key", () => {
    expect(brevoMocks.getLastOptions()).toEqual({
      apiKey: "test-brevo-api-key",
    });
  });

  it("should send the reset email with the correct sender, recipient and subject", async () => {
    await EmailService.sendPasswordReset(
      "user@example.com",
      "https://app.test/reset-password?token=abc",
    );

    expect(sendTransacEmailMock).toHaveBeenCalledTimes(1);
    expect(sendTransacEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        sender: { name: "Fitnext", email: "no-reply@fitbook.test" },
        to: [{ email: "user@example.com" }],
        subject: "Reset your Fitnext password",
      }),
    );
  });

  it("should embed the reset url in the html content", async () => {
    const resetUrl = "https://app.test/reset-password?token=xyz";

    await EmailService.sendPasswordReset("someone@example.com", resetUrl);

    const payload = sendTransacEmailMock.mock.calls[0]![0] as {
      htmlContent: string;
    };
    expect(payload.htmlContent).toContain(resetUrl);
    expect(payload.htmlContent).toContain("15 minutes");
  });

  it("should resolve to undefined on success", async () => {
    await expect(
      EmailService.sendPasswordReset(
        "user@example.com",
        "https://app.test/reset-password?token=abc",
      ),
    ).resolves.toBeUndefined();
  });

  it("should propagate the error when Brevo fails to send", async () => {
    sendTransacEmailMock.mockRejectedValueOnce(new Error("Brevo send failed"));

    await expect(
      EmailService.sendPasswordReset(
        "fail@example.com",
        "https://app.test/reset?token=fail",
      ),
    ).rejects.toThrow("Brevo send failed");
  });
});
