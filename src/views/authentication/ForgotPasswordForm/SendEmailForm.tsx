"use client";
import { useState } from "react";
import Form from "@/src/components/Form";
import Logo from "@/src/components/Logo";
import { Button, Input, Spacer } from "@nextui-org/react";
import Link from "next/link";
import { toast } from "sonner";
import { forgotPassword } from "@/src/libs/serverAction/auth";

interface Props {
  setUserEmail: (email: string) => void;
  setCurrentFormType: (formType: "send-email" | "reset-password") => void;
}

export default function SendEmailForm({
  setUserEmail,
  setCurrentFormType,
}: Props) {
  const [email, setEmail] = useState<string>("");

  const handleSendOTP = async () => {
    // Call API to send OTP
    if (email == "") {
      toast.error("Please enter your email");
      return;
    }

    const res = await forgotPassword({ email });

    if (res.success) {
      toast.success(res.message);
      setUserEmail(email);
      setCurrentFormType("reset-password");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Form className="w-[24rem]  sm:w-[28rem] bg-white shadow-lg p-8">
      <Logo className="w-52 h-[72px]" />

      <h1 className="text-4xl font-bold">Forgot password</h1>

      <Input
        radius="sm"
        label="Your Email"
        type="Email"
        isRequired
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Spacer />

      <Button
        radius="sm"
        fullWidth
        size="lg"
        className="text-xl font-bold text-white bg-primary-500"
        onClick={handleSendOTP}>
        Continue
      </Button>

      <div className="w-full flex gap-2 items-center justify-center">
        <span>Remember your password?</span>
        <Link href="/signin" className="text-blue-400 hover:underline">
          Sign in here
        </Link>
      </div>
    </Form>
  );
}
