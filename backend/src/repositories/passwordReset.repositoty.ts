import prisma from "../lib/prisma.js";
import type { ResetTokenDto } from "../types/user.type.js";

const ForgotPasswordRepositoty = {
  // RESET PASSWORD
  generateResetToken: async (data: ResetTokenDto) => {
    return prisma.passwordResetToken.create({
      data,
    });
  },

  findTokenHash: async (tokenHash: string) => {
    return prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });
  },

  deleteToken: async (id: number) => {
    return prisma.passwordResetToken.delete({
      where: { id },
    });
  },

  deleteExistingToken: async (userId: number) => {
    prisma.passwordResetToken.deleteMany({
      where: { userId },
    });
  },
};

export default ForgotPasswordRepositoty;
