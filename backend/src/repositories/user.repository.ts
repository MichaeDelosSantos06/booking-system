import prisma from "../lib/prisma.js";

export const UserRepository = {
  registerUser: async (data: {
    name: string;
    email: string;
    contact: string;
    passwordHash: string;
  }) => {
    return prisma.user.create({
      data,
    });
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findById: async (id: number) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  },

  updatePassword: async (userId: number, password: string) => {
    return prisma.user.update({
      where: { id: userId },
      data: { passwordHash: password },
    });
  },
};

export default UserRepository;
