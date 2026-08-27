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
  console.log("Trainer: ", trainer);

  // handle closing and refeching of create
  const onSuccess = async () => {
    await refetch();
    setModalIsOpen(false);
  };

  // get data from the card
  // being pass to the table/card where ever the data is displayed, then use to capture the mapped item/data when click becuase it is callBack function, use in edit button.
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

  // handle refetch and closing of EDIT MODAL
  const onSuccessEdit = async () => {
    await refetch();
    setEditModal(false);
  };

  const activeTrainerCount = trainer.filter(
    (item) => item.status === "Active"
  ).length;

  return (
    <div className="flex h-full min-h-0 flex-col px-4 py-5 sm:px-6 sm:py-6 lg:px-12 lg:py-12">
      {/* Page Header */}
      <div className="mb-5 flex shrink-0 flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Title + Summary */}
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Manage Trainers
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            {activeTrainerCount} active trainers
            <span className="mx-1 text-slate-300">•</span>
            {trainer.length} total
          </p>
        </div>

        {/* Add Trainer */}
        <Button
          onClick={() => setModalIsOpen(true)}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md sm:h-10 sm:w-auto sm:text-sm"
        >
          <Plus size={15} strokeWidth={2} />
          Add Trainer
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Header Skeleton */}
                <div className="flex items-center gap-3 border-b border-slate-100 p-4 sm:p-5">
                  <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-200" />

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-3.5 w-28 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                  </div>

                  <div className="h-5 w-14 animate-pulse rounded-full bg-slate-100" />
                </div>

                {/* Body Skeleton */}
                <div className="space-y-4 p-4 sm:p-5">
                  {[1, 2, 3].map((row) => (
                    <div key={row} className="flex items-center gap-3">
                      <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-100" />

                      <div className="flex-1 space-y-1.5">
                        <div className="h-2.5 w-16 animate-pulse rounded bg-slate-100" />
                        <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Skeleton */}
                <div className="flex gap-2 border-t border-slate-100 bg-slate-50/70 p-3">
                  <div className="h-8 flex-1 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-8 flex-1 animate-pulse rounded-lg bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex min-h-[320px] items-center justify-center">
            <div className="flex max-w-md flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-red-100 bg-red-50">
                <AlertCircle
                  size={22}
                  strokeWidth={1.8}
                  className="text-red-500"
                />
              </div>

              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                Unable to load trainers
              </h2>

              <p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm">
                We couldn't retrieve the trainer list right now. Please try
                again.
              </p>

              <Button
                onClick={refetch}
                className="mt-5 flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 sm:h-10 sm:text-sm"
              >
                <RefreshCw size={14} strokeWidth={2} />
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && trainer.length === 0 && (
          <div className="flex min-h-[320px] items-center justify-center">
            <div className="flex max-w-md flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                <Users size={25} strokeWidth={1.7} className="text-slate-500" />
              </div>

              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                No trainers yet
              </h2>

              <p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm">
                Your trainer directory is currently empty. Add your first
                trainer to get started.
              </p>

              <Button
                onClick={() => setModalIsOpen(true)}
                className="mt-5 flex h-9 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md sm:h-10 sm:text-sm"
              >
                <Plus size={14} strokeWidth={2} />
                Add Trainer
              </Button>
            </div>
          </div>
        )}

        {/* Data */}
        {!loading && !error && trainer.length > 0 && (
          <TrainerCard
            trainer={trainer}
            onEdit={getTrainerData}
            deactivate={deactivate}
            activate={activate}
          />
        )}
      </div>

      {/* Modal */}
      <CreateTrainerForm
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onSuccess={onSuccess}
      />

      {/* Edit Modal */}
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
