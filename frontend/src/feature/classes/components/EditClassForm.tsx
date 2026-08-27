import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImageIcon, Upload } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import useFetchTrainer from "../../../hooks/useFetchTrainer";
import ClassService from "../../../services/class.service";
import { toast } from "sonner";
import type {
  CreateClassFormData,
  EditClassFormProps,
} from "../../../types/class.types";
import axios from "axios";

const inputClass =
  "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100";

const selectClass =
  "h-10 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-100";

const labelClass =
  "mb-1.5 block text-xs font-semibold tracking-wide text-slate-700";

const errorClass = "mt-1.5 text-xs font-medium text-red-600";

const EditClassForm = ({
  onSuccess,
  editData,
  onClose,
}: EditClassFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateClassFormData>();

  const { trainer } = useFetchTrainer("Active");

  const [imagePreview, setImagePreview] = useState<string | null>(
    editData?.imageUrl ?? null
  );

  useEffect(() => {
    if (!editData || trainer.length === 0) return;

    reset({
      className: editData.className,
      description: editData.description,
      category: editData.category,
      difficulty: editData.difficulty,
      duration: editData.duration,
      trainerId: editData.trainerId,
      status: editData.status,
    });

    setImagePreview(editData.imageUrl ?? null);
  }, [editData, trainer, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  const handleEdit = async (data: CreateClassFormData) => {
    if (!editData) return;

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

      await ClassService.updateClass(editData.id, formData);

      await onSuccess();

      toast.success("Class updated successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleEdit)} className="space-y-5">
      {/* Class Name + Image */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

          <div className="flex h-10 overflow-hidden rounded-lg border border-slate-300 bg-white transition-all duration-200 hover:border-slate-400 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-100">
            {/* Image */}
            <div className="relative h-full w-10 shrink-0 overflow-hidden bg-slate-100">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={editData?.className ?? "Class preview"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <ImageIcon
                    className="h-4 w-4 text-slate-400"
                    strokeWidth={1.8}
                  />
                </div>
              )}
            </div>

            {/* Upload */}
            <label
              htmlFor="imageUrl"
              className="group flex min-w-0 flex-1 cursor-pointer items-center gap-2 px-2.5"
            >
              <Upload
                size={14}
                strokeWidth={1.8}
                className="shrink-0 text-slate-400 transition-colors group-hover:text-slate-700"
              />

              <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-600">
                {imagePreview ? "Change image" : "Upload image"}
              </span>
              <span className="shrink-0 rounded-md bg-slate-950 px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-sm transition-all duration-200 group-hover:bg-slate-800">
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

          <p className="mt-1 text-[10px] text-slate-400">
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
          rows={3}
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <option value="GroupFitness">Group Fitness</option>
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              className={`${inputClass} pr-12`}
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

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
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

            {trainer.length !== 0 &&
              trainer.map((item) => (
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
      <div className="flex items-center justify-end gap-2.5 border-t border-slate-200 pt-4">
        <Button
          type="button"
          onClick={onClose}
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
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default EditClassForm;
