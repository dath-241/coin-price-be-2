import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export default function ListItem({ className, children }: Props) {
  return <li className={className}>{children}</li>;
}
