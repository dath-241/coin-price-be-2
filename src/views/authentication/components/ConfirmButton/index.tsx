"use client";

import { Button } from "@nextui-org/react";

interface Props {
  onClick?: () => void;
}

export default function ConfirmButton({ onClick }: Props) {
  return (
    <Button
      radius="sm"
      fullWidth
      size="lg"
      className="text-xl font-bold text-white bg-primary-500"
      onClick={onClick}>
      Confirm
    </Button>
  );
}