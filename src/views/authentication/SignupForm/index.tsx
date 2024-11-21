"use client";

import Form from "@/src/components/Form";
import Logo from "@/src/components/Logo";
import { Input } from "@nextui-org/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import ContinueButton from "../components/ContinueButton";
import { toast } from "sonner";

interface SignupDat {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const [SignupDat, setSignupDat] = useState<SignupDat>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isShowPass, setisShowPass] = useState<Boolean>(false);

  const Showpass = () => {
    setisShowPass(!isShowPass);
  };

  return (
    <Form className="w-[24rem] sm:w-[28rem] bg-white shadow-lg p-8 rounded-lg">
      <Logo className="w-52" />

      <h1 className="text-4xl font-bold">Sign Up</h1>

      <Input
        radius="sm"
        label="Username"
        type="text"
        isRequired
        value={SignupDat.username}
        onChange={(e) =>
          setSignupDat({ ...SignupDat, username: e.target.value })
        }
      />

      <Input
        radius="sm"
        label="Email"
        type="email"
        isRequired
        value={SignupDat.email}
        onChange={(e) =>
          setSignupDat({ ...SignupDat, email: e.target.value })
        }
      />

      <Input
        radius="sm"
        label="Password"
        type={isShowPass ? "text" : "password"}
        isRequired
        value={SignupDat.password}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={Showpass}
            aria-label="toggle password visibility">
            {isShowPass ? (
              <EyeSlash className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <Eye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        onChange={(e) =>
          setSignupDat({ ...SignupDat, password: e.target.value })
        }
      />

      <Input
        radius="sm"
        label="Confirm Password"
        type={isShowPass ? "text" : "password"}
        isRequired
        value={SignupDat.confirmPassword}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={Showpass}
            aria-label="toggle password visibility">
            {isShowPass ? (
              <EyeSlash className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <Eye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        onChange={(e) =>
          setSignupDat({
            ...SignupDat,
            confirmPassword: e.target.value,
          })
        }
      />

      <ContinueButton />

      <div className="w-full flex gap-2 items-center justify-center">
        <span>Already have an account?</span>
        <Link href="/signin" className="text-blue-400 hover:underline">
          Sign in here
        </Link>
      </div>
    </Form>
  );
}
