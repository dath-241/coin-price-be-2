"use client";

import Image from "next/image";

export default function LandingPageNavbar() {
  return (
    <div className="w-full h-fit py-2 px-8 flex items-center justify-between fixed bg-[#DCF0FF] z-50">
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
        className="w-48 h-16 cursor-pointer rounded-xl"
      />

      <div className="flex gap-4 w-fit h-fit">
        <button className="rounded-lg px-4 py-2 text-[#0094FF] font-bold hover:bg-blue-200">
          Sign up
        </button>
        <button className="rounded-lg px-4 py-2 bg-[#0094FF] text-white font-bold hover:bg-blue-400">
          Log in
        </button>
      </div>
    </div>
  );
}
