import { Dumbbell } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingText?: string;
};

export default function Button({
  className = "",
  type = "button",
  loading = false,
  loadingText = "Submitting...",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-md p-4 ${className} ${
        loading ? "cursor-not-allowed opacity-80" : ""
      }`}
      type={type}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Dumbbell className="h-5 w-5 animate-spin" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
