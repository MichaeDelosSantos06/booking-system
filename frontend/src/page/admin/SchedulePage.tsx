import { useState } from "react";

import { CalendarPlus } from "lucide-react";

import CreateSchedule from "../../feature/schedule/components/CeateSchedule";
import ScheduleTable from "../../feature/schedule/components/ScheduleTable";
import DeleteModal from "../../feature/classes/components/DeleteModal";

import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";

import ScheduleService from "../../services/schedule.service";

import useFetchSchedules from "../../hooks/useFetchSchedules";
import useFetchTrainer from "../../hooks/useFetchTrainer";
import useFetchActiveClasses from "../../hooks/useFetchStatusClasses";

const SchedulePage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [onDeleteId, setOnDeleteId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const { schedule, refetch, search, setSearch, pagination, fetchSchedules } =
    useFetchSchedules();
  const { trainer } = useFetchTrainer("Active");
  const { classes } = useFetchActiveClasses("Active");

  const onDelete = async (id: number) => {
    setOnDeleteId(id);
    setDeleteModal(true);
  };
  const handleDeleteConfirm = async () => {
    if (onDeleteId === null) return;

    try {
      await ScheduleService.deleteSchedule(onDeleteId);
      setDeleteModal(false);
      setOnDeleteId(null);
      await refetch();
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  const onSuccess = async () => {
    await refetch();
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-full p-3 sm:p-5 md:p-6 lg:p-8 xl:p-12">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Schedules
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Manage class schedules, trainers, locations, and capacity.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-5 mb-6 flex flex-col gap-3 sm:mt-6 sm:mb-7 sm:flex-row sm:items-center sm:justify-between md:mt-7 md:mb-9">
        <div className="w-full sm:w-[55%] md:w-[45%]">
          <SearchInput
            value={search}
            placeholder="Search for Schedule..."
            onChange={setSearch}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            type="button"
            className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md active:scale-[0.98] sm:h-10 sm:w-auto sm:px-5 sm:text-sm"
          >
            <CalendarPlus size={15} strokeWidth={2.2} />
            <span>Create</span>
          </Button>
        </div>
      </div>

      {/* Schedules */}
      <div>
        <ScheduleTable
          schedule={schedule}
          onDelete={onDelete}
          pagination={pagination}
          onPageChange={fetchSchedules}
        />
      </div>

      {/* Create Schedule Modal */}
      <CreateSchedule
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => onSuccess()}
        classes={classes}
        trainer={trainer}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => {
          setOnDeleteId(null);
          setDeleteModal(false);
        }}

        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default SchedulePage;
