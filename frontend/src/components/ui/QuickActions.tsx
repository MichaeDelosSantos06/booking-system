import { CalendarPlus, ClipboardList, UserPlus, Users } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      label: "Add Class",
      icon: CalendarPlus,
    },
    {
      label: "Create Schedule",
      icon: ClipboardList,
    },
    {
      label: "Add Trainer",
      icon: UserPlus,
    },
    {
      label: "View Bookings",
      icon: Users,
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 font-poppins shadow-sm">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-sm font-semibold text-gray-900">Quick Actions</h2>

        <p className="mt-0.5 text-[10px] text-gray-400">
          Frequently used actions
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              className="group flex min-w-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 transition-all duration-200 hover:border-red-200 hover:bg-red-50/50 hover:shadow-sm"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-500 transition-colors duration-200 group-hover:bg-red-100 group-hover:text-red-500">
                <Icon size={15} strokeWidth={1.8} />
              </div>

              <span className="truncate text-[10px] font-medium text-gray-700 transition-colors group-hover:text-red-600">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
