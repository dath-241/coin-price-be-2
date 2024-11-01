import { Fragment } from "react";
import Image from "next/image";

import Component1 from "../../../../public/landingpage/Component 1.svg";
import Component2 from "../../../../public/landingpage/Component 2.svg";
import Component3 from "../../../../public/landingpage/Component 3.svg";

export default function HeroSection() {
  return (
    <Fragment>
      <div className="flex items-center justify-center w-fit h-fit mt-44">
        <div className="w-[40rem] h-60 bg-[#6EC3FB] bg-opacity-30 blur-2xl" />
        <div className="absolute flex flex-col font-bold text-8xl">
          <span>Coin Price</span>
          <span>Web Page</span>
        </div>
      </div>

      <span className="text-lg w-fit h-fit">
        Connect you to the latest finance information!
      </span>

      <button className="text-2xl font-bold bg-[#0094FF] text-white p-6 rounded-xl flex gap-4 hover:bg-blue-300 hover:text-black">
        Get started for free
      </button>

      <span className="text-5xl font-bold w-fit h-fit">
        For your experience
      </span>

      <div className="flex gap-32 w-fit h-fit">
        <div className="flex flex-col items-center justify-between h-48 w-44">
          <Image src={Component1} alt="Component 1" />
          <span className="text-xl font-bold text-center">
            Read-only access to your data
          </span>
        </div>
        <div className="flex flex-col items-center justify-between h-48 w-60">
          <Image src={Component2} alt="Component 2" />
          <span className="text-xl font-bold text-center">
            End-to-end encryption and token-based API
          </span>
        </div>
        <div className="flex flex-col items-center justify-between h-48 w-44">
          <Image src={Component3} alt="Component 3" />
          <span className="text-xl font-bold text-center">
            Certified User Security
          </span>
        </div>
      </div>
    </Fragment>
  );
}
