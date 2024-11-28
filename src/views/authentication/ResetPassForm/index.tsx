"use client";

import Form from "@/src/components/Form";
import Logo from "@/src/components/Logo";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ContinueButton from "../components/ContinueButton"; 

interface ResetPasswordFormData {
  email: string;
}

export default function ResetPasswordForm() {
  const [resetPasswordFormData, setResetPasswordFormData] =
    useState<ResetPasswordFormData>({
      email: "",
    });

  const router = useRouter();

  const handleContinue = () => {
    if (!resetPasswordFormData.email) {
      alert("Please enter your email.");
      return;
    }

    router.push("/otp-verification");
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

      <ContinueButton onClick={handleContinue} />

      <div className="w-full flex gap-2 items-center justify-center mt-4">
        <span>Changed your mind?</span>
        <Link href="/signin" className="text-blue-400 hover:underline">
          Sign in here
        </Link>
      </div>
    </Form>
  );
}
