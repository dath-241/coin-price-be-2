"use client";
import Form from "@/src/components/Form";
import { CreateTriggerAlert } from "@/src/libs/serverAction/alert";
import { refreshToken } from "@/src/libs/serverAction/auth";
import {
  CONDITION,
  Condition,
  CreateTriggerPayload,
  NOTIFICATION_METHOD,
  NotificationMethod,
  TRIGGERTYPE,
  TriggerType,
} from "@/src/types/alert";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const defaultFormData: CreateTriggerPayload = {
  symbol: "",
  condition: CONDITION.EQUAL,
  price: 0,
  fundingRate: "",
  notification_method: NOTIFICATION_METHOD.TELEGRAM,
  triggerType: TRIGGERTYPE.SPOT,
};

export default function TriggerForm() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<CreateTriggerPayload>(defaultFormData);

  const onChangeForm = (change: Partial<CreateTriggerPayload>) => {
    setFormData((prev) => ({ ...prev, ...change }));
  };

  const onSubmit = async () => {
    if (
      formData.price === 0 ||
      formData.symbol == "" ||
      formData.fundingRate == "" ||
      (formData.condition as string) == "" ||
      (formData.notification_method as string) == "" ||
      (formData.triggerType as string) == ""
    ) {
      toast.error("Please fill all fields");
      return;
    }

    await refreshToken();

    const res = await CreateTriggerAlert(formData);

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
      </Select>
      <div className="w-full flex gap-4">
        <Input
          onChange={(e) => {
            if (isNaN(parseInt(e.target.value))) return;
            onChangeForm({ price: parseFloat(e.target.value) });
          }}
          value={formData.price.toString()}
          label="Price"
          radius="sm"
        />
        <Input
          onChange={(e) => {
            if (isNaN(parseFloat(e.target.value)) && e.target.value != "")
              return;
            onChangeForm({ fundingRate: e.target.value });
          }}
          value={formData.fundingRate}
          label="Funding rate"
          radius="sm"
        />
        <Select
          onChange={(e) => {
            onChangeForm({ condition: e.target.value as Condition });
          }}
          defaultSelectedKeys={[formData.condition]}
          value={formData.condition}
          label="Condition"
          radius="sm">
          <SelectItem key={CONDITION.EQUAL} value={CONDITION.EQUAL}>
            Equal
          </SelectItem>
          <SelectItem
            key={CONDITION.GREATER_THAN}
            value={CONDITION.GREATER_THAN}>
            Greater than
          </SelectItem>
          <SelectItem
            key={CONDITION.GREATER_THAN_OR_EQUAL}
            value={CONDITION.GREATER_THAN_OR_EQUAL}>
            Greater than or equal
          </SelectItem>
          <SelectItem key={CONDITION.LESS_THAN} value={CONDITION.LESS_THAN}>
            Less than
          </SelectItem>
          <SelectItem
            key={CONDITION.LESS_THAN_OR_EQUAL}
            value={CONDITION.LESS_THAN_OR_EQUAL}>
            Less than or equal
          </SelectItem>
        </Select>
      </div>
      <Select
        onChange={(e) => {
          onChangeForm({
            notification_method: e.target.value as NotificationMethod,
          });
        }}
        defaultSelectedKeys={[formData.notification_method]}
        value={formData.notification_method}
        label="Notification type"
        radius="sm">
        <SelectItem
          key={NOTIFICATION_METHOD.TELEGRAM}
          value={NOTIFICATION_METHOD.TELEGRAM}>
          Telegram
        </SelectItem>
        <SelectItem
          key={NOTIFICATION_METHOD.EMAIL}
          value={NOTIFICATION_METHOD.EMAIL}>
          Email
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
