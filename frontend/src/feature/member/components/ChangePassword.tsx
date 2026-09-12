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
  "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100";

const labelClass =
  "mb-1.5 block text-xs font-semibold tracking-wide text-slate-700";

const errorClass = "mt-1.5 text-xs font-medium text-red-600";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Header (replaces the password & security block) */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 ring-1 ring-slate-100">
                <LockKeyhole size={18} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <h2 className="text-sm font-bold text-slate-950">
                  Change Password
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Enter your current password and choose a new one
                </p>
              </div>
            </div>

            {/* Server error (e.g. wrong current password) shown inside the form */}
            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5">
                <ShieldAlert
                  size={16}
                  className="mt-0.5 shrink-0 text-red-500"
                />

                <p className="text-xs font-medium text-red-600">{error}</p>
              </div>
            )}

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

            {/* New Password */}
            <div>
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

            {/* Confirm New Password */}
            <div>
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

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="flex h-10 w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex h-10 w-full items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
  );
};

export default ChangePassword;