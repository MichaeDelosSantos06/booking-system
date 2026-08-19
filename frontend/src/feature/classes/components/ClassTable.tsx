import useFetchClasses from "../../../hooks/useFetchClasses";
import Button from "../../../components/ui/Button";
import { Pencil, Trash2 } from "lucide-react";

const ClassTable = () => {
  const { classes, loading } = useFetchClasses();

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-slate-500">Loading classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Table Header */}
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-sm font-semibold text-slate-900">All Classes</h2>

        <p className="mt-0.5 text-xs text-slate-500">
          Manage your fitness classes and their trainers.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Class
              </th>

              <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Category
              </th>

              <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Trainer
              </th>

              <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Duration
              </th>

              <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {classes.length > 0 ? (
              classes.map((item) => (
                <tr
                  key={item.id}
                  className="group transition-colors duration-150 hover:bg-slate-50/60"
                >
                  {/* Class */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Image placeholder */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-[10px] font-semibold uppercase text-slate-400">
                        <img src={item.imageUrl} alt={item.className} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {item.className}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {item.difficulty}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {item.category}
                    </span>
                  </td>

                  {/* Trainer */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {item.trainer.name}
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {item.duration} min
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {item.status === "Active" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                      >
                        <Pencil size={14} />
                        Edit
                      </Button>

                      <Button
                        type="button"
                        className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-red-100 bg-white px-3 text-xs font-semibold text-red-500 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                      <span className="text-lg text-slate-400">—</span>
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                      No classes found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Create your first fitness class to get started.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {classes.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50/50 px-6 py-3">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {classes.length}
            </span>{" "}
            {classes.length === 1 ? "class" : "classes"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClassTable;
