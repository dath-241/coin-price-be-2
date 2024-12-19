"use client";
import { Button, Divider, Spacer, useDisclosure } from "@nextui-org/react";
import { Plus } from "@phosphor-icons/react";
import AddAlertModal from "./components/AddAlertModal";
import { IndicatorTrigerData, TriggerConditionData } from "@/src/types/alert";
import TriggerList from "./components/TriggerList";
import { H1 } from "@/src/components/Heading";
import IndicatorList from "./components/IndicatorList";

interface Props {
  triggerList: TriggerConditionData[];
  indicatorList: IndicatorTrigerData[];
}

export default function Alerts({ triggerList, indicatorList }: Props) {
  const { isOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-8/12 h-full flex flex-col gap-4 pt-10">
      <AddAlertModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Alert Management</h1>
        <Button
          endContent={<Plus weight="bold" size={20} />}
          radius="sm"
          onClick={() => onOpenChange()}
          color="primary"
          className="font-medium">
          Add alert
        </Button>
      </div>
      <Divider />
      <H1>Trigger Alerts</H1>
      <TriggerList triggerList={triggerList} />
      <Spacer y={2} />
      <H1>Indicator Alerts</H1>
      <IndicatorList indicatorList={indicatorList} />
    </div>
  );
}
