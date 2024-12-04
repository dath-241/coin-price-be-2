"use client";
import FlexBox from "@/src/components/FlexBox";
import { Clock, Users } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const path = [
  {
    name: "Quản lý người dùng",
    path: "/user",
    icon: <Users size={20} weight="bold" />,
  },
  {
    name: "Lịch sử thanh toán",
    path: "/paymentHistory",
    icon: <Clock size={20} weight="bold" />,
  },
];

export default function NavLink() {
  const pathName = usePathname();

  return (
    <FlexBox className="gap-8">
      {path.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className="p-2 font-bold flex items-center justify-center gap-2 border-0 border-b-2 cursor-pointer"
          style={{
            borderColor: pathName === item.path ? "black" : "transparent",
          }}>
          {item.icon}
          {item.name}
        </Link>
      ))}
    </FlexBox>
  );
}
