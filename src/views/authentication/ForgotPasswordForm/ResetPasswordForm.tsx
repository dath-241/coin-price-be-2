import Form from "@/src/components/Form";
import Logo from "@/src/components/Logo";
import { forgotPassword, resetPassword } from "@/src/libs/serverAction/auth";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  userEmail: string;
  setCurrentFormType: (formType: "send-email" | "reset-password") => void;
}

export default function ResetPasswordForm({
  userEmail,
  setCurrentFormType,
}: Props) {
  const router = useRouter();

  const [OTP, setOTP] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);

  const [resendTime, setResendTime] = useState<number>(60);

  useEffect(() => {
    const countDownResendOTP = setInterval(() => {
      setResendTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countDownResendOTP);
  }, []);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const handleResendOtp = async () => {
    // Call API to resend OTP
    const res = await forgotPassword({ email: userEmail });
    if (res.success) {
      toast.success(res.message);
      setResendTime(60);
    } else {
      toast.error(res.message);
    }
  };

  const handleResetPassword = async () => {
    // Call API to reset password
    if (OTP == "" || newPassword == "" || confirmPassword == "") {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword != confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    const res = await resetPassword({
      email: userEmail,
      otp: OTP,
      newPassword,
    });

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success("Password has been reset successfully");
    router.push("/signin");
  };

  return (
    <Form className="w-[24rem] sm:w-[28rem] bg-white shadow-lg p-8">
      <Logo className="w-52 h-[72px]" />

      <h1 className="text-4xl font-bold">Reset password</h1>

      <div className="w-full flex flex-col items-center justify-center">
        <span>We have sent an OTP code to your email:</span>
        <b>{userEmail}</b>
      </div>

      <Input
        radius="sm"
        label="OTP"
        type="text"
        isRequired
        value={OTP}
        onChange={(e) => {
          if (isNaN(Number(e.target.value))) return;
          setOTP(e.target.value);
        }}
      />

      <Input
        radius="sm"
        label="New password"
        type={isShowPassword ? "text" : "password"}
        isRequired
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
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <Input
        radius="sm"
        label="Confirm password"
        type={isShowConfirmPassword ? "text" : "password"}
        isRequired
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleShowConfirmPassword}
            aria-label="toggle password visibility">
            {isShowConfirmPassword ? (
              <EyeSlash className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <Eye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className="w-full gap-2 flex items-center justify-center">
        <span>{"You didn't get the email?"}</span>
        {resendTime != 0 ? (
          <span className="text-blue-500 cursor-default">{`Resend after ${resendTime}s`}</span>
        ) : (
          <span
            onClick={handleResendOtp}
            className="text-blue-500 cursor-pointer">{`Resend OTP`}</span>
        )}
      </div>

      <Button
        radius="sm"
        fullWidth
        size="lg"
        className="text-xl font-bold text-white bg-primary-500"
        onClick={handleResetPassword}>
        Continue
      </Button>

      <div className="w-full flex gap-2 items-center justify-center">
        <span
          onClick={() => setCurrentFormType("send-email")}
          className="text-blue-500 cursor-pointer">
          Back to last step?
        </span>
      </div>
    </Form>
  );
}
