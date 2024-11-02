"use client";

interface Props {
  onClick: () => void;
}

export default function ContinueButton({ onClick }: Props) {
  // TODO: Implement the continue button component
  const buttonClasses = "w-1/3 text-2xl font-bold bg-[#0094FF] text-white p-6 rounded-xl flex gap-4 hover:bg-blue-300 hover:text-black text-center flex justify-center items-center";

  return <button onClick={onClick} className={buttonClasses}>Continue</button>;
}
