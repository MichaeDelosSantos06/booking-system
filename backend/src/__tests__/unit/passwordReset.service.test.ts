import { beforeEach, describe, expect, it, vi } from "vitest";
import bcrypt from "bcrypt";

vi.mock("bcrypt", () => {
  const hash = vi.fn();
  return { hash, default: { hash } };
});

vi.mock("../../repositories/user.repository.js", () => ({
  default: {
    findByEmail: vi.fn(),
    updatePassword: vi.fn(),
  },
}));

vi.mock("../../repositories/passwordReset.repositoty.js", () => ({
  default: {
    deleteExistingToken: vi.fn(),
    generateResetToken: vi.fn(),
    findTokenHash: vi.fn(),
    deleteToken: vi.fn(),
  },
}));

vi.mock("../../services/email.service.js", () => ({
  default: {
    sendPasswordReset: vi.fn(),
  },
}));

vi.mock("../../utils/passwordResetToken.js", () => ({
  generateResetToken: vi.fn(),
  hashResetToken: vi.fn(),
}));

import PasswordResetService from "../../services/passwordReset.service.js";
import userRepository from "../../repositories/user.repository.js";
import passwordResetRepository from "../../repositories/passwordReset.repositoty.js";
import emailService from "../../services/email.service.js";
import { generateResetToken, hashResetToken } from "../../utils/passwordResetToken.js";

const bcryptHashMock = bcrypt.hash as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("PasswordResetService.forgotPassword", () => {
  beforeEach(() => {
    process.env.CLIENT_URL = "https://app.example.com";
  });

  it("should silently return when the email does not exist", async () => {
    vi.mocked(userRepository.findByEmail).mockResolvedValue(null);

    await expect(PasswordResetService.forgotPassword("ghost@example.com")).resolves.toBeUndefined();

    expect(passwordResetRepository.deleteExistingToken).not.toHaveBeenCalled();
    expect(generateResetToken).not.toHaveBeenCalled();
    expect(emailService.sendPasswordReset).not.toHaveBeenCalled();
  });

  it("should delete old tokens, store a hashed token expiring in 15 minutes and send the reset email", async () => {
    vi.mocked(userRepository.findByEmail).mockResolvedValue({
      id: 5,
      email: "michael@example.com",
    } as never);
    vi.mocked(passwordResetRepository.deleteExistingToken).mockResolvedValue({
      count: 1,
    } as never);
    vi.mocked(generateResetToken).mockReturnValue("raw-token");
    vi.mocked(hashResetToken).mockReturnValue("hashed-token");
    vi.mocked(passwordResetRepository.generateResetToken).mockResolvedValue({
      id: 1,
    } as never);
    vi.mocked(emailService.sendPasswordReset).mockResolvedValue(undefined as never);

    const before = Date.now();
    const result = await PasswordResetService.forgotPassword("michael@example.com");

    expect(result).toBeUndefined();
    expect(userRepository.findByEmail).toHaveBeenCalledWith("michael@example.com");
    expect(passwordResetRepository.deleteExistingToken).toHaveBeenCalledWith(5);
    expect(hashResetToken).toHaveBeenCalledWith("raw-token");

    const stored = vi.mocked(passwordResetRepository.generateResetToken).mock.calls[0]![0];
    expect(stored.userId).toBe(5);
    expect(stored.tokenHash).toBe("hashed-token");
    // The token must last exactly 15 minutes from creation (allow ms of execution drift).
    const expiresInMs = stored.expiresAt.getTime() - before;
    expect(expiresInMs).toBeGreaterThanOrEqual(15 * 60 * 1000);
    expect(expiresInMs).toBeLessThan(15 * 60 * 1000 + 60_000);

    expect(emailService.sendPasswordReset).toHaveBeenCalledWith(
      "michael@example.com",
      "https://app.example.com/reset-password?token=raw-token",
    );
  });
});

describe("PasswordResetService.resetPassword", () => {
  it("should throw when the token hash is not found", async () => {
    vi.mocked(hashResetToken).mockReturnValue("hashed-token");
    vi.mocked(passwordResetRepository.findTokenHash).mockResolvedValue(null);

    await expect(
      PasswordResetService.resetPassword("raw-token", "NewPass1!"),
    ).rejects.toThrow("Invalid or expired reset link");

    expect(hashResetToken).toHaveBeenCalledWith("raw-token");
    expect(passwordResetRepository.findTokenHash).toHaveBeenCalledWith("hashed-token");
    expect(userRepository.updatePassword).not.toHaveBeenCalled();
    expect(passwordResetRepository.deleteToken).not.toHaveBeenCalled();
  });

  it("should delete the token and throw when the token has expired", async () => {
    vi.mocked(hashResetToken).mockReturnValue("hashed-token");
    vi.mocked(passwordResetRepository.findTokenHash).mockResolvedValue({
      id: 99,
      userId: 5,
      tokenHash: "hashed-token",
      expiresAt: new Date(Date.now() - 60_000),
    } as never);

    await expect(
      PasswordResetService.resetPassword("raw-token", "NewPass1!"),
    ).rejects.toThrow("Invalid or expired reset link");

    expect(passwordResetRepository.deleteToken).toHaveBeenCalledWith(99);
    expect(userRepository.updatePassword).not.toHaveBeenCalled();
  });

  it("should hash the new password, update the user and delete the token to make it single-use", async () => {
    vi.mocked(hashResetToken).mockReturnValue("hashed-token");
    vi.mocked(passwordResetRepository.findTokenHash).mockResolvedValue({
      id: 99,
      userId: 5,
      tokenHash: "hashed-token",
      expiresAt: new Date(Date.now() + 60_000),
    } as never);
    bcryptHashMock.mockResolvedValue("new-hashed-password");
    vi.mocked(userRepository.updatePassword).mockResolvedValue({ id: 5 } as never);
    vi.mocked(passwordResetRepository.deleteToken).mockResolvedValue({ id: 99 } as never);

    await PasswordResetService.resetPassword("raw-token", "NewPass1!");

    expect(hashResetToken).toHaveBeenCalledWith("raw-token");
    expect(bcrypt.hash).toHaveBeenCalledWith("NewPass1!", 12);
    expect(userRepository.updatePassword).toHaveBeenCalledWith(5, "new-hashed-password");
    expect(passwordResetRepository.deleteToken).toHaveBeenCalledWith(99);
  });
});