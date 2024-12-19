"use client";

import Form from "@/src/components/Form";
import Logo from "@/src/components/Logo";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import ContinueButton from "../components/ContinueButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signin } from "@/src/libs/serverAction/auth";

type LoginMethod = "email" | "username";

interface LoginFormData {
  identifier: string;
  password: string;
}
export default function SignInForm() {
  const router = useRouter();

  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    identifier: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSignIn = async () => {
    const res = await signin(
      loginFormData.identifier,
      loginFormData.password,
      loginMethod
    );
    if (res.success) {
      toast.success(res.message);
      router.push("/market");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Form className="w-[24rem] sm:w-[28rem] bg-white shadow-lg p-8 rounded-lg">
      <Logo className="w-52 h-[72px]" />

      <h1 className="text-4xl font-bold">Sign In</h1>

      <div className="w-full flex gap-4">
        <Input
          radius="sm"
          label={loginMethod === "email" ? "Email" : "Username"}
          type="text"
          isRequired
          value={loginFormData.identifier}
          onChange={(e) =>
            setLoginFormData({ ...loginFormData, identifier: e.target.value })
          }
        />
        <Select
          label="Sign in method"
          placeholder="Select a method"
          radius="sm"
          fullWidth={false}
          isRequired
          defaultSelectedKeys={["email"]}
          onChange={(value) =>
            setLoginMethod(value.target.value as LoginMethod)
          }
          className="w-60">
          <SelectItem key="email" value="email">
            Email
          </SelectItem>
          <SelectItem key="username" value="username">
            Username
          </SelectItem>
        </Select>
      </div>

      <Input
        radius="sm"
        label="Password"
        type={isShowPassword ? "text" : "password"}
        isRequired
        value={loginFormData.password}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleShowPassword}
            aria-label="toggle password visibility">
            {isShowPassword ? (
              <EyeSlash className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <Eye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        onChange={(e) =>
          setLoginFormData({ ...loginFormData, password: e.target.value })
        }
      />

      <div className="w-full">
        <Link
          href="/forgot_password"
          className="text-md text-blue-400 hover:underline hover:underline-offset-2">
          Forgot password?
        </Link>
      </div>

      <ContinueButton onClick={handleSignIn} />

      <div className="w-full flex gap-2 items-center justify-center">
        <span>{"Don't have an account?"}</span>
        <Link href="/signup" className="text-blue-400 hover:underline">
          Get started now
        </Link>
      </div>
    </Form>
  );
}
