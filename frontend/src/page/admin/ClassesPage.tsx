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
    error,
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
    <div className="min-h-full p-3 sm:p-5 md:p-6 lg:p-8 xl:p-12">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Classes
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Manage your fitness classes and trainers.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-5 mb-6 flex flex-col gap-3 sm:mt-6 sm:mb-7 sm:flex-row sm:items-center sm:justify-between md:mt-7 md:mb-9">
        <div className="w-full sm:w-[55%] md:w-[45%]">
          <SearchInput
            value={search}
            placeholder="Search classes or trainers..."
            onChange={setSearch}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Button
            onClick={() => setModalOpen(true)}
            type="button"
            className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md active:scale-[0.98] sm:h-10 sm:w-auto sm:px-5 sm:text-sm"
          >
            <Plus size={15} strokeWidth={2.2} />
            <span>Add Class</span>
          </Button>
        </div>
      </div>

      {/* Classes */}
      <div>
        {error && classes.length === 0 && (
          <div className="mb-3 rounded-xl border border-red-100 bg-red-50 px-3 py-3 sm:mb-4 sm:px-5 sm:py-4">
            <p className="text-xs font-medium text-red-600 sm:text-sm">
              {error}
            </p>
          </div>
        )}

        <ClassTable
          classes={classes}
          loading={loading}
          pagination={pagination}
          onPageChange={fetchClasses}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      <ClassModal
        isOpen={modalOpen}
        onSuccess={onCreateSuccess}
        onClose={() => setModalOpen(false)}
      />

      <DeleteModal
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectClassId(null);
        }}
        onConfirm={handleDeleteConfirm}
      />

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
