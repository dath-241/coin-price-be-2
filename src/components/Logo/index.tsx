import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

export default function Logo({ className }: Props) {
  const defaultClassName = "cursor-pointer rounded-xl";
  return (
    <Image
      src="/logo.png"
      alt="logo"
      width={200}
      height={200}
      className={twMerge(defaultClassName, className)}
    />
  );
}
