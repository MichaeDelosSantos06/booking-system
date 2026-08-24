import { ImageIcon, Pencil, Trash2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import Pagination from "../../../components/ui/Pagination";
import type { ClassTableProps } from "../../../types/class.types";

const ClassTable = ({
  loading,
  classes,
  onDelete,
  onEdit,
  pagination,
  onPageChange,
}: ClassTableProps) => {
  return (
    <div className="flex h-[540px] min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Table Area */}
      <div className="custom-scrollbar min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[700px] table-fixed text-left sm:min-w-[760px]">
          {/* Responsive column widths */}
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[14%]" />
            <col className="w-[17%]" />
            <col className="w-[11%]" />
            <col className="w-[11%]" />
            <col className="w-[23%]" />
          </colgroup>

          {/* Header */}
          <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:px-4 sm:py-3.5 sm:text-[11px]">
                Class
              </th>

              <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:px-4 sm:py-3.5 sm:text-[11px]">
                Category
              </th>

              <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:px-4 sm:py-3.5 sm:text-[11px]">
                Trainer
              </th>

              <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:px-4 sm:py-3.5 sm:text-[11px]">
                Duration
              </th>

              <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:px-4 sm:py-3.5 sm:text-[11px]">
                Status
              </th>

              <th className="px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:px-4 sm:py-3.5 sm:text-[11px] flex justify-center">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="h-64 px-4 text-center align-middle sm:px-6"
                >
                  <div className="flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-slate-600" />
                  </div>
                </td>
              </tr>
            ) : classes.length > 0 ? (
              classes.map((item) => (
                <tr
                  key={item.id}
                  className="group transition-colors duration-150 hover:bg-slate-50/60"
                >
                  {/* Class */}
                  <td className="px-3 py-3 sm:px-4 sm:py-4">
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 sm:h-10 sm:w-10">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.className}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-zinc-100">
                            <ImageIcon className="h-4 w-4 text-zinc-500 sm:h-5 sm:w-5" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p
                          className="truncate text-xs font-semibold leading-5 text-slate-900 sm:text-sm"
                          title={item.className}
                        >
                          {item.className}
                        </p>

                        <p
                          className="mt-0.5 truncate text-[10px] leading-4 text-slate-400 sm:text-xs"
                          title={item.difficulty}
                        >
                          {item.difficulty}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="overflow-hidden px-2 py-3 sm:px-4 sm:py-4">
                    <span
                      className="inline-flex max-w-full items-center truncate rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 sm:rounded-lg sm:px-2.5 sm:text-xs"
                      title={item.category}
                    >
                      {item.category}
                    </span>
                  </td>

                  {/* Trainer */}
                  <td className="overflow-hidden px-3 py-3 sm:px-4 sm:py-4">
                    <span
                      className="block truncate text-xs font-medium text-slate-700 sm:text-sm"
                      title={item.trainer.name}
                    >
                      {item.trainer.name}
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="px-3 py-3 sm:px-4 sm:py-4">
                    <div className="flex items-baseline gap-1 whitespace-nowrap">
                      <span className="text-xs font-medium text-slate-700 sm:text-sm">
                        {item.duration}
                      </span>

                      <span className="text-[10px] text-slate-400 sm:text-xs">
                        min
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3 sm:px-4 sm:py-4">
                    {item.status === "Active" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600 sm:gap-1.5 sm:px-2.5 sm:text-xs">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[9px] font-semibold text-slate-500 sm:gap-1.5 sm:px-2.5 sm:text-xs">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3 sm:px-4 sm:py-4">
                    <div className="flex justify-center gap-1.5 sm:gap-2">
                      <Button
                        onClick={() => onEdit(item)}
                        type="button"
                        className="flex h-8 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2 text-[10px] font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:h-9 sm:gap-1.5 sm:px-3 sm:text-xs"
                      >
                        <Pencil size={12} className="sm:h-[14px] sm:w-[14px]" />
                        <span>Edit</span>
                      </Button>

                      <Button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        className="flex h-8 items-center justify-center gap-1 rounded-lg border border-red-100 bg-white px-2 text-[10px] font-semibold text-red-500 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:h-9 sm:gap-1.5 sm:px-3 sm:text-xs"
                      >
                        <Trash2 size={12} className="sm:h-[14px] sm:w-[14px]" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="h-64 px-4 text-center align-middle sm:px-6"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                      <ImageIcon className="h-5 w-5 text-slate-400" />
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                      No classes found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try adjusting your search or create a new class.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination stays fixed */}
      <div className="shrink-0 border-t border-slate-100">
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default ClassTable;
