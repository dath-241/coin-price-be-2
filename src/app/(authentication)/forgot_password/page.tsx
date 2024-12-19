"use client";
import Container from "@/src/components/Container";
import ForgotPasswordForm from "@/src/views/authentication/ForgotPasswordForm";

export default function SignInPage() {
  return (
    <Container className="bg-[#DCF0FF] items-center justify-center">
      <ForgotPasswordForm />
    </Container>
  );
}
