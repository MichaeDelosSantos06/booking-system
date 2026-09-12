import Button from "../../../components/ui/Button";
import type { BrowseClassProps } from "../../../types/booking.type";

const RigthCta = ({ browse }: BrowseClassProps) => {
  return (
    <div
      className="
        relative
        flex
        min-h-[180px]
        w-full
        flex-col
        justify-between
        overflow-hidden
        rounded-2xl
        border
        border-gray-800
        bg-[#111111]
        p-5
        shadow-lg
      "
    >
      {/* Decorative red glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-32
          w-32
          rounded-full
          bg-red-600/20
          blur-2xl
        "
      />

      <div className="relative">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-red-500">
          READY TO TRAIN?
        </p>

        <h2 className="mt-2 text-lg font-bold tracking-tight text-white">
          Find your next workout
        </h2>

        <p className="mt-1 max-w-[240px] text-xs leading-5 text-gray-400">
          Explore 20+ class types and find the perfect workout for you.
        </p>
      </div>

      <div className="relative mt-5">
        <Button
          onClick={() => browse()}
          type="button"
          className="
            w-full
            rounded-lg
            bg-red-600
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-red-500
            hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]
            active:scale-[0.98]
          "
        >
          Find a Class
        </Button>
      </div>
    </div>
  );
};

export default RigthCta;
