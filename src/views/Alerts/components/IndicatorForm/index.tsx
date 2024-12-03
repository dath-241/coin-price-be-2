"use client";
import Form from "@/src/components/Form";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

export default function IndicatorForm() {
  return (
    <Form className="p-0">
      <Autocomplete label="Coin symbol" radius="sm">
        <AutocompleteItem key={"BTC"} value={"BTC"}>
          BTC
        </AutocompleteItem>
      </Autocomplete>
      <Select label="Indicator" radius="sm">
        <SelectItem key={"EMA"} value={"EMA"}>
          BTC
        </SelectItem>
      </Select>

      <div className="w-full flex gap-4">
        <Input label="Price" radius="sm" />
        <Select label="Condition" radius="sm">
          <SelectItem key={"greater"} value={">="}>
            Greater than
          </SelectItem>
          <SelectItem key={"smaller"} value={"<="}>
            Smaller than
          </SelectItem>
        </Select>
      </div>
      <Select label="Notification type" radius="sm">
        <SelectItem key={"email"} value={"email"}>
          Email
        </SelectItem>
        <SelectItem key={"telegram"} value={"telegram"}>
          Telegram
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