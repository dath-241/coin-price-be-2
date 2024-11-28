"use client";

import { Input } from "@nextui-org/react";
import ConfirmButton from "../components/ConfirmButton";
import Logo from "@/src/components/Logo";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(10);
  const [canResend, setCanResend] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your-email@example.com";

  const router = useRouter();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleResend = () => {
    if (canResend) {
      setResendTimer(10);
      setCanResend(false);
    }
  };

  const handleConfirm = () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    router.push(`/change-password?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-[24rem] sm:w-[28rem] bg-white shadow-lg p-8 rounded-lg">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Logo className="w-40" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">OTP Verification</h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          We sent an OTP to <span className="font-bold">{email}</span>
        </p>

        <Input
          label="OTP"
          type="text"
          isRequired
          radius="sm"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <div className="text-center text-sm text-gray-500 mt-4">
          <span>You didn’t get the email?</span>{" "}
          <button
            onClick={handleResend}
            className={`text-blue-400 hover:underline ${
              canResend ? "" : "opacity-50 pointer-events-none"
            }`}
            disabled={!canResend}
          >
            Resend in {resendTimer}s
          </button>
        </div>

        {/* Confirm Button */}
        <ConfirmButton onClick={handleConfirm} />
      </div>
    </div>
  );
}
