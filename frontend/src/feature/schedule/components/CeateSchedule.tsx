import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import type {
  CreateScheduleFormData,
  ScheduleFormProps,
} from "../../../types/schedule.type";

import { createScheduleSchema } from "../../../schema/schedule.shema";
import ScheduleService from "../../../services/schedule.service";
import { locationConfig } from "../../../types/schedule.type";

const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-100";

const selectClass =
  "h-10 w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-100";

const labelClass =
  "mb-1.5 block text-xs font-semibold tracking-wide text-slate-700";

const errorClass = "mt-1.5 text-xs font-medium text-red-600";

const CreateSchedule = ({
  isOpen,
  onClose,
  onSuccess,
  classes,
  trainer,
}: ScheduleFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createScheduleSchema),
    mode: "onBlur",
    defaultValues: {
      classId: "",
      trainerId: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      capacity: "",
    },
  });

  const onSubmit = async (data: CreateScheduleFormData) => {
    try {
      await ScheduleService.createSchedule(data);

      reset();
      await onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Class + Trainer */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Class */}
          <div>
            <label htmlFor="classId" className={labelClass}>
              Class
            </label>

            <select
              id="classId"
              className={selectClass}
              {...register("classId")}
            >
              <option value="">Select Class</option>

              {classes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.className}
                </option>
              ))}
            </select>

            {errors.classId && (
              <p className={errorClass}>{errors.classId.message}</p>
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
              {...register("trainerId")}
            >
              <option value="">Select Trainer</option>

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

        {/* Date + Start Time + End Time */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Date */}
          <div>
            <label htmlFor="date" className={labelClass}>
              Date
            </label>

            <Input
              id="date"
              type="date"
              className={inputClass}
              {...register("date")}
            />

            {errors.date && <p className={errorClass}>{errors.date.message}</p>}
          </div>

          {/* Start Time */}
          <div>
            <label htmlFor="startTime" className={labelClass}>
              Start Time
            </label>

            <Input
              id="startTime"
              type="time"
              className={inputClass}
              {...register("startTime")}
            />

            {errors.startTime && (
              <p className={errorClass}>{errors.startTime.message}</p>
            )}
          </div>

          {/* End Time */}
          <div>
            <label htmlFor="endTime" className={labelClass}>
              End Time
            </label>

            <Input
              id="endTime"
              type="time"
              className={inputClass}
              {...register("endTime")}
            />

            {errors.endTime && (
              <p className={errorClass}>{errors.endTime.message}</p>
            )}
          </div>
        </div>

        {/* Location + Capacity */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Location */}
          <div>
            <label htmlFor="location" className={labelClass}>
              Location
            </label>

            <select
              id="location"
              className={selectClass}
              {...register("location")}
            >
              {locationConfig.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            {errors.location && (
              <p className={errorClass}>{errors.location.message}</p>
            )}
          </div>

          {/* Capacity */}
          <div>
            <label htmlFor="capacity" className={labelClass}>
              Capacity
            </label>

            <Input
              id="capacity"
              type="number"
              min={1}
              className={inputClass}
              placeholder="e.g. 20"
              {...register("capacity")}
            />

            {errors.capacity && (
              <p className={errorClass}>{errors.capacity.message}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-2.5 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
          {/* Cancel */}
          <Button
            type="button"
            onClick={handleCancel}
            className="h-10 w-full rounded-lg border border-slate-300 bg-slate-100 px-5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-200 hover:text-slate-900 active:scale-[0.98] sm:w-auto sm:min-w-[100px] flex items-center justify-center"
          >
            Cancel
          </Button>

          {/* Create */}
          <Button
            type="submit"
            className="h-10 w-full rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] sm:w-auto sm:min-w-[120px] flex items-center justify-center"
          >
            Create Schedule
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateSchedule;
