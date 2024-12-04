import Container from "@/src/components/Container";
import OTPVertify from "@/src/views/Authentication/OTPVertify";

export default function SignInPage() {
  return (
    <Container className="bg-[#DCF0FF] items-center justify-center">
      <OTPVertify />
    </Container>
  );
}