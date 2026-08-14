import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiCheckCircle, FiLock } from "react-icons/fi";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ResetPassword from "../../services/resetPassword.service";
import { forgotPasswordSchema } from "../../schema/user.schema";
import type { ForgotPasswordDto } from "../../types/user.type";

const ForgotPasswordPage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordDto) => {
    setMessage(null);
    setIsSuccess(false);

    try {
      const response = await ResetPassword.forgotPassword(data.email);

      setMessage(
        response.message ??
          "If an account exists with that email, a password reset link has been sent."
      );

      setIsSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.message ??
            "If an account exists with that email, a password reset link has been sent."
        );

        setIsSuccess(false);
        return;
      }

      setMessage(
        "If an account exists with that email, a password reset link has been sent."
      );

      setIsSuccess(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 sm:p-6">
      {/* Back to Login */}
      <div className="mb-5 w-full max-w-md px-4 sm:px-0">
        <Link
          to="/"
          className="font-poppins text-sm text-slate-500 transition hover:text-slate-900"
        >
          &lt;&nbsp; Back to login
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center space-y-4 pb-1 text-center">
          {/* Lock Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-sm ring-1 ring-red-100">
            <FiLock size={25} />
          </div>

          <div className="space-y-2">
            <h1 className="font-poppins text-2xl font-bold leading-6 text-slate-900">
              Forgot Password?
            </h1>

            <p className="font-poppins text-[12px] leading-5 text-slate-500">
              Enter your email address and we'll send you a reset link.
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-poppins text-sm font-semibold text-slate-700"
          >
            Email address <span className="text-red-500">*</span>
          </label>

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 font-poppins text-sm text-slate-900 outline-none transition placeholder:text-[13px] placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-3 focus:ring-red-500/10"
          />
        </div>

        {/* Form Error */}
        {errors.email && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <FiAlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />

            <p className="font-poppins text-[13px] font-medium leading-5 text-red-600">
              {errors.email.message}
            </p>
          </div>
        )}

        {/* Success / Server Message */}
        {message && (
          <div
            className={`flex items-start gap-2 rounded-xl px-4 py-3 ${
              isSuccess
                ? "border border-green-200 bg-green-50"
                : "border border-red-200 bg-red-50"
            }`}
          >
            {isSuccess ? (
              <FiCheckCircle
                size={16}
                className="mt-0.5 shrink-0 text-green-500"
              />
            ) : (
              <FiAlertCircle
                size={16}
                className="mt-0.5 shrink-0 text-red-500"
              />
            )}

            <p
              className={`font-poppins text-[13px] font-medium leading-5 ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 w-full flex-col justify-center rounded-xl bg-red-600 font-poppins text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 hover:shadow-red-600/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
