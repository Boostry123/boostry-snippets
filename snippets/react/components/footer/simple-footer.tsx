import type { ReactNode } from "react";
import { Children } from "react";

interface SimpleFooterProps {
  /**  Tailwind for the most outer container `<footer>` */
  className?: string;
  /** Tailwind for each column */
  columnClassName?: string;
  /** The element of each column */
  children: ReactNode;
}

/**
 * Simple footer with dynamic columns according to provided children where each item will be a column
 *
 * For Mobile or small screens it would stack Rows
 */
export default function SimpleFooter({
  className = "",
  columnClassName = "",
  children,
}: SimpleFooterProps) {
  const columns = Children.toArray(children);
  return (
    <footer
      className={`grid md:grid-flow-col auto-cols-fr content-center ${className}`}
    >
      {columns.map((column, index) => {
        return (
          <div key={index} className={`${columnClassName}`}>
            {column}
          </div>
        );
      })}
    </footer>
  );
}
