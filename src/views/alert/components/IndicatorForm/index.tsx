"use client";
import Form from "@/src/components/Form";
import { CreateIndicatorAlert } from "@/src/libs/serverAction/alert";
import { refreshToken } from "@/src/libs/serverAction/auth";
import {
  Condition,
  CONDITION,
  CreateIndicatorTriggerPayload,
  Indicator,
  INDICATOR,
  NOTIFICATION_METHOD,
  NotificationMethod,
} from "@/src/types/alert";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const defaultFormData: CreateIndicatorTriggerPayload = {
  symbol: "",
  condition: CONDITION.EQUAL,
  price: 0,
  indicators: INDICATOR.EMA,
  notification_method: NOTIFICATION_METHOD.TELEGRAM,
};

export default function IndicatorForm() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<CreateIndicatorTriggerPayload>(defaultFormData);

  const onChangeForm = (change: Partial<CreateIndicatorTriggerPayload>) => {
    setFormData((prev) => ({ ...prev, ...change }));
  };

  const onSubmit = async () => {
    if (
      formData.price === 0 ||
      formData.symbol == "" ||
      (formData.condition as string) == "" ||
      (formData.notification_method as string) == "" ||
      (formData.indicators as string) == ""
    ) {
      toast.error("Please fill all fields");
      return;
    }

    await refreshToken();

    const res = await CreateIndicatorAlert(formData);

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
        placeholder="bitcoin, ethereum, ..."
        radius="sm"
        onChange={(e) => onChangeForm({ symbol: e.target.value })}
        value={formData.symbol}
      />
      <Select
        onChange={(e) => {
          onChangeForm({ indicators: e.target.value as Indicator });
        }}
        label="Indicator"
        radius="sm">
        <SelectItem key={INDICATOR.EMA} value={INDICATOR.EMA}>
          EMA
        </SelectItem>
        <SelectItem key={INDICATOR.BOLL} value={INDICATOR.BOLL}>
          BOLL
        </SelectItem>
        <SelectItem key={INDICATOR.MA} value={INDICATOR.MA}>
          MA
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
