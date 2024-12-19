"use client";
import Container from "@/src/components/Container";
import SignInForm from "@/src/views/authentication/SigninForm";

export default function SignInPage() {
  return (
    <Container className="bg-[#DCF0FF] items-center justify-center">
      <SignInForm />
    </Container>
  );
}
