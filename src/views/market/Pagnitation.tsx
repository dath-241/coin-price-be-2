"use client";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function MarketPagnitation() {
  const router = useRouter();

  const onChangePage = (page: number) => {
    router.push(`/market?page=${page}`);
  };

  return (
    <Pagination
      disableAnimation
      radius="sm"
      variant="faded"
      color="primary"
      siblings={2}
      showControls
      total={162}
      onChange={onChangePage}
    />
  );
}
