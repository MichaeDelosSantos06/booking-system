import { ImageIcon, Pencil, Trash2 } from "lucide-react";

import Button from "../../../components/ui/Button";
import Pagination from "../../../components/ui/Pagination";

import type { ClassTableProps } from "../../../types/class.types";
import { categoryConfig } from "../../../types/class.types";
import { difficultyConfig } from "../../../types/class.types";

const ClassTableSkeleton = () => {
  return (
    <div className="flex h-[500px] min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:h-[520px] sm:rounded-2xl md:h-[540px]">
      {/* Skeleton Table */}
      <div className="custom-scrollbar min-h-0 flex-1 overflow-hidden">
        <table className="w-full min-w-[620px] table-fixed text-left sm:min-w-[700px] md:min-w-[760px]">
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[18%]" />
            <col className="w-[17%]" />
            <col className="w-[11%]" />
            <col className="w-[11%]" />
            <col className="w-[23%]" />
          </colgroup>

          {/* Skeleton Header */}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100">
              {Array.from({ length: 6 }).map((_, index) => (
                <th
                  key={index}
                  className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-3.5"
                >
                  <div
                    className={`h-2.5 animate-pulse rounded bg-slate-300 sm:h-3 ${
                      index === 5
                        ? "mx-auto w-14 sm:w-16 md:w-20"
                        : "w-10 sm:w-12 md:w-14"
                    }`}
                  />
                </th>
              ))}
            </tr>
          </thead>

          {/* Skeleton Body */}
          <tbody className="divide-y divide-slate-100">
            {Array.from({ length: 7 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="animate-pulse">
                {/* Class */}
                <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                  <div className="ml-1 flex min-w-0 items-center gap-2 sm:ml-1.5 sm:gap-2.5 md:ml-2 md:gap-3">
                    {/* Image */}
                    <div className="h-7 w-7 shrink-0 rounded-md bg-slate-200 sm:h-8 sm:w-8 sm:rounded-lg md:h-10 md:w-10" />

                    {/* Class text */}
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div
                        className={`h-3 max-w-full rounded bg-slate-200 sm:h-3.5 md:h-4 ${
                          rowIndex % 3 === 0
                            ? "w-20 sm:w-24 md:w-28"
                            : rowIndex % 3 === 1
                              ? "w-28 sm:w-32 md:w-36"
                              : "w-24 sm:w-28 md:w-32"
                        }`}
                      />

                      <div className="h-3 w-12 rounded-full bg-slate-100 sm:h-4 sm:w-14 md:w-16" />
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="overflow-hidden px-1.5 py-2.5 sm:px-2 sm:py-3 md:px-4 md:py-4">
                  <div
                    className={`h-5 rounded-full bg-slate-100 sm:h-6 ${
                      rowIndex % 2 === 0
                        ? "w-16 sm:w-20 md:w-24"
                        : "w-20 sm:w-24 md:w-28"
                    }`}
                  />
                </td>

                {/* Trainer */}
                <td className="overflow-hidden px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                  <div
                    className={`h-3 rounded bg-slate-200 sm:h-3.5 md:h-4 ${
                      rowIndex % 2 === 0
                        ? "w-20 sm:w-24 md:w-28"
                        : "w-24 sm:w-28 md:w-32"
                    }`}
                  />
                </td>

                {/* Duration */}
                <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                  <div className="h-3 w-12 rounded bg-slate-200 sm:h-3.5 sm:w-14 md:h-4 md:w-16" />
                </td>

                {/* Status */}
                <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                  <div
                    className={`h-5 rounded-full bg-slate-100 sm:h-6 ${
                      rowIndex % 2 === 0
                        ? "w-14 sm:w-16 md:w-20"
                        : "w-16 sm:w-20 md:w-24"
                    }`}
                  />
                </td>

                {/* Actions */}
                <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                  <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2">
                    <div className="h-7 w-12 rounded-md bg-slate-100 sm:h-8 sm:w-14 sm:rounded-lg md:h-9 md:w-16" />

                    <div className="h-7 w-14 rounded-md bg-slate-100 sm:h-8 sm:w-16 sm:rounded-lg md:h-9 md:w-20" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Skeleton Pagination */}
      <div className="flex h-[56px] shrink-0 items-center justify-between border-t border-slate-100 px-3 sm:h-[60px] sm:px-4 md:px-5">
        <div className="h-3 w-20 animate-pulse rounded bg-slate-100 sm:w-24" />

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="h-7 w-7 animate-pulse rounded-md bg-slate-100 sm:h-8 sm:w-8" />

          <div className="h-7 w-7 animate-pulse rounded-md bg-slate-200 sm:h-8 sm:w-8" />

          <div className="h-7 w-7 animate-pulse rounded-md bg-slate-100 sm:h-8 sm:w-8" />

          <div className="h-7 w-7 animate-pulse rounded-md bg-slate-100 sm:h-8 sm:w-8" />
        </div>
      </div>
    </div>
  );
};

const ClassTable = ({
  loading,
  classes,
  onDelete,
  onEdit,
  pagination,
  onPageChange,
}: ClassTableProps) => {
  /*
   * Render the entire skeleton table while loading.
   *
   * This keeps the actual table completely out of the DOM
   * during the loading state and prevents visual transitions
   * between skeleton and real content.
   */
  if (loading) {
    return <ClassTableSkeleton />;
  }

  return (
    <div className="flex h-[500px] min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:h-[520px] sm:rounded-2xl md:h-[540px]">
      {/* Table Area */}
      <div className="custom-scrollbar min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[620px] table-fixed text-left sm:min-w-[700px] md:min-w-[760px]">
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[18%]" />
            <col className="w-[17%]" />
            <col className="w-[11%]" />
            <col className="w-[11%]" />
            <col className="w-[23%]" />
          </colgroup>

          {/* Header */}
          <thead className="sticky top-0 z-10 border-b border-slate-200 bg-black text-white">
            <tr>
              <th className="px-2 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 sm:text-[10px] md:px-4 md:py-3.5 md:text-[11px]">
                Class
              </th>

              <th className="px-2 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 sm:text-[10px] md:px-4 md:py-3.5 md:text-[11px]">
                Category
              </th>

              <th className="px-2 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 sm:text-[10px] md:px-4 md:py-3.5 md:text-[11px]">
                Trainer
              </th>

              <th className="px-2 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 sm:text-[10px] md:px-4 md:py-3.5 md:text-[11px]">
                Duration
              </th>

              <th className="px-2 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 sm:text-[10px] md:px-4 md:py-3.5 md:text-[11px]">
                Status
              </th>

              <th className="px-2 py-2.5 text-center text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 sm:text-[10px] md:px-4 md:py-3.5 md:text-[11px]">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100">
            {classes.length > 0 ? (
              classes.map((item) => {
                const category = categoryConfig.find(
                  (option) => option.value === item.category
                );

                const difficulty = difficultyConfig.find(
                  (diff) => diff.value === item.difficulty
                );

                return (
                  <tr
                    key={item.id}
                    className="group transition-colors duration-150 hover:bg-slate-50/60"
                  >
                    {/* Class */}
                    <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                      <div className="ml-1 flex min-w-0 items-center gap-2 sm:ml-1.5 sm:gap-2.5 md:ml-2 md:gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-slate-100 sm:h-8 sm:w-8 sm:rounded-lg md:h-10 md:w-10">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.className}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-zinc-100">
                              <ImageIcon className="h-3.5 w-3.5 text-zinc-500 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p
                            className="truncate text-[11px] font-semibold leading-4 text-slate-900 sm:text-xs sm:leading-5 md:text-sm"
                            title={item.className}
                          >
                            {item.className}
                          </p>

                          <p
                            className="mt-0.5 truncate text-[9px] leading-3.5 text-slate-400 sm:text-[10px] sm:leading-4 md:text-xs"
                            title={item.difficulty}
                          >
                            <span
                              className={`rounded-full px-1 py-0.5 text-[8px] font-poppins font-medium sm:px-2.5 sm:py-1 sm:text-[9px] md:px-3 md:text-[10px] ${difficulty?.className}`}
                            >
                              {difficulty?.label}
                            </span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="overflow-hidden px-1.5 py-2.5 sm:px-2 sm:py-3 md:px-4 md:py-4">
                      <span
                        className="inline-flex max-w-full items-center truncate rounded-md px-1.5 py-0.5 text-[9px] font-medium text-slate-600 sm:rounded-lg sm:px-2 sm:py-1 sm:text-[10px] md:px-2.5 md:text-xs"
                        title={item.category}
                      >
                        <span
                          className={`rounded-full px-2 py-0.5 text-[9px] sm:px-2.5 sm:py-1 sm:text-[10px] md:px-3 md:text-xs ${category?.className}`}
                        >
                          {category?.label}
                        </span>
                      </span>
                    </td>

                    {/* Trainer */}
                    <td className="overflow-hidden px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                      <span
                        className="block truncate text-[10px] font-medium text-slate-700 sm:text-xs md:text-sm"
                        title={item.trainer.name}
                      >
                        {item.trainer.name}
                      </span>
                    </td>

                    {/* Duration */}
                    <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                      <div className="flex items-baseline gap-0.5 whitespace-nowrap sm:gap-1">
                        <span className="text-[10px] font-medium text-slate-700 sm:text-xs md:text-sm">
                          {item.duration}
                          <span className="ml-0.5 text-[9px] text-slate-400 sm:text-[10px] md:text-xs">
                            min
                          </span>
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                      {item.status === "Active" ? (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-600 sm:gap-1 sm:px-2 sm:py-1 sm:text-[9px] md:gap-1.5 md:px-2.5 md:text-xs">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-500 sm:h-1.5 sm:w-1.5" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[8px] font-semibold text-slate-500 sm:gap-1 sm:px-2 sm:py-1 sm:text-[9px] md:gap-1.5 md:px-2.5 md:text-xs">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-slate-400 sm:h-1.5 sm:w-1.5" />
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                      <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2">
                        <Button
                          onClick={() => onEdit(item)}
                          type="button"
                          className="flex h-7 items-center justify-center gap-0.5 rounded-md border border-slate-200 bg-white px-1.5 text-[9px] font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:h-8 sm:gap-1 sm:rounded-lg sm:px-2 sm:text-[10px] md:h-9 md:gap-1.5 md:px-3 md:text-xs"
                        >
                          <Pencil
                            size={11}
                            className="sm:h-3 sm:w-3 md:h-[14px] md:w-[14px]"
                          />
                          <span>Edit</span>
                        </Button>

                        <Button
                          type="button"
                          onClick={() => onDelete(item.id)}
                          className="flex h-7 items-center justify-center gap-0.5 rounded-md border border-red-100 bg-white px-1.5 text-[9px] font-semibold text-red-500 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:h-8 sm:gap-1 sm:rounded-lg sm:px-2 sm:text-[10px] md:h-9 md:gap-1.5 md:px-3 md:text-xs"
                        >
                          <Trash2
                            size={11}
                            className="sm:h-3 sm:w-3 md:h-[14px] md:w-[14px]"
                          />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="h-[300px] sm:h-[360px] md:h-[400px]">
                <td
                  colSpan={6}
                  className="px-3 text-center align-middle sm:px-4 md:px-6"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 sm:mb-3 sm:h-11 sm:w-11 sm:rounded-xl md:h-12 md:w-12">
                      <ImageIcon className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5 md:h-5 md:w-5" />
                    </div>

                    <p className="text-xs font-semibold text-slate-700 sm:text-sm">
                      No classes found
                    </p>

                    <p className="mt-1 max-w-[220px] text-[10px] leading-relaxed text-slate-400 sm:max-w-none sm:text-xs">
                      Try adjusting your search or create a new class.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Real Pagination */}
      <div className="shrink-0 border-t border-slate-100">
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default ClassTable;
