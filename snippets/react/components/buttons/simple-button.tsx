import type { ReactNode } from "react";

interface ButtonProps {
  /** Called when the button is clicked. Not called while disabled */
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}

/**
 *
 * @param onClick callback function
 *
 * @param children
 *
 * @param disabled boolean
 *
 * @returns A lightweight button with click handling and a disabled state
 * Styled with Tailwind
 */
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
