"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function PublicNavbar() {
  return (
    <Navbar maxWidth="full" className="bg-[#DCF0FF] fixed">
      <NavbarBrand>
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="w-32 cursor-pointer rounded-xl"
        />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            color="primary"
            href="/signin"
            variant="flat"
            radius="sm"
            className="font-bold">
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="/signup"
            variant="solid"
            radius="sm"
            className="text-white bg-primary-500 font-bold">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
