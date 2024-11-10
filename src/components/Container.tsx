import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  const defaultClassName = "min-h-dvh flex flex-col items-center";
  return <div className={twMerge(defaultClassName, className)}>{children}</div>;
}
