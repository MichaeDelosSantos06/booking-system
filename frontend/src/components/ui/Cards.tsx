import { UsersRound } from "lucide-react";
import useUsers from "../../hooks/useUsers";
import useFetchClasses from "../../hooks/useFetchClasses";

const Cards = () => {
  const { users, weeklyUser } = useUsers();
  const { classes } = useFetchClasses();

  return (
    <div className="mt-2 grid w-full grid-cols-2 gap-3 p-3 font-poppins sm:gap-4 sm:p-4 xl:grid-cols-4">
      {/* Total Members */}
      <div className="flex w-full flex-col gap-2 rounded-xl bg-black/70 p-3 text-white sm:p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xs sm:text-sm">Total Members</h1>

          <UsersRound size={18} strokeWidth={1.7} className="sm:h-5 sm:w-5" />
        </div>

        <h1 className="text-xl font-semibold sm:text-2xl">{users.length}</h1>

        <p className="text-[9px] sm:text-[11px]">
          <span className="font-bold text-green-500">+{weeklyUser}</span> this
          week
        </p>
      </div>

      {/* Active Classes */}
      <div className="flex w-full flex-col gap-2 rounded-xl bg-black/70 p-3 text-white sm:p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xs sm:text-sm">Active Classes</h1>

          <UsersRound size={18} strokeWidth={1.7} className="sm:h-5 sm:w-5" />
        </div>

        <h1 className="text-xl font-semibold sm:text-2xl">{classes.length}</h1>

        <p className="text-[9px] sm:text-[11px]">
          <span className="font-bold text-green-500">+2</span> this week
        </p>
      </div>

      {/* Today's Classes */}
      <div className="flex w-full flex-col gap-2 rounded-xl bg-black/70 p-3 text-white sm:p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xs sm:text-sm">Today's Classes</h1>

          <UsersRound size={18} strokeWidth={1.7} className="sm:h-5 sm:w-5" />
        </div>

        <h1 className="text-xl font-semibold sm:text-2xl">8</h1>

        <p className="text-[9px] sm:text-[11px]">
          <span className="font-bold text-green-500">+1</span> from yesterday
        </p>
      </div>

      {/* Today's Bookings */}
      <div className="flex w-full flex-col gap-2 rounded-xl bg-black/70 p-3 text-white sm:p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xs sm:text-sm">Today's Bookings</h1>

          <UsersRound size={18} strokeWidth={1.7} className="sm:h-5 sm:w-5" />
        </div>

        <h1 className="text-xl font-semibold sm:text-2xl">24</h1>

        <p className="text-[9px] sm:text-[11px]">
          <span className="font-bold text-green-500">+5</span> from yesterday
        </p>
      </div>
    </div>
  );
};

export default Cards;
