import { twMerge } from "tailwind-merge";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function GridBox({ children, className }: Props) {
  const defaultClassName = "grid";
  return <div className={twMerge(defaultClassName, className)}>{children}</div>;
}
