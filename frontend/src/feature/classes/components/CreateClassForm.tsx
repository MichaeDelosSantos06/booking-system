import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImageIcon, Upload } from "lucide-react";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import useFetchTrainer from "../../../hooks/useFetchTrainer";
import ClassService from "../../../services/class.service";
import { toast } from "sonner";
import axios from "axios";
import { categoryConfig } from "../../../types/class.types";

import type {
  CreateClassFormData,
  CreateClassFormProps,
} from "../../../types/class.types";

const inputClass =
  "h-9 w-full rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100 sm:h-10 sm:px-3 sm:text-sm";

const selectClass =
  "h-9 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-700 outline-none transition-all duration-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-100 sm:h-10 sm:px-3 sm:text-sm";

const labelClass =
  "mb-1.5 block text-[10px] font-semibold tracking-wide text-slate-700 sm:text-xs";

const errorClass = "mt-1.5 text-[10px] font-medium text-red-600 sm:text-xs";

const CreateClassForm = ({ onSuccess, onClose }: CreateClassFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const { trainer } = useFetchTrainer("Active");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      setImagePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

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
      await onSuccess();
      toast.success("Class Added!");
    } catch (error) {
      console.error("Failed to create class:", error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
      {/* Class Name + Class Image */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:gap-4">
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

        {/* Class Image */}
        <div>
          <label className={labelClass}>Class Image</label>

          <div className="flex h-9 overflow-hidden rounded-lg border border-slate-300 bg-white transition-all duration-200 hover:border-slate-400 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-100 sm:h-10">
            {/* Image Preview */}
            <div className="relative h-full w-9 shrink-0 overflow-hidden bg-slate-100 sm:w-10">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Class preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <ImageIcon
                    className="h-3.5 w-3.5 text-slate-400 sm:h-4 sm:w-4"
                    strokeWidth={1.8}
                  />
                </div>
              )}
            </div>

            {/* Upload */}
            <label
              htmlFor="imageUrl"
              className="group flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 px-2 sm:gap-2 sm:px-2.5"
            >
              <Upload
                size={13}
                strokeWidth={1.8}
                className="shrink-0 text-slate-400 transition-colors group-hover:text-slate-700 sm:h-3.5 sm:w-3.5"
              />

              <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-slate-600 sm:text-xs">
                {imagePreview ? "Change image" : "Upload image"}
              </span>

              <span className="shrink-0 rounded-md bg-slate-950 px-2 py-1 text-[9px] font-semibold text-white shadow-sm transition-all duration-200 group-hover:bg-slate-800 sm:px-2.5 sm:py-1.5 sm:text-[10px]">
                Browse
              </span>

              <Input
                id="imageUrl"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                {...register("imageUrl")}
                onChange={handleImageChange}
              />
            </label>
          </div>

          <p className="mt-1 text-[9px] text-slate-400 sm:text-[10px]">
            PNG, JPG or WEBP · Max 5MB
          </p>
        </div>
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
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100 sm:px-3 sm:py-2.5 sm:text-sm"
          {...register("description", {
            required: "Description is required",
          })}
        />

        {errors.description && (
          <p className={errorClass}>{errors.description.message}</p>
        )}
      </div>

      {/* Category + Difficulty */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:gap-4">
        {/* Category */}
        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>

          <select
            id="category"
            className={selectClass}
            {...register("category")}
          >
            {categoryConfig.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:gap-4">
        {/* Duration */}
        <div>
          <label htmlFor="duration" className={labelClass}>
            Duration
          </label>

          <div className="relative">
            <Input
              id="duration"
              type="number"
              min={1}
              max={300}
              className={`${inputClass} pr-10 sm:pr-12`}
              {...register("duration", {
                required: "Duration is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Duration must be at least 1 minute",
                },
                max: {
                  value: 300,
                  message: "Duration cannot exceed 5 hours",
                },
              })}
            />

            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400 sm:right-3 sm:text-xs">
              min
            </span>
          </div>

          {errors.duration && (
            <p className={errorClass}>{errors.duration.message}</p>
          )}
        </div>

        {/* Trainer */}
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

      {/* Status */}
      <div>
        <label htmlFor="status" className={labelClass}>
          Status
        </label>

        <select id="status" className={selectClass} {...register("status")}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse items-stretch gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-end sm:gap-2.5 sm:pt-4">
        <Button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="flex h-9 w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-auto sm:min-w-[90px] sm:text-sm"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex h-9 w-full items-center justify-center rounded-lg bg-slate-950 px-4 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-auto sm:min-w-[120px] sm:px-5 sm:text-sm"
        >
          {isSubmitting ? "Creating..." : "Create Class"}
        </Button>
      </div>
    </form>
  );
};

export default CreateClassForm;
