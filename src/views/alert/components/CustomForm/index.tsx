import Form from "@/src/components/Form";
import { CreateUserIndicatorAlert } from "@/src/libs/serverAction/alert";
import { refreshToken } from "@/src/libs/serverAction/auth";
import { CreateUserIndicatorPayload } from "@/src/types/alert";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const placeHolder =
  "def total = 0 \nfor (int i = 0; i < size; i++) {\n\ttotal += prices[i] * time[i]\n}\nILOVEU = total";

const defaultFormData: CreateUserIndicatorPayload = {
  name: "",
  code: "",
};

export default function CustomForm() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<CreateUserIndicatorPayload>(defaultFormData);

  const onSubmit = async () => {
    if (formData.name === "" || formData.code === "") {
      toast.error("Please fill all fields");
      return;
    }

    await refreshToken();

    const res = await CreateUserIndicatorAlert(formData);
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
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, name: e.target.value }));
        }}
        value={formData.name}
        label="Name"
        radius="sm"
      />
      <Textarea
        label="Custom plugin - Python"
        radius="sm"
        minRows={10}
        placeholder={placeHolder}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, code: e.target.value }));
        }}
        value={formData.code}
      />
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
