import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { LockKeyhole, ShieldAlert } from "lucide-react";

import Input from "../../../components/ui/Input";

import Button from "../../../components/ui/Button";

import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "../../../schema/user.schema";

interface ChangePasswordProps {
  isChanging: boolean;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (data: ChangePasswordFormData) => Promise<void>;
  onCancel: () => void;
}

const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-900 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:h-11 sm:rounded-xl sm:px-3.5 sm:text-sm";

const labelClass =
  "mb-1.5 block text-[10px] font-semibold tracking-wide text-slate-700 sm:mb-2 sm:text-xs";

const errorClass =
  "mt-1 text-[10px] font-medium text-red-600 sm:mt-1.5 sm:text-xs";

const ChangePassword = ({
  isChanging,
  isSubmitting,
  error,
  onSubmit,
  onCancel,
}: ChangePasswordProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Clear the form whenever the change-password section is (re)opened
  useEffect(() => {
    if (!isChanging) return;
    reset();
  }, [isChanging, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4 sm:space-y-5 md:space-y-6"
    >
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:rounded-2xl sm:p-5">
        {/* Subtle accent */}
        <div className="absolute left-0 top-0 h-full w-0.5 bg-slate-950 sm:w-1" />

        <div className="flex items-start gap-2.5 sm:gap-3.5 md:gap-4">
          {/* Icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm sm:h-11 sm:w-11 sm:rounded-xl md:h-12 md:w-12">
            <LockKeyhole
              size={16}
              strokeWidth={1.8}
              className="sm:h-[19px] sm:w-[19px]"
            />
          </div>

          {/* Header Content */}
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
              <h2 className="text-xs font-bold tracking-tight text-slate-950 sm:text-sm md:text-base">
                Change Password
              </h2>

              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-slate-500 sm:px-2 sm:text-[10px]">
                Security
              </span>
            </div>

            <p className="mt-0.5 max-w-lg text-[10px] leading-relaxed text-slate-500 sm:mt-1 sm:text-xs md:text-sm">
              Update your password to keep your account secure.
            </p>
          </div>
        </div>
      </div>

      {/* Server Error */}
      {error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-100 bg-red-50/80 px-3 py-2.5 sm:gap-3 sm:rounded-xl sm:px-3.5 sm:py-3 md:px-4">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-100 sm:h-7 sm:w-7 sm:rounded-lg">
            <ShieldAlert
              size={13}
              strokeWidth={1.8}
              className="text-red-500 sm:h-[15px] sm:w-[15px]"
            />
          </div>

          <div className="min-w-0 pt-0.5">
            <p className="text-[10px] font-semibold text-red-700 sm:text-xs">
              Unable to update password
            </p>

            <p className="mt-0.5 text-[10px] leading-relaxed text-red-600 sm:text-xs">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:rounded-2xl sm:p-5 md:p-6">
        {/* Section Header */}
        <div className="mb-4 border-b border-slate-100 pb-3.5 sm:mb-5 sm:pb-4">
          <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
            Password Information
          </h3>

          <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500 sm:mt-1 sm:text-xs">
            Enter your current password and create a new one.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className={labelClass}>
              Current Password
            </label>

            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter your current password"
              className={inputClass}
              autoComplete="current-password"
              {...register("currentPassword")}
            />

            {errors.currentPassword && (
              <p className={errorClass}>{errors.currentPassword.message}</p>
            )}
          </div>

          {/* New Password Section */}
          <div className="border-t border-slate-100 pt-4 sm:pt-5">
            <div className="mb-3.5 sm:mb-4">
              <p className="text-[10px] font-semibold text-slate-800 sm:text-xs">
                New password
              </p>

              <p className="mt-0.5 text-[9px] text-slate-400 sm:text-[11px]">
                Choose a strong password that you don't use elsewhere.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
              {/* New Password */}
              <div className="min-w-0">
                <label htmlFor="newPassword" className={labelClass}>
                  New Password
                </label>

                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  className={inputClass}
                  autoComplete="new-password"
                  {...register("newPassword")}
                />

                {errors.newPassword && (
                  <p className={errorClass}>{errors.newPassword.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="min-w-0">
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm New Password
                </label>

                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your new password"
                  className={inputClass}
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                />

                {errors.confirmPassword && (
                  <p className={errorClass}>{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end sm:gap-2.5 sm:pt-5">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex h-10 w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:shadow disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:w-auto sm:rounded-xl sm:px-5 sm:text-sm"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex h-10 w-full items-center justify-center rounded-lg bg-slate-950 px-4 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:min-w-[150px] sm:w-auto sm:rounded-xl sm:px-5 sm:text-sm"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
