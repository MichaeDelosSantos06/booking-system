import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

import type { EditModalProps } from "../../../types/trainer.type";

import { createTrainerSchema } from "../../../schema/trainer.schema";
import TrainerService from "../../../services/trainer.service";

const inputClass =
  "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100";

const selectClass =
  "h-10 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-100";

const labelClass =
  "mb-1.5 block text-xs font-semibold tracking-wide text-slate-700";

const errorClass = "mt-1.5 text-xs font-medium text-red-600";

const EditTrainerForm = ({
  isOpen,
  onClose,
  editData,
  onSuccess,
}: EditModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof createTrainerSchema>,
    unknown,
    z.output<typeof createTrainerSchema>
  >({
    resolver: zodResolver(createTrainerSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      experience: 0,
      specialization: "Yoga",
      status: "Active",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (!editData) return;

    reset({
      name: editData.name,
      email: editData.email,
      contact: editData.contact,
      experience: editData.experience,
      specialization: editData.specialization,
      status: editData.status,
    });
  }, [editData, reset]);

  const handleUpdateForm = async (
    data: z.output<typeof createTrainerSchema>
  ) => {
    if (!editData) return;

    try {
      await TrainerService.updateData(editData.id, data);

      await onSuccess();

      reset();

      toast.success("Trainer updated successfully!");
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

  const handleCloseForm = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(handleUpdateForm)} className="space-y-5">
        {/* Header */}
        {/* <div className="border-b border-slate-200 pb-4">
          <h2 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
            Edit Trainer
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Update the trainer's professional information.
          </p>
        </div> */}

        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact" className={labelClass}>
              Contact Number
            </label>

            <Input
              id="contact"
              type="text"
              inputMode="numeric"
              placeholder="09XXXXXXXXX"
              className={inputClass}
              {...register("contact")}
            />

            {errors.contact && (
              <p className={errorClass}>{errors.contact.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="experience" className={labelClass}>
              Experience
            </label>

            <div className="relative">
              <Input
                id="experience"
                type="number"
                min={0}
                className={`${inputClass} pr-16`}
                {...register("experience")}
              />

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                years
              </span>
            </div>

            {errors.experience && (
              <p className={errorClass}>{errors.experience.message}</p>
            )}
          </div>
        </div>

        {/* Specialization + Status */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="specialization" className={labelClass}>
              Specialization
            </label>

            <select
              id="specialization"
              className={selectClass}
              {...register("specialization")}
            >
              <option value="Yoga">Yoga</option>
              <option value="Cardio">Cardio</option>
              <option value="Strengthtraining">Strength Training</option>
              <option value="Boxing">Boxing</option>
              <option value="ZumbaDance">Zumba & Dance</option>
              <option value="HIIT">HIIT</option>
              <option value="Pilates">Pilates</option>
              <option value="CrossFit">CrossFit</option>
            </select>

            {errors.specialization && (
              <p className={errorClass}>{errors.specialization.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="status" className={labelClass}>
              Status
            </label>

            <select id="status" className={selectClass} {...register("status")}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {errors.status && (
              <p className={errorClass}>{errors.status.message}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            onClick={handleCloseForm}
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
    </Modal>
  );
};

export default EditTrainerForm;
