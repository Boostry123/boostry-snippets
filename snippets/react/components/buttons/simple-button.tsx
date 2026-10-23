import type { ReactNode } from "react";

// Define the type for the component props
interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}

// Functional Component
export default function Button({
  onClick,
  children,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
