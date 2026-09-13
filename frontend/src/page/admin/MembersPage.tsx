import useUsers from "../../hooks/useUsers";

import SearchInput from "../../components/ui/SearchInput";

import MembersTable from "../../feature/classes/components/MembersTable";

const MemberPage = () => {
  const { users, error, loading, pagination, search, setSearch, fetchUsers } =
    useUsers();

  // Only show the error when loading has finished.
  // During refetch/search, keep the existing UI visible.
  if (error && !loading) {
    return (
      <div className="flex w-full min-w-0 flex-1 items-center justify-center">
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-xs font-medium text-red-600 sm:text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        w-full
        min-w-0
        min-h-0
        flex-1
        flex-col
        font-poppins
      "
    >
      {/* Header */}
      <header className="mb-4 shrink-0 sm:mb-5 md:mb-6">
        {loading ? (
          <div className="animate-pulse" aria-hidden="true">
            <div className="flex items-center gap-2">
              <div className="h-5 w-1 shrink-0 rounded-full bg-slate-200 sm:h-6" />

              <div
                className="
                  h-6
                  w-28
                  rounded-md
                  bg-slate-200
                  sm:h-7
                  sm:w-32
                  md:h-9
                  md:w-36
                "
              />
            </div>

            <div className="mt-2 h-3 w-64 rounded bg-slate-100 sm:h-3.5 sm:w-80" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="h-5 w-1 shrink-0 rounded-full bg-red-600 sm:h-6" />

              <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl md:text-3xl">
                Members
              </h1>
            </div>

            <p className="mt-1 text-xs text-slate-500 sm:mt-1.5 sm:text-sm">
              Manage and view all registered gym members.
            </p>
          </>
        )}
      </header>

      {/* Search Toolbar */}
      <div
        className="
          mb-3
          flex
          shrink-0
          flex-col
          gap-2.5
          sm:mb-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:gap-3
        "
      >
        <div
          className="
            w-full
            sm:w-[50%]
            md:w-[42%]
            lg:w-[40%]
            xl:w-[38%]
          "
        >
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search members..."
            loading={loading}
          />
        </div>

        {/* Member Count */}
        {loading ? (
          <div
            className="
              h-3
              w-20
              animate-pulse
              rounded
              bg-slate-100
              sm:h-3.5
              sm:w-24
            "
            aria-hidden="true"
          />
        ) : (
          <p className="px-1 text-[11px] text-gray-500 sm:text-xs">
            {search
              ? `${pagination.total} result${
                  pagination.total !== 1 ? "s" : ""
                } found`
              : `${pagination.total} member${
                  pagination.total !== 1 ? "s" : ""
                }`}
          </p>
        )}
      </div>

      {/* Members Table */}
      <MembersTable
        users={users}
        pagination={pagination}
        onPageChange={fetchUsers}
        loading={loading}
      />
    </div>
  );
};

export default MemberPage;
