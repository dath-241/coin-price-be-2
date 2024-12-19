import { twMerge } from "tailwind-merge";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function FlexBox({ children, className }: Props) {
  const defaultClassName = "flex";
  return <div className={twMerge(defaultClassName, className)}>{children}</div>;
}
