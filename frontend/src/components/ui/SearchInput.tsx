interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "...search",
}: SearchInputProps) => {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100 "
    />
  );
};

export default SearchInput;
