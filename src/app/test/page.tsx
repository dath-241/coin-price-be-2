"use client";
import Container from "@/src/components/Container";
import { test } from "@/src/libs";
import { Button } from "@nextui-org/react";

export default function Page() {
  return (
    <Container className="flex items-center justify-center">
      <Button onClick={() => test("Hello")}>Click me</Button>
    </Container>
  );
}
