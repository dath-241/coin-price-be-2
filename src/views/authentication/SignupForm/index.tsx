"use client";

import Form from "@/src/components/Form";
import Logo from "@/src/components/Logo";
import { Input } from "@nextui-org/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import ContinueButton from "../components/ContinueButton";
import { signup } from "@/src/libs/serverAction/auth";
import { useRouter } from "next/navigation";

interface SignupForm {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const [signupForm, setSignupForm] = useState<SignupForm>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isShowPass, setisShowPass] = useState<boolean>(false);

  const Showpass = () => {
    setisShowPass(!isShowPass);
  };

  const handleSubmit = async () => {
    if (
      signupForm.name === "" ||
      signupForm.username === "" ||
      signupForm.email === "" ||
      signupForm.password === "" ||
      signupForm.confirmPassword === ""
    ) {
      toast.error("Please fill in all the fields");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    const res = await signup({
      name: signupForm.name,
      email: signupForm.email,
      username: signupForm.username,
      password: signupForm.password,
    });

    if (res.success) {
      toast.success("Sign up successfully");
      router.push("/signin");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Form className="w-[24rem] sm:w-[28rem] bg-white shadow-lg p-8 rounded-lg">
      <Logo className="w-52 h-[72px]" />

      <h1 className="text-4xl font-bold">Sign Up</h1>

      <Input
        radius="sm"
        label="Name"
        type="text"
        isRequired
        value={signupForm.name}
        onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
      />

      <Input
        radius="sm"
        label="Username"
        type="text"
        isRequired
        value={signupForm.username}
        onChange={(e) =>
          setSignupForm({ ...signupForm, username: e.target.value })
        }
      />

      <Input
        radius="sm"
        label="Email"
        type="email"
        isRequired
        value={signupForm.email}
        onChange={(e) =>
          setSignupForm({ ...signupForm, email: e.target.value })
        }
      />

      <Input
        radius="sm"
        label="Password"
        type={isShowPass ? "text" : "password"}
        isRequired
        value={signupForm.password}
        endContent={
          <button
            tabIndex={-1}
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
          setSignupForm({ ...signupForm, password: e.target.value })
        }
      />

      <Input
        radius="sm"
        label="Confirm Password"
        type={isShowPass ? "text" : "password"}
        isRequired
        value={signupForm.confirmPassword}
        endContent={
          <button
            tabIndex={-1}
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
          setSignupForm({
            ...signupForm,
            confirmPassword: e.target.value,
          })
        }
      />

      <ContinueButton onClick={handleSubmit} />

      <div className="w-full flex gap-2 items-center justify-center">
        <span>Already have an account?</span>
        <Link href="/signin" className="text-blue-400 hover:underline">
          Sign in here
        </Link>
      </div>
    </Form>
  );
}
