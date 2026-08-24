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

  const onSuccess = async () => {
    await refetch();
    setEditModal(false);
  };

  return (
    <div className="min-h-full space-y-6 p-4 sm:p-6 md:p-8 lg:p-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Classes
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your fitness classes and trainers.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          type="button"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md active:scale-[0.98] sm:w-auto"
        >
          <Plus size={16} strokeWidth={2.2} />
          <span>Add Class</span>
        </Button>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <SearchInput
          value={search}
          placeholder="Search classes or trainers..."
          onChange={setSearch}
        />
      </div>

      {/* Classes */}
      <div className="hidden md:block">
        {error && classes.length === 0 && (
          <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-600">{error}</p>
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
        onRefetch={refetch}
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
        onEdit={handleEdit}
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
