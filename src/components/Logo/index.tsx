"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

export default function Logo({ className }: Props) {
  const router = useRouter();
  const defaultClassName = "cursor-pointer rounded-xl";
  return (
    <Image
      onClick={() => router.push("/")}
      src="/logo.png"
      alt="logo"
      width={200}
      height={200}
      className={twMerge(defaultClassName, className)}
    />
  );
}
