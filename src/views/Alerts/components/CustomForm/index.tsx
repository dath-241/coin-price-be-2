import Form from "@/src/components/Form";
import { Input, Textarea } from "@nextui-org/react";

const placeHolder =
  "def total = 0 \nfor (int i = 0; i < size; i++) {\n\ttotal += prices[i] * time[i]\n}\nILOVEU = total";

export default function CustomForm() {
  return (
    <Form className="p-0">
      <Input label="Name" radius="sm" />
      <Textarea
        label="Custom plugin - Python"
        radius="sm"
        minRows={10}
        placeholder={placeHolder}
      />
    </Form>
  );
}