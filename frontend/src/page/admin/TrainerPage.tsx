import { Plus, Users, RefreshCw, AlertCircle } from "lucide-react";
import { useState } from "react";

import Button from "../../components/ui/Button";
import TrainerCard from "../../feature/trainer/components/TrainerCards";
import CreateTrainerForm from "../../feature/trainer/components/CreateTrainerForm";
import useFetchTrainer from "../../hooks/useFetchTrainer";
import EditTrainerForm from "../../feature/trainer/components/EditTrainerForm";
import type { TrainerResponseDto } from "../../types/trainer.type";
import TrainerService from "../../services/trainer.service";

const TrainerPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [trainerData, setTrainerData] = useState<TrainerResponseDto | null>(
    null
  );

  const { refetch, trainer, error, loading } = useFetchTrainer();

  // Handle closing and refreshing of create
  const onSuccess = async () => {
    await refetch();
    setModalIsOpen(false);
  };

  // Get trainer data from the card
  const getTrainerData = (data: TrainerResponseDto) => {
    setTrainerData(data);
    setEditModal(true);
  };

  const deactivate = async (id: number) => {
    await TrainerService.deactivate(id);
    await refetch();
  };

  const activate = async (id: number) => {
    await TrainerService.activate(id);
    await refetch();
  };

  // Handle refresh and closing of edit modal
  const onSuccessEdit = async () => {
    await refetch();
    setEditModal(false);
  };

  const activeTrainerCount = trainer.filter(
    (item) => item.status === "Active"
  ).length;

  return (
    <div
      className="
        m-4
        flex
        h-full
        min-h-0
        flex-col
        sm:m-6
        md:m-8
        lg:m-10
        xl:m-12
      "
    >
      {/* Page Header */}
      <div
        className="
          mb-4
          flex
          shrink-0
          flex-col
          gap-3
          sm:mb-5
          sm:gap-4
          md:mb-6
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* Title + Summary */}
        <div className="min-w-0">
          {loading ? (
            <div className="animate-pulse">
              {/* Title Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-1 shrink-0 rounded-full bg-slate-200 sm:h-6" />

                <div
                  className="
                    h-6
                    w-36
                    rounded-md
                    bg-slate-200
                    sm:h-7
                    sm:w-44
                    md:h-9
                    md:w-52
                  "
                />
              </div>

              {/* Summary Skeleton */}
              <div
                className="
                  mt-2
                  h-3
                  w-40
                  rounded
                  bg-slate-100
                  sm:mt-2.5
                  sm:h-3.5
                  sm:w-48
                "
              />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 shrink-0 rounded-full bg-red-600 sm:h-6" />

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
                  Manage Trainers
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
                {activeTrainerCount} active trainers
                <span className="mx-1 text-slate-300">•</span>
                {trainer.length} total
              </p>
            </>
          )}
        </div>

        {/* Add Trainer */}
        {loading ? (
          <div
            className="
              h-9
              w-full
              animate-pulse
              rounded-lg
              bg-slate-200
              shadow-sm
              sm:h-9
              sm:w-[125px]
              sm:rounded-xl
              md:h-10
              md:w-[140px]
            "
            aria-hidden="true"
          >
            <div className="flex h-full items-center justify-center gap-2">
              <div className="h-3.5 w-3.5 rounded bg-slate-300 md:h-4 md:w-4" />

              <div className="h-3 w-16 rounded bg-slate-300 md:h-3.5 md:w-20" />
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setModalIsOpen(true)}
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
              sm:h-9
              sm:w-auto
              sm:gap-2
              sm:px-4
              sm:text-xs
              md:h-10
              md:px-5
              md:text-sm
            "
          >
            <Plus
              size={13}
              strokeWidth={2}
              className="
                sm:h-[14px]
                sm:w-[14px]
                md:h-[15px]
                md:w-[15px]
              "
            />
            Add Trainer
          </Button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {/* Error */}
        {!loading && error && (
          <div
            className="
              flex
              min-h-[260px]
              items-center
              justify-center
              sm:min-h-[300px]
              md:min-h-[320px]
            "
          >
            <div className="flex max-w-md flex-col items-center px-4 text-center">
              <div
                className="
                  mb-3
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-red-100
                  bg-red-50
                  sm:mb-4
                  sm:h-12
                  sm:w-12
                "
              >
                <AlertCircle
                  size={19}
                  strokeWidth={1.8}
                  className="text-red-500 sm:h-[22px] sm:w-[22px]"
                />
              </div>

              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                Unable to load trainers
              </h2>

              <p
                className="
                  mt-1
                  max-w-sm
                  text-xs
                  leading-5
                  text-slate-500
                  sm:mt-1.5
                  sm:text-sm
                "
              >
                We couldn't retrieve the trainer list right now. Please try
                again.
              </p>

              <Button
                onClick={refetch}
                className="
                  mt-4
                  flex
                  h-9
                  items-center
                  justify-center
                  gap-1.5
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-3
                  text-[11px]
                  font-semibold
                  text-slate-700
                  shadow-sm
                  transition-all
                  hover:bg-slate-50
                  hover:text-slate-900
                  sm:mt-5
                  sm:h-10
                  sm:gap-2
                  sm:px-4
                  sm:text-xs
                  md:text-sm
                "
              >
                <RefreshCw
                  size={13}
                  strokeWidth={2}
                  className="sm:h-[14px] sm:w-[14px]"
                />
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && trainer.length === 0 && (
          <div
            className="
              flex
              min-h-[260px]
              items-center
              justify-center
              sm:min-h-[300px]
              md:min-h-[320px]
            "
          >
            <div className="flex max-w-md flex-col items-center px-4 text-center">
              <div
                className="
                  mb-3
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  sm:mb-4
                  sm:h-14
                  sm:w-14
                  sm:rounded-2xl
                "
              >
                <Users
                  size={22}
                  strokeWidth={1.7}
                  className="text-slate-500 sm:h-[25px] sm:w-[25px]"
                />
              </div>

              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                No trainers yet
              </h2>

              <p
                className="
                  mt-1
                  max-w-sm
                  text-xs
                  leading-5
                  text-slate-500
                  sm:mt-1.5
                  sm:text-sm
                "
              >
                Your trainer directory is currently empty. Add your first
                trainer to get started.
              </p>

              <Button
                onClick={() => setModalIsOpen(true)}
                className="
                  mt-4
                  flex
                  h-9
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
                  hover:bg-slate-800
                  hover:shadow-md
                  sm:mt-5
                  sm:h-10
                  sm:gap-2
                  sm:px-4
                  sm:text-xs
                  md:text-sm
                "
              >
                <Plus
                  size={13}
                  strokeWidth={2}
                  className="sm:h-[14px] sm:w-[14px]"
                />
                Add Trainer
              </Button>
            </div>
          </div>
        )}

        {/* Trainer Cards + Skeleton */}
        {!error && (
          <TrainerCard
            trainer={trainer}
            onEdit={getTrainerData}
            deactivate={deactivate}
            activate={activate}
            loading={loading}
          />
        )}
      </div>

      {/* Create Trainer Modal */}
      <CreateTrainerForm
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onSuccess={onSuccess}
      />

      {/* Edit Trainer Modal */}
      <EditTrainerForm
        isOpen={editModal}
        editData={trainerData}
        onSuccess={onSuccessEdit}
        onClose={() => {
          setTrainerData(null);
          setEditModal(false);
        }}
      />
    </div>
  );
};

export default TrainerPage;
