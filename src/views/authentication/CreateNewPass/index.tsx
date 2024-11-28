"use client";

import { Input } from "@nextui-org/react";
import Logo from "@/src/components/Logo";
import ConfirmButton from "../components/ConfirmButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleConfirm = () => {
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      alert("Please fill out both fields.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    router.push("/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="w-[24rem] sm:w-[28rem] bg-white shadow-lg p-8 rounded-lg">
        <div className="flex justify-center mb-4">
          <Logo className="w-40" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">Change Password</h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Please create a new password.
        </p>

        <Input
          label="New password"
          type="password"
          isRequired
          radius="sm"
          fullWidth
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, newPassword: e.target.value })
          }
        />

        <Input
          label="Confirm password"
          type="password"
          isRequired
          radius="sm"
          fullWidth
          value={passwordData.confirmPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, confirmPassword: e.target.value })
          }
          className="mt-4"
        />

    <div className="mt-4">
          <ConfirmButton onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
}
