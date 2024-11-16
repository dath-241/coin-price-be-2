import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export default function List({ className, children }: Props) {
  return <ul className={className}>{children}</ul>;
}
