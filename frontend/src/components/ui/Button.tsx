import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button className={`rounded-md p-4 ${className}`} type={type} {...props} />
  );
}
