"use client";

import Form from "@/src/components/Form";
import Logo from "@/src/components/Logo";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import ConfirmButton from "../components/ConfirmButton";

interface ResetPasswordFormData {
  email: string;
}

export default function ResetPasswordForm() {
  const [resetPasswordFormData, setResetPasswordFormData] =
    useState<ResetPasswordFormData>({
      email: "",
    });
  const [error, setError] = useState<string | null>(null); // State for validation errors
  const router = useRouter();

  const handleContinue = () => {
    const email = resetPasswordFormData.email;

    // Regex to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // If valid, clear error and proceed
    setError(null);
    router.push(`/otp-verification?email=${encodeURIComponent(email)}`);
  };

  return (
    <Form className="w-[24rem] sm:w-[28rem] bg-white shadow-lg p-8 rounded-lg">
      <Logo className="w-52" />

      <h1 className="text-4xl font-bold">Reset Password</h1>

      <p className="text-sm text-gray-500 mb-4">
        Enter your email to reset your password.
      </p>

      <Input
        radius="sm"
        label="Email"
        type="email"
        isRequired
        value={resetPasswordFormData.email}
        onChange={(e) =>
          setResetPasswordFormData({
            ...resetPasswordFormData,
            email: e.target.value,
          })
        }
      />

      <ConfirmButton onClick={handleContinue} />
      <div className="w-full flex gap-2 items-center justify-center mt-4">
        <span>Remembered your password?</span>
        <Link href="/signin" className="text-blue-400 hover:underline">
          Back to sign in
        </Link>
      </div>
    </Form>
  );
}
