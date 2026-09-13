import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { UserRound } from "lucide-react";

import Input from "../../../components/ui/Input";

import Button from "../../../components/ui/Button";

import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "../../../schema/user.schema";

interface UpdateProfileProps {
  isEditing: boolean;
  defaultValues: UpdateProfileFormData;
  isSubmitting: boolean;
  onSubmit: (data: UpdateProfileFormData) => Promise<void>;
  onCancel: () => void;
}

const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-900 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:h-11 sm:rounded-xl sm:px-3.5 sm:text-sm";

const labelClass =
  "mb-1.5 block text-[10px] font-semibold tracking-wide text-slate-700 sm:mb-2 sm:text-xs";

const errorClass = "mt-1.5 text-[10px] font-medium text-red-600 sm:text-xs";

const UpdateProfile = ({
  isEditing,
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: UpdateProfileProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
  });

  // Sync the form when entering edit mode or when data changes
  useEffect(() => {
    if (!isEditing) return;
    reset(defaultValues);
  }, [isEditing, defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4 sm:space-y-5 md:space-y-6"
    >
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:rounded-2xl sm:p-5">
        {/* Subtle accent */}
        <div className="absolute left-0 top-0 h-full w-1 bg-red-500" />

        <div className="flex items-start gap-3 sm:gap-4">
          {/* Icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 ring-1 ring-red-100 sm:h-11 sm:w-11 sm:rounded-xl md:h-12 md:w-12">
            <UserRound
              size={17}
              strokeWidth={1.8}
              className="sm:h-[19px] sm:w-[19px] md:h-5 md:w-5"
            />
          </div>

          {/* Header Text */}
          <div className="min-w-0 flex-1">
            <h2 className="text-xs font-bold tracking-tight text-slate-950 sm:text-sm md:text-base">
              Edit Profile
            </h2>

            <p className="mt-0.5 max-w-lg text-[10px] leading-relaxed text-slate-500 sm:mt-1 sm:text-xs md:text-sm">
              Update your personal information and contact details.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:rounded-2xl sm:p-5 md:p-6">
        {/* Section Header */}
        <div className="mb-4 border-b border-slate-100 pb-3 sm:mb-5 sm:pb-4">
          <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
            Personal Information
          </h3>

          <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500 sm:mt-1 sm:text-xs">
            Keep your profile information up to date.
          </p>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {/* Full Name */}
          <div className="min-w-0">
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>

            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className={inputClass}
              {...register("name")}
            />

            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>

          {/* Contact Number */}
          <div className="min-w-0">
            <label htmlFor="contact" className={labelClass}>
              Contact Number
            </label>

            <Input
              id="contact"
              type="tel"
              placeholder="09XX XXX XXXX"
              maxLength={11}
              className={inputClass}
              {...register("contact")}
            />

            {errors.contact && (
              <p className={errorClass}>{errors.contact.message}</p>
            )}
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
          className="flex h-10 w-full items-center justify-center rounded-lg bg-slate-950 px-4 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:min-w-[130px] sm:w-auto sm:rounded-xl sm:px-5 sm:text-sm"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateProfile;
