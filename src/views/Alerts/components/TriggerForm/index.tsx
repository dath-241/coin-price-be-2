"use client";
import { Button, Divider, useDisclosure } from "@nextui-org/react";
import { Plus } from "@phosphor-icons/react";
import AddAlertMod from "../AddAlertMod";

export default function Alerts() {
  const { isOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-8/12 h-full flex flex-col gap-4 pt-10">
      <AddAlertMod isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Alert Management</h1>
        <Button
          endContent={<Plus weight="bold" />}
          radius="sm"
          onClick={() => onOpenChange()}
          className="bg-primary-500 text-white font-bold">
          Add alert
        </Button>
      </div>
      <Divider />
    </div>
  );
}