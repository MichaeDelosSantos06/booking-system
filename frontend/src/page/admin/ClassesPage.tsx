import { useState } from "react";

import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import ClassModal from "../../feature/classes/components/ClassModal";
import ClassTable from "../../feature/classes/components/ClassTable";
import useFetchClasses from "../../hooks/useFetchClasses";
import ClassService from "../../services/class.service";
import DeleteModal from "../../feature/classes/components/DeleteModal";
import EditModal from "../../feature/classes/components/ClassEditModal";
import type { ClassResponseDto } from "../../types/class.types";

import { Plus } from "lucide-react";

const ClassPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectClassId, setSelectClassId] = useState<number | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState<ClassResponseDto | null>(null);

  const {
    classes,
    loading,
    search,
    setSearch,
    pagination,
    fetchClasses,
    refetch,
  } = useFetchClasses();

  const handleDelete = (id: number) => {
    setSelectClassId(id);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectClassId === null) return;

    try {
      await ClassService.deleteClassById(selectClassId);

      setDeleteModal(false);
      setSelectClassId(null);

      await refetch();
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  const handleEdit = (data: ClassResponseDto) => {
    setEditData(data);
    setEditModal(true);
  };

  const onCreateSuccess = async () => {
    await refetch();
    setModalOpen(false);
  };

  const onSuccess = async () => {
    await refetch();
    setEditModal(false);
  };

  return (
    <div
      className="
        flex
        w-full
        min-w-0
        flex-1
        flex-col
        gap-4
        sm:gap-5
        md:gap-6
        lg:gap-5
      "
    >
      {/* Page Header */}
      <header>
        {loading ? (
          <div className="animate-pulse">
            {/* Title Skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-slate-200 sm:h-6" />

              <div
                className="
                  h-6
                  w-24
                  rounded-md
                  bg-slate-200
                  sm:h-7
                  sm:w-28
                  md:h-9
                  md:w-32
                "
              />
            </div>

            {/* Description Skeleton */}
            <div
              className="
                mt-2
                h-3
                w-64
                rounded
                bg-slate-100
                sm:mt-2.5
                sm:h-3.5
                sm:w-72
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
                Classes
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
              Manage your fitness classes and trainers.
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
            sm:w-[55%]
            md:w-[45%]
          "
        >
          <SearchInput
            value={search}
            placeholder="Search classes or trainers..."
            onChange={setSearch}
            loading={loading}
          />
        </div>

        {/* Add Class */}
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
                sm:h-10
                sm:w-[125px]
                sm:rounded-xl
              "
              aria-hidden="true"
            >
              <div className="flex h-full items-center justify-center gap-2">
                <div className="h-3.5 w-3.5 rounded bg-slate-300 sm:h-4 sm:w-4" />
                <div className="h-3 w-14 rounded bg-slate-300 sm:h-3.5 sm:w-16" />
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setModalOpen(true)}
              type="button"
              className="
                flex
                h-9
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-slate-950
                px-4
                text-xs
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-slate-800
                hover:shadow-md
                active:scale-[0.98]
                sm:h-10
                sm:w-auto
                sm:px-5
                sm:text-sm
              "
            >
              <Plus
                size={14}
                strokeWidth={2.2}
                className="sm:h-[15px] sm:w-[15px]"
              />

              <span>Add Class</span>
            </Button>
          )}
        </div>
      </div>

      {/* Classes */}
      <div className="min-w-0 w-full">
        {/* Class Table */}
        <ClassTable
          classes={classes}
          loading={loading}
          pagination={pagination}
          onPageChange={fetchClasses}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {/* Create Class Modal */}
      <ClassModal
        isOpen={modalOpen}
        onSuccess={onCreateSuccess}
        onClose={() => setModalOpen(false)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectClassId(null);
        }}
        onConfirm={handleDeleteConfirm}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={editModal}
        editData={editData}
        onSuccess={onSuccess}
        onClose={() => {
          setEditData(null);
          setEditModal(false);
        }}
      />
    </div>
  );
};

export default ClassPage;
