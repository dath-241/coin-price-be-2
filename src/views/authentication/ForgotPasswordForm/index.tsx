"use client";
import { useState } from "react";
import SendEmailForm from "./SendEmailForm";
import ResetPasswordForm from "./ResetPasswordForm";

type FormType = "send-email" | "reset-password";

export default function ForgotPasswordForm() {
  const [currentFornmType, setCurrentFormType] =
    useState<FormType>("send-email");
  const [userEmail, setUserEmail] = useState<string>("");

  switch (currentFornmType) {
    case "send-email":
      return (
        <SendEmailForm
          setUserEmail={setUserEmail}
          setCurrentFormType={setCurrentFormType}
        />
      );

    case "reset-password":
      return (
        <ResetPasswordForm
          userEmail={userEmail}
          setCurrentFormType={setCurrentFormType}
        />
      );

    default:
      return null;
  }
}
