"use client";
import Form from "@/src/components/Form";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Select,
  SelectItem,
  TimeInput,
} from "@nextui-org/react";

export default function SnoozeForm() {
  return (
    <Form className="p-0">
      <Autocomplete label="Coin symbol" radius="sm">
        <AutocompleteItem key={"BTC"} value={"BTC"}>
          BTC
        </AutocompleteItem>
      </Autocomplete>
      <Select label="Snooze Type" radius="sm">
        <SelectItem key={"spot"} value={"spot"}>
          Spot
        </SelectItem>
      </Select>
      <div className="w-full flex gap-4">
        <DatePicker label="Date start" />
        <TimeInput label="Time start" radius="sm" />
      </div>
      <div className="w-full flex gap-4">
        <DatePicker label="Date end" />
        <TimeInput label="Time end" radius="sm" />
      </div>
      <Select label="Condition type" radius="sm">
        <SelectItem key={"ONCE_IN_DURATION"} value={"ONCE_IN_DURATION"}>
          Once in duration
        </SelectItem>
      </Select>
      <div className="w-full flex items-center justify-end">
        <Button radius="sm" className="bg-primary-500 text-white font-bold">
          Create
        </Button>
      </div>
    </Form>
  );
}