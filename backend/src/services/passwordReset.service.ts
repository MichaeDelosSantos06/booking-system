import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository.js";
import passwordResetRepository from "../repositories/passwordReset.repositoty.js";
import emailService from "./email.service.js";
import {
  generateResetToken,
  hashResetToken,
} from "../utils/passwordResetToken.js";

class PasswordResetService {
  async forgotPassword(email: string) {
    const user = await userRepository.findByEmail(email);

    // Don't reveal whether the email exists
    if (!user) {
      return;
    }

    // Remove previous reset tokens
    await passwordResetRepository.deleteExistingToken(user.id);

    // Generate raw token
    const token = generateResetToken();

    // Hash token before storing it
    const tokenHash = hashResetToken(token);

    // Token expires in 15 minutes
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await passwordResetRepository.generateResetToken({
      userId: user.id,
      tokenHash,
      expiresAt,
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    await emailService.sendPasswordResetEmail(user.email, resetUrl);
  }

  async resetPassword(token: string, password: string) {
    // Hash token received from frontend
    const tokenHash = hashResetToken(token);

    // Find token in database
    const resetToken = await passwordResetRepository.findTokenHash(tokenHash);

    // Token doesn't exist
    if (!resetToken) {
      throw new Error("Invalid or expired reset link");
    }

    // Token expired
    if (resetToken.expiresAt < new Date()) {
      await passwordResetRepository.deleteToken(resetToken.id);

      throw new Error("Invalid or expired reset link");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user's password
    await userRepository.updatePassword(resetToken.userId, hashedPassword);

    // Make token single-use
    await passwordResetRepository.deleteToken(resetToken.id);
  }
}

export default new PasswordResetService();
