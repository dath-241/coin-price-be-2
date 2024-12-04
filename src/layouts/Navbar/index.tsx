import { H1 } from "@/src/components/Heading";
import {
  Avatar,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function PrivateNavbar() {
  return (
    <Navbar maxWidth="full" className="fixed">
      <NavbarBrand className="flex gap-4">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="w-32 cursor-pointer rounded-xl"
        />
        <H1>Coin price - Admin</H1>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-10"
        justify="center"></NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <Avatar src="/user.svg" />
      </NavbarContent>
    </Navbar>
  );
}
