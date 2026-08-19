import { useForm } from "react-hook-form";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import useFetchTrainer from "../../../hooks/useFetchTrainer";
import ClassService from "../../../services/class.service";
import { Upload } from "lucide-react";

import type {
  CreateClassFormData,
  CreateClassFormProps,
} from "../../../types/class.types";

const inputClass =
  "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100";

const selectClass =
  "h-10 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-100";

const labelClass =
  "mb-1.5 block text-xs font-semibold tracking-wide text-slate-700";

const errorClass = "mt-1.5 text-xs font-medium text-red-600";

const CreateClassForm = ({ onSuccess }: CreateClassFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateClassFormData>({
    defaultValues: {
      className: "",
      description: "",
      category: "Cardio",
      difficulty: "Beginner",
      trainerId: undefined,
      duration: 60,
      status: "Active",
    },
  });

  const { trainer } = useFetchTrainer();

  const onSubmit = async (data: CreateClassFormData) => {
    try {
      const formData = new FormData();

      formData.append("className", data.className);
      formData.append("description", data.description);
      formData.append("duration", String(data.duration));
      formData.append("category", data.category);
      formData.append("difficulty", data.difficulty);
      formData.append("status", data.status);
      formData.append("trainerId", String(data.trainerId));

      const file = data.imageUrl?.[0];

      if (file) {
        formData.append("classImage", file);
      }

      await ClassService.createClass(formData);

      onSuccess();
    } catch (error) {
      console.error("Failed to create class:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Class Name */}
      <div>
        <label htmlFor="className" className={labelClass}>
          Class Name
        </label>

        <Input
          id="className"
          type="text"
          placeholder="e.g. Yoga Flow"
          className={inputClass}
          {...register("className", {
            required: "Class name is required",
          })}
        />

        {errors.className && (
          <p className={errorClass}>{errors.className.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>

        <textarea
          id="description"
          rows={2}
          placeholder="Briefly describe the class..."
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
          {...register("description", {
            required: "Description is required",
          })}
        />

        {errors.description && (
          <p className={errorClass}>{errors.description.message}</p>
        )}
      </div>

      {/* Category + Difficulty */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>

          <select
            id="category"
            className={selectClass}
            {...register("category")}
          >
            <option value="Strength">Strength</option>
            <option value="Cardio">Cardio</option>
            <option value="Flexibility">Flexibility</option>
            <option value="Combat">Combat</option>
            <option value="Group Fitness">Group Fitness</option>
          </select>
        </div>

        <div>
          <label htmlFor="difficulty" className={labelClass}>
            Difficulty
          </label>

          <select
            id="difficulty"
            className={selectClass}
            {...register("difficulty")}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advance">Advanced</option>
          </select>
        </div>
      </div>

      {/* Duration + Trainer */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="duration" className={labelClass}>
            Duration
          </label>

          <div className="relative">
            <Input
              id="duration"
              type="number"
              min={1}
              className={`${inputClass} pr-12`}
              {...register("duration", {
                required: "Duration is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Duration must be at least 1 minute",
                },
              })}
            />

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
              min
            </span>
          </div>

          {errors.duration && (
            <p className={errorClass}>{errors.duration.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="trainerId" className={labelClass}>
            Trainer
          </label>

          <select
            id="trainerId"
            className={selectClass}
            {...register("trainerId", {
              required: "Please select a trainer",
              valueAsNumber: true,
            })}
          >
            <option value="">Select trainer</option>

            {trainer.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {errors.trainerId && (
            <p className={errorClass}>{errors.trainerId.message}</p>
          )}
        </div>
      </div>

      {/* Image + Status */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Image Upload */}
        <div>
          <label htmlFor="imageUrl" className={labelClass}>
            Class Image
          </label>

          <label
            htmlFor="imageUrl"
            className="group flex h-20 cursor-pointer items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-4 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50"
          >
            {/* Upload Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition-all duration-200 group-hover:text-slate-900 group-hover:shadow">
              <Upload size={18} strokeWidth={1.8} />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-slate-900">
                Upload class image
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                PNG, JPG or WEBP · Max 5MB
              </p>
            </div>

            {/* Browse */}
            <span className="ml-auto shrink-0 rounded-lg bg-slate-950 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 group-hover:bg-slate-800 group-hover:shadow-md">
              Browse
            </span>

            {/* Existing input — logic unchanged */}
            <Input
              id="imageUrl"
              type="file"
              accept="image/*"
              className="sr-only"
              {...register("imageUrl")}
            />
          </label>
        </div>

        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>

          <select id="status" className={selectClass} {...register("status")}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2.5 border-t border-slate-200 pt-4">
        <Button
          type="button"
          onClick={onSuccess}
          disabled={isSubmitting}
          className="flex h-10 min-w-[90px] items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex h-10 min-w-[120px] items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Class"}
        </Button>
      </div>
    </form>
  );
};

export default CreateClassForm;
