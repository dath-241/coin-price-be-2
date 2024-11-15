"use client";

import Image from "next/image";
import Link from "next/link";

const linkUrl = {
  about: "#",
  github: "#",
  productBacklog: "#",
  teamFrontend: "#",
  teamBackend: "#",
  teamTelegram: "#",
};

export default function Footer() {
  return (
    <div className="w-10/12 h-fit py-2 px-8 flex items-start justify-between bg-[#DCF0FF] my-20 ">
      <div className="w-1/4 h-full flex flex-col gap-2">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="rounded-xl cursor-pointer w-48 h-auto"
        />
        <span className="w-64">
          Connect your real-time information of Symbols all over the world.
        </span>
      </div>

      <div className="w-1/4 h-full gap-2 flex justify-center">
        <div className="w-fit h-fit flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-2">Project</h2>
          <Link href={linkUrl.about} className="hover:text-[#0094FF] w-fit">
            About
          </Link>
          <Link href={linkUrl.github} className="hover:text-[#0094FF] w-fit">
            Github{" "}
            <span className="text-black bg-[#0094FF] py-1 px-2 rounded-md text-sm font-bold">
              Open Source
            </span>
          </Link>
          <Link
            href={linkUrl.productBacklog}
            className="hover:text-[#0094FF] w-fit">
            Product backlog
          </Link>
        </div>
      </div>

      <div className="w-1/4 h-full gap-2 flex justify-center">
        <div className="w-fit h-fit flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-2">About us</h2>
          <Link
            href={linkUrl.teamFrontend}
            className="hover:text-[#0094FF] w-fit">
            Team Frontend
          </Link>
          <Link
            href={linkUrl.teamBackend}
            className="hover:text-[#0094FF] w-fit">
            Team Backend
          </Link>
          <Link
            href={linkUrl.teamTelegram}
            className="hover:text-[#0094FF] w-fit">
            Team Telegram
          </Link>
        </div>
      </div>

      <div className="w-1/4 h-full flex flex-col items-end gap-2">
        <div className="w-fil h-fit flex flex-col items-center justify-center gap-2">
          <Image
            src="/hcmutLogo.png"
            alt="logo"
            width={200}
            height={200}
            className="rounded-xl cursor-pointer w-32 h-auto"
          />
          <span>© CoinPrice 2024</span>
        </div>
      </div>
    </div>
  );
}
