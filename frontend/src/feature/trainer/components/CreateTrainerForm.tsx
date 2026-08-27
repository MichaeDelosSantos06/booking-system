import { useForm } from "react-hook-form";

import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import type { TrainerModalProps } from "../../../types/trainer.type";

import TrainerService from "../../../services/trainer.service";
import { toast } from "sonner";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTrainerSchema,
  type CreateTrainerFormData,
} from "../../../schema/trainer.schema";

const inputClass =
  "h-9 w-full rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100 sm:h-10 sm:px-3 sm:text-sm";

const selectClass =
  "h-9 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-700 outline-none transition-all duration-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-100 sm:h-10 sm:px-3 sm:text-sm";

const labelClass =
  "mb-1.5 block text-[10px] font-semibold tracking-wide text-slate-700 sm:text-xs";

const errorClass = "mt-1.5 text-[10px] font-medium text-red-600 sm:text-xs";

const CreateTrainerForm = ({
  isOpen,
  onClose,
  onSuccess,
}: TrainerModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createTrainerSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      experience: 0,
      status: "Active",
    },
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = async (data: CreateTrainerFormData) => {
    try {
      await TrainerService.createTrainer(data);

      reset();
      await onSuccess();

      toast.success("Successfully Registered!");
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data?.errors;

        if (errors?.length) {
          toast.error(errors[0].message);
        } else {
          toast.error(error.response?.data?.message ?? "Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-4"
      >
        {/* Header
        <div className="border-b border-slate-200 pb-3 sm:pb-4">
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Add Trainer
          </h2>

          <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
            Add a trainer and their professional information.
          </p>
        </div> */}
        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>

            <Input
              id="name"
              type="text"
              placeholder="e.g. Kyla Marie"
              className={inputClass}
              {...register("name")}
            />

            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>

            <Input
              id="email"
              type="email"
              placeholder="e.g. kyla@example.com"
              className={inputClass}
              {...register("email")}
            />

            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>
        </div>
        {/* Contact + Experience */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:gap-4">
          {/* Contact */}
          <div>
            <label htmlFor="contact" className={labelClass}>
              Contact
            </label>

            <Input
              id="contact"
              type="text"
              placeholder="+63 9XX XXX XXXX"
              className={inputClass}
              {...register("contact")}
            />

            {errors.contact && (
              <p className={errorClass}>{errors.contact.message}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className={labelClass}>
              Experience
            </label>

            <div className="relative">
              <Input
                id="experience"
                type="number"
                min={0}
                className={`${inputClass} pr-14 sm:pr-16`}
                {...register("experience")}
              />

              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400 sm:right-3 sm:text-xs">
                years
              </span>
            </div>

            {errors.experience && (
              <p className={errorClass}>{errors.experience.message}</p>
            )}
          </div>
        </div>
        {/* Specialization + Status */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:gap-4">
          {/* Specialization */}
          <div>
            <label htmlFor="specialization" className={labelClass}>
              Specialization
            </label>

            <select
              id="specialization"
              className={selectClass}
              {...register("specialization")}
            >
              <option value="">Select Specialization</option>
              <option value="Yoga">Yoga</option>
              <option value="Strengthtraining">Strength Training</option>
              <option value="Boxing">Boxing</option>
              <option value="Cardio">Cardio</option>
              <option value="ZumbaDance">Zumba & Dance</option>
              <option value="HIIT">HIIT</option>
              <option value="Pilates">Pilates</option>
              <option value="CrossFit">CrossFit</option>
            </select>

            {errors.specialization && (
              <p className={errorClass}>{errors.specialization.message}</p>
            )}
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
        </div>
        {/* Actions */}
        <div className="flex flex-col-reverse items-stretch gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-end sm:gap-2.5 sm:pt-4">
          <Button
            type="button"
            onClick={handleClose}
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
            {isSubmitting ? "Creating..." : "Create Trainer"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTrainerForm;
