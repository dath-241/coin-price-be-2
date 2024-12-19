import { twMerge } from "tailwind-merge";

interface Props {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
  className?: string;
}

export default function Form({ onSubmit, children, className }: Props) {
  const defaultClassName =
    "flex flex-col gap-4 rounded-md p-4 items-center justify-center";
  return (
    <form onSubmit={onSubmit} className={twMerge(defaultClassName, className)}>
      {children}
    </form>
  );
}
