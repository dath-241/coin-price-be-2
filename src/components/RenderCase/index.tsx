import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  renderIf: boolean;
}

export default function RenderCase({ children, renderIf }: Props) {
  if (renderIf) {
    return children;
  }
  return <></>;
}
