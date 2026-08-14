import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ResetPassword from "../../services/resetPassword.service";
import { resetPasswordSchema } from "../../schema/user.schema";

import type { ResetPasswordDto } from "../../types/user.type";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordDto) => {
    if (!token) {
      return;
    }

    try {
      await ResetPassword.resetPassword(token, data.password);

      navigate("/", {
        state: {
          message: "Password successfully reset. Please sign in.",
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // You can handle the backend error here if needed.
        console.error(
          error.response?.data?.message ?? "Invalid or expired reset link."
        );

        return;
      }

      console.error("Something went wrong.");
    }
  };

  // No token in URL
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <FiAlertCircle size={24} />
            </div>
          </div>

          <h1 className="font-poppins text-2xl font-bold text-slate-900">
            Invalid reset link
          </h1>

          <p className="mt-2 font-poppins text-sm text-slate-500">
            This password reset link is invalid or missing.
          </p>

          <Button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="mt-6 h-11 w-full rounded-xl bg-red-600 font-poppins font-semibold text-white transition hover:bg-red-700"
          >
            Request a new link
          </Button>
        </div>
      </div>
    );
  }

  /*
   * Get the first validation error.
   * This keeps the error message simple and consistent.
   */
  const firstError = Object.values(errors)[0];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
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
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <h1 className="font-poppins text-2xl font-bold leading-6 text-slate-900">
            Create a new password
          </h1>

          <p className="font-poppins text-[12px] leading-5 text-slate-500">
            Enter a new password for your account.
          </p>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="font-poppins text-sm font-semibold text-slate-700"
          >
            New password
            <span className="font-poppins text-red-500">*</span>
          </label>

          <Input
            id="password"
            type="password"
            placeholder="Enter your new password"
            {...register("password")}
            className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 font-poppins text-sm text-slate-900 outline-none transition placeholder:text-[13px] placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-3 focus:ring-red-500/10"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="font-poppins text-sm font-semibold text-slate-700"
          >
            Confirm password
            <span className="font-poppins text-red-500">*</span>
          </label>

          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            {...register("confirmPassword")}
            className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 font-poppins text-sm text-slate-900 outline-none transition placeholder:text-[13px] placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-3 focus:ring-red-500/10"
          />
        </div>

        {/* Validation Error */}
        {Object.keys(errors).length > 0 && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <FiAlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />

            <p className="font-poppins text-[13px] font-medium leading-5 text-red-600">
              {firstError?.message ?? "Please check your input."}
            </p>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 w-full flex-col justify-center rounded-xl bg-red-600 font-poppins text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 hover:shadow-red-600/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
