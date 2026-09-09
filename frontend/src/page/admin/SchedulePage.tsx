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

  const {
    schedule,
    refetch,
    search,
    setSearch,
    pagination,
    fetchSchedules,
    loading,
  } = useFetchSchedules();

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
      console.error("Failed to delete schedule:", error);
    }
  };

  const onSuccess = async () => {
    await refetch();
    setIsCreateModalOpen(false);
  };

  return (
    <div
      className="
        m-4
        flex
        flex-col
        gap-4
        sm:m-6
        sm:gap-5
        md:m-8
        md:gap-6
        lg:m-10
        lg:gap-5
        xl:m-12
      "
    >
      {/* Page Header */}
      <header>
        {loading ? (
          <div className="animate-pulse">
            <div className="flex items-center gap-2">
              {/* Red accent skeleton */}
              <div className="h-5 w-1 rounded-full bg-slate-200 sm:h-6" />

              {/* Title skeleton */}
              <div
                className="
                  h-6
                  w-28
                  rounded-md
                  bg-slate-200
                  sm:h-7
                  sm:w-32
                  md:h-9
                  md:w-40
                "
              />
            </div>

            {/* Description skeleton */}
            <div
              className="
                mt-2
                h-3
                w-64
                rounded
                bg-slate-100
                sm:mt-2.5
                sm:h-3.5
                sm:w-80
              "
            />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-red-600 sm:h-6" />

              <h1
                className="
                  text-xl
                  font-bold
                  tracking-tight
                  text-slate-950
                  sm:text-2xl
                  md:text-3xl
                "
              >
                Schedules
              </h1>
            </div>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
                sm:mt-1.5
                sm:text-sm
              "
            >
              Manage class schedules, trainers, locations, and capacity.
            </p>
          </>
        )}
      </header>

      {/* Search & Create */}
      <div
        className="
          mt-1
          flex
          flex-col
          gap-2.5
          sm:mt-2
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:gap-3
          md:mt-3
        "
      >
        {/* Search */}
        <div
          className="
            w-full
            sm:w-[50%]
            md:w-[42%]
            lg:w-[40%]
            xl:w-[38%]
          "
        >
          <SearchInput
            value={search}
            placeholder="Search for Schedule..."
            onChange={setSearch}
            loading={loading}
          />
        </div>

        {/* Create */}
        <div className="w-full sm:w-auto">
          {loading ? (
            <div
              className="
                h-9
                w-full
                animate-pulse
                rounded-lg
                bg-slate-200
                shadow-sm
                sm:h-9.5
                sm:w-[100px]
                sm:rounded-xl
                md:h-10
                md:w-[110px]
              "
              aria-hidden="true"
            >
              <div className="flex h-full items-center justify-center gap-2">
                <div className="h-3.5 w-3.5 rounded bg-slate-300 md:h-4 md:w-4" />
                <div className="h-3 w-10 rounded bg-slate-300 md:h-3.5 md:w-12" />
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              type="button"
              className="
                flex
                h-9
                w-full
                items-center
                justify-center
                gap-1.5
                rounded-lg
                bg-slate-950
                px-3
                text-[11px]
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-slate-800
                hover:shadow-md
                active:scale-[0.98]
                sm:h-9.5
                sm:w-auto
                sm:gap-2
                sm:px-4
                sm:text-xs
                md:h-10
                md:px-5
                md:text-sm
              "
            >
              <CalendarPlus
                size={13}
                strokeWidth={2.2}
                className="
                  sm:h-[14px]
                  sm:w-[14px]
                  md:h-[15px]
                  md:w-[15px]
                "
              />

              <span>Create</span>
            </Button>
          )}
        </div>
      </div>

      {/* Schedules */}
      <div className="min-w-0 w-full">
        <ScheduleTable
          schedule={schedule}
          onDelete={onDelete}
          pagination={pagination}
          onPageChange={fetchSchedules}
          loading={loading}
        />
      </div>

      {/* Create Schedule Modal */}
      <CreateSchedule
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={onSuccess}
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
