import useUsers from "../../hooks/useUsers";

import SearchInput from "../../components/ui/SearchInput";

import MembersTable from "../../feature/classes/components/MembersTable";

const MemberPage = () => {
  const { users, error, loading, pagination, search, setSearch, fetchUsers } =
    useUsers();

  // Only show the full-page spinner while there is nothing to render yet
  // (initial load). Refetching/search keeps the table visible and smooth.
  if (loading && users.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="flex flex-col items-center gap-2.5 sm:gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900 sm:h-7 sm:w-7" />
          <p className="text-xs text-gray-500 sm:text-sm">Loading members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-xs font-medium text-red-600 sm:text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        m-4
        flex
        min-h-0
        flex-1
        flex-col
        font-poppins
        sm:m-6
        md:m-8
        lg:m-10
        xl:m-12
      "
    >
      {/* Header */}
      <header className="mb-4 shrink-0 sm:mb-5 md:mb-6">
        <div className="flex items-center gap-2">
          <span className="h-5 w-1 shrink-0 rounded-full bg-red-600 sm:h-6" />

          <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl md:text-3xl">
            Members
          </h1>
        </div>

        <p className="mt-1 text-xs text-slate-500 sm:mt-1.5 sm:text-sm">
          Manage and view all registered gym members.
        </p>
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
          />
        </div>

        <p className="px-1 text-[11px] text-gray-500 sm:text-xs">
          {search
            ? `${pagination.total} result${
                pagination.total !== 1 ? "s" : ""
              } found`
            : `${pagination.total} member${pagination.total !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Members Table */}
      <MembersTable
        users={users}
        pagination={pagination}
        onPageChange={fetchUsers}
      />
    </div>
  );
};

export default MemberPage;
