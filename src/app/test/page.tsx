"use client";
import Container from "@/src/components/Container";
import { refreshToken } from "@/src/libs/auth";
import { Button } from "@nextui-org/react";

export default function Page() {
  return (
    <Container>
      <Button onClick={() => refreshToken()}>Test</Button>
    </Container>
  );
}
