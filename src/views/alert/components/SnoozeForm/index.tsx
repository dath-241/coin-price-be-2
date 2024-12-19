"use client";
import Form from "@/src/components/Form";
import {
  ConditionType,
  CONDITIONTYPE,
  CreateSnoozePayload,
  TRIGGERTYPE,
  TriggerType,
} from "@/src/types/alert";
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { parseDateTime } from "@internationalized/date";
import { CreateSnoozeAlert } from "@/src/libs/serverAction/alert";
import { toast } from "sonner";
import { refreshToken } from "@/src/libs/serverAction/auth";
import { useRouter } from "next/navigation";

const defaultFormData: CreateSnoozePayload = {
  symbol: "",
  triggerType: TRIGGERTYPE.SPOT,
  startTime: new Date().toISOString().split(".")[0],
  endTime: new Date().toISOString().split(".")[0],
  conditionType: CONDITIONTYPE.ONCE_IN_DURATION,
};

export default function SnoozeForm() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<CreateSnoozePayload>(defaultFormData);

  const onChangeForm = (change: Partial<CreateSnoozePayload>) => {
    setFormData((prev) => ({ ...prev, ...change }));
  };

  const onSubmit = async () => {
    if (
      formData.symbol == "" ||
      (formData.triggerType as string) == "" ||
      formData.startTime == "" ||
      formData.endTime == "" ||
      (formData.conditionType as string) == ""
    ) {
      toast.error("Please fill all fields");
      return;
    }

    await refreshToken();

    const res = await CreateSnoozeAlert(formData);

    if (res.success) {
      toast.success(res.message);
      setFormData(defaultFormData);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Form className="p-0">
      <Input
        label="Coin symbol"
        placeholder="BTCUSDT, ETHUSDT, ..."
        radius="sm"
        onChange={(e) => onChangeForm({ symbol: e.target.value })}
        value={formData.symbol}
      />
      <Select
        onChange={(e) =>
          onChangeForm({ triggerType: e.target.value as TriggerType })
        }
        defaultSelectedKeys={[formData.triggerType]}
        value={formData.triggerType}
        label="Trigger Type"
        radius="sm">
        <SelectItem key={TRIGGERTYPE.SPOT} value={TRIGGERTYPE.SPOT}>
          Spot
        </SelectItem>
        <SelectItem key={TRIGGERTYPE.FUTURE} value={TRIGGERTYPE.FUTURE}>
          Future
        </SelectItem>
        <SelectItem key={TRIGGERTYPE.PRICE_DIFF} value={TRIGGERTYPE.PRICE_DIFF}>
          Price diffenrence
        </SelectItem>
        <SelectItem
          key={TRIGGERTYPE.FUNDING_RATE}
          value={TRIGGERTYPE.FUNDING_RATE}>
          Funding rate
        </SelectItem>
        <SelectItem key={TRIGGERTYPE.INTERVAL} value={TRIGGERTYPE.INTERVAL}>
          Interval
        </SelectItem>
        <SelectItem key={TRIGGERTYPE.LISTING} value={TRIGGERTYPE.LISTING}>
          Listing
        </SelectItem>
      </Select>
      <div className="w-full flex gap-4">
        <DatePicker
          value={parseDateTime(formData.startTime)}
          onChange={(date) => {
            onChangeForm({ startTime: date.toString() });
          }}
          hideTimeZone
          label="Start time"
          radius="sm"
        />
      </div>
      <div className="w-full flex gap-4">
        <DatePicker
          value={parseDateTime(formData.endTime)}
          onChange={(date) => {
            onChangeForm({ endTime: date.toString() });
          }}
          hideTimeZone
          label="End time"
          radius="sm"
        />
      </div>
      <Select
        onChange={(e) =>
          onChangeForm({ conditionType: e.target.value as ConditionType })
        }
        defaultSelectedKeys={[formData.conditionType]}
        value={formData.conditionType}
        label="Condition type"
        radius="sm">
        <SelectItem
          key={CONDITIONTYPE.ONCE_IN_DURATION}
          value={CONDITIONTYPE.ONCE_IN_DURATION}>
          Once in duration
        </SelectItem>
        <SelectItem
          key={CONDITIONTYPE.REPEAT_N_TIMES}
          value={CONDITIONTYPE.REPEAT_N_TIMES}>
          Repeat n times
        </SelectItem>
        <SelectItem
          key={CONDITIONTYPE.AT_SPECIFIC_TIME}
          value={CONDITIONTYPE.AT_SPECIFIC_TIME}>
          At specific time
        </SelectItem>
        <SelectItem key={CONDITIONTYPE.FOREVER} value={CONDITIONTYPE.FOREVER}>
          Forever
        </SelectItem>
        <SelectItem key={CONDITIONTYPE.ONE_TIME} value={CONDITIONTYPE.ONE_TIME}>
          One time
        </SelectItem>
      </Select>
      <div className="w-full flex items-center justify-end">
        <Button
          onClick={onSubmit}
          radius="sm"
          className="bg-primary-500 text-white font-bold">
          Create
        </Button>
      </div>
    </Form>
  );
}
