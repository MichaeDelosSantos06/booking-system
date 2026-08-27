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
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

          <p className="text-sm text-gray-500">Loading members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="rounded-xl border border-red-100 bg-red-50 px-5 py-4">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 py-5 font-poppins sm:px-6 sm:py-6 lg:px-10 lg:py-8">
      {/* Header */}
      <div className="mb-6 shrink-0">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
          Members
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage and view all registered gym members.
        </p>
      </div>

      {/* Search Toolbar */}
      <div className="mb-4 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search members..."
          />
        </div>

        <p className="px-1 text-xs text-gray-500">
          {search
            ? `${pagination.total} result${pagination.total !== 1 ? "s" : ""} found`
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
