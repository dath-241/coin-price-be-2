"use client";

interface Props {
  onClick: () => void;
}

export default function LoginWithGoogleButton({ onClick }: Props) {
  //TODO: Implement the login with google button component
  return <button onClick={onClick}>Continue with Google</button>;
}
