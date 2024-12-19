import { twMerge } from "tailwind-merge";

interface Props {
  children?: any;
  className?: string;
}

export function H1({ children, className }: Props) {
  const defaultClassName = "font-bold text-2xl";
  return <h1 className={twMerge(defaultClassName, className)}>{children}</h1>;
}

export function H2({ children, className }: Props) {
  const defaultClassName = "font-bold text-xl";
  return <h2 className={twMerge(defaultClassName, className)}>{children}</h2>;
}

export function H3({ children, className }: Props) {
  const defaultClassName = "font-bold text-lg";
  return <h3 className={twMerge(defaultClassName, className)}>{children}</h3>;
}
