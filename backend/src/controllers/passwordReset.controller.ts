import type { Request, Response } from "express";
import passwordResetService from "../services/passwordReset.service.js";

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  await passwordResetService.forgotPassword(email);

  return res.status(200).json({
    message:
      "If an account exists with that email, a password reset link has been sent.",
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  await passwordResetService.resetPassword(token, password);

  return res.status(200).json({
    message: "Password successfully reset.",
  });
};
