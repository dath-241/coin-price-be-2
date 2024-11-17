"use client";
import Container from "@/src/components/Container";
import SignInForm from "@/src/views/Authentication/SigninForm";

export default function SignInPage() {
  return (
    <Container className="bg-[#DCF0FF] items-center justify-center">
      <SignInForm />
    </Container>
  );
}