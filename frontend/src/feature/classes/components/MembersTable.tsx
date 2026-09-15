import Pagination from "../../../components/ui/Pagination";
import type { MembersTableProps } from "../../../types/class.types";

const MembersTable = ({
  users,
  pagination,
  onPageChange,
  loading,
}: MembersTableProps) => {
  if (loading) {
    return (
      <div
        className="
          flex
          h-full
          w-full
          min-h-0
          animate-pulse
          flex-col
          overflow-hidden
          rounded-xl
          border
          border-gray-200
          bg-white
          shadow-sm
          sm:h-[480px]
          sm:rounded-2xl
          md:h-[540px]
        "
        aria-hidden="true"
      >
        {/* Table area */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <table className="w-full min-w-[760px] table-fixed text-left">
            <colgroup>
              <col className="w-[22%]" />
              <col className="w-[20%]" />
              <col className="w-[15%]" />
              <col className="w-[12%]" />
              <col className="w-[8%]" />
              <col className="w-[10%]" />
            </colgroup>

            {/* Header Skeleton */}
            <thead className="bg-slate-900">
              <tr>
                {["w-10", "w-12", "w-11", "w-20", "w-12", "w-11"].map(
                  (width, index) => (
                    <th
                      key={index}
                      className="
                      px-2.5
                      py-3
                      sm:px-3
                      md:px-4
                    "
                    >
                      <div
                        className={`
                        h-2.5
                        rounded
                        bg-slate-700
                        sm:h-3
                        ${width}
                      `}
                      />
                    </th>
                  )
                )}
              </tr>
            </thead>

            {/* Body Skeleton */}
            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: 7 }).map((_, index) => (
                <tr key={index} className="h-[50px] sm:h-[58px] md:h-[65px]">
                  {/* Name */}
                  <td className="px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4">
                    <div className="ml-1 flex items-center gap-2 sm:ml-2 sm:gap-3 md:ml-4">
                      <div
                        className="
                          h-7
                          w-7
                          shrink-0
                          rounded-full
                          bg-slate-200
                          sm:h-8
                          sm:w-8
                        "
                      />

                      <div className="min-w-0">
                        <div className="h-2.5 w-20 rounded bg-slate-200 sm:h-3 sm:w-24" />
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4">
                    <div className="h-2.5 w-28 rounded bg-slate-200 sm:h-3 sm:w-36" />
                  </td>

                  {/* Phone */}
                  <td className="px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4">
                    <div className="h-2.5 w-20 rounded bg-slate-200 sm:h-3 sm:w-24" />
                  </td>

                  {/* Member Since */}
                  <td className="px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4">
                    <div className="h-2.5 w-20 rounded bg-slate-200 sm:h-3 sm:w-24" />
                  </td>

                  {/* Bookings */}
                  <td className="px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4">
                    <div className="h-6 w-7 rounded-md bg-slate-100 sm:h-7 sm:w-8" />
                  </td>

                  {/* Status */}
                  <td className="px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4">
                    <div className="h-5 w-14 rounded-full bg-slate-100 sm:h-6 sm:w-16" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div
          className="
            flex
            h-[48px]
            shrink-0
            items-center
            justify-between
            border-t
            border-gray-100
            bg-white
            px-3
            sm:h-[52px]
            sm:px-4
            md:h-[56px]
          "
        >
          <div className="h-2.5 w-20 rounded bg-slate-100 sm:h-3 sm:w-24" />

          <div className="flex items-center gap-1.5">
            <div className="h-7 w-7 rounded-md bg-slate-100 sm:h-8 sm:w-8" />
            <div className="h-7 w-7 rounded-md bg-slate-200 sm:h-8 sm:w-8" />
            <div className="h-7 w-7 rounded-md bg-slate-100 sm:h-8 sm:w-8" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        h-full
        w-full
        min-h-0
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-sm
        sm:h-[480px]
        sm:rounded-2xl
        md:h-[540px]
      "
    >
      {/* Table area */}
      <div className="custom-scrollbar min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[760px] table-fixed text-left">
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[20%]" />
            <col className="w-[15%]" />
            <col className="w-[12%]" />
            <col className="w-[8%]" />
            <col className="w-[10%]" />
          </colgroup>

          {/* Header */}
          <thead className="sticky top-0 z-10 bg-black text-white">
            <tr>
              <th className="px-2.5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider sm:px-3 md:px-4">
                Name
              </th>
              <th className="px-2.5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider sm:px-3 md:px-4">
                Email
              </th>
              <th className="px-2.5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider sm:px-3 md:px-4">
                Phone
              </th>
              <th className="px-2.5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider sm:px-3 md:px-4">
                Member Since
              </th>
              <th className="px-2.5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider sm:px-3 md:px-4">
                Bookings
              </th>
              <th className="px-2.5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider sm:px-3 md:px-4">
                Status
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-gray-50/80"
                >
                  {/* Name */}
                  <td className="px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4">
                    <div className="ml-1 flex min-w-0 items-center gap-2 sm:ml-2 sm:gap-3 md:ml-4">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/50 text-[10px] font-semibold text-red-500 sm:h-8 sm:w-8 sm:text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      <span
                        className="block min-w-0 truncate text-xs font-medium text-gray-900 sm:text-sm"
                        title={user.name}
                      >
                        {user.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="overflow-hidden px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4">
                    <span
                      className="block truncate text-[11px] text-gray-600 sm:text-xs"
                      title={user.email}
                    >
                      {user.email}
                    </span>
                  </td>

                  {/* Phone */}
                  <td className="overflow-hidden px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4">
                    <span
                      className="block truncate text-[11px] text-gray-600 sm:text-xs"
                      title={user.contact}
                    >
                      {user.contact}
                    </span>
                  </td>

                  {/* Member Since */}
                  <td className="px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4">
                    <span className="whitespace-nowrap text-[11px] text-gray-600 sm:text-xs">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </td>

                  {/* Bookings */}
                  <td className="px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4">
                    <span className="inline-flex min-w-7 items-center justify-center rounded-md bg-gray-100 px-1.5 py-1 text-[10px] font-semibold text-gray-700 sm:px-2 sm:text-xs">
                      {user._count.bookings}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4">
                    <span
                      className={`inline-flex items-center rounded-full px-1.5 py-1 text-[9px] font-medium sm:px-2 sm:text-[10px] ${
                        user.status === "Active"
                          ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                          : "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/20"
                      }`}
                    >
                      <span
                        className={`mr-1 h-1.5 w-1.5 shrink-0 rounded-full sm:mr-1.5 ${
                          user.status === "Active"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />

                      {user.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="h-full px-3 text-center align-middle sm:px-4 md:px-6"
                >
                  <div className="flex min-h-[260px] flex-col items-center justify-center sm:min-h-[320px] md:min-h-[360px]">
                    <p className="text-xs font-semibold text-gray-900 sm:text-sm">
                      No members found
                    </p>

                    <p className="mt-1 max-w-[220px] text-[10px] leading-relaxed text-gray-500 sm:max-w-none sm:text-xs">
                      Try adjusting your search.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="shrink-0 border-t border-gray-100 bg-white">
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default MembersTable;
