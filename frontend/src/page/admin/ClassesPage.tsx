import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import ClassModal from "../../feature/classes/components/ClassModal";
import ClassTable from "../../feature/classes/components/ClassTable";

const ClassPage = () => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-full space-y-6 p-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Classes
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your fitness classes and trainers.
          </p>
        </div>

        <Button onClick={() => setModalOpen(true)}>
          <span className="flex items-center gap-2">
            <Plus size={18} />
            Add Class
          </span>
        </Button>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <SearchInput
          value={search}
          placeholder="Search classes or trainers..."
          onChange={setSearch}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Desktop / Tablet */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <ClassTable />
          </div>
        </div>

        {/* Mobile */}
        <div className="divide-y divide-slate-100 md:hidden">
          <div className="p-4">
            {/* Class header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-medium text-slate-400">
                  IMAGE
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-slate-900">
                    Yoga Flow
                  </h2>
                  <p className="text-xs text-slate-500">Beginner</p>
                </div>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

            {/* Details */}
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Category
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  Flexibility
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Trainer
                </p>
                <p className="mt-1 truncate text-sm font-medium text-slate-700">
                  Kyla Marie
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Duration
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  60 min
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              <Button>
                <span className="flex w-full items-center justify-center gap-1.5">
                  <Pencil size={15} />
                  Edit
                </span>
              </Button>

              <Button>
                <span className="flex w-full items-center justify-center gap-1.5">
                  <Trash2 size={15} />
                  Delete
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ClassModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ClassPage;
