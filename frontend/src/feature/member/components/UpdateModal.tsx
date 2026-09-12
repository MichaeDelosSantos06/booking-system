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
  "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100";

const labelClass =
  "mb-1.5 block text-xs font-semibold tracking-wide text-slate-700";

const errorClass = "mt-1.5 text-xs font-medium text-red-600";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Header (replaces the avatar block) */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100">
            <UserRound size={24} className="text-red-500" />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-950">Edit Profile</h2>

            <p className="mt-0.5 truncate text-sm text-slate-500">
              Update your name and contact information
            </p>
          </div>
        </div>

        {/* Full Name */}
        <div>
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

          {errors.name && (
            <p className={errorClass}>{errors.name.message}</p>
          )}
        </div>

        {/* Contact Number */}
        <div>
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
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
  );
};

export default UpdateProfile;
