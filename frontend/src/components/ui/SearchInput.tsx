import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "...search",
  loading = false,
}: SearchInputProps) => {
  /*
   * Full search skeleton
   *
   * Keeps the exact same dimensions as the real search input
   * so the layout does not shift when loading finishes.
   */
  if (loading) {
    return (
      <div
        className="
          h-10
          w-full
          animate-pulse
          rounded-lg
          border
          border-slate-200
          bg-slate-100
          shadow-sm

          sm:h-11
          sm:rounded-xl
        "
        aria-hidden="true"
      >
        <div className="flex h-full items-center px-3 sm:px-3.5">
          <div className="h-4 w-4 rounded-full bg-slate-200 sm:h-[17px] sm:w-[17px]" />

          <div className="ml-2.5 h-3 w-24 rounded bg-slate-200 sm:ml-3 sm:h-3.5 sm:w-28" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <Search
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-slate-400

          sm:left-3.5
          sm:h-[17px]
          sm:w-[17px]
        "
        strokeWidth={2}
      />

      {/* Input */}
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-10
          w-full
          rounded-lg
          border
          border-slate-200
          bg-white
          pl-9
          pr-9
          text-xs
          font-medium
          text-slate-700
          shadow-sm
          outline-none
          transition-all
          duration-200

          placeholder:text-slate-400

          hover:border-slate-300
          hover:shadow

          focus:border-slate-400
          focus:ring-4
          focus:ring-slate-100

          sm:h-11
          sm:rounded-xl
          sm:pl-10
          sm:pr-10
          sm:text-sm
        "
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="
            absolute
            right-2.5
            top-1/2
            flex
            h-6
            w-6
            -translate-y-1/2
            items-center
            justify-center
            rounded-md
            text-slate-400
            transition-all
            duration-150

            hover:bg-slate-100
            hover:text-slate-700

            sm:right-3
          "
        >
          <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
