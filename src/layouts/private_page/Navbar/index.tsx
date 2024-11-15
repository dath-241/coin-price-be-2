import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function PrivateNavbar() {
  return (
    <Navbar maxWidth="full">
      <NavbarBrand >
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="w-32 cursor-pointer rounded-xl"
        />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        <NavbarItem>
          <Link href="#">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link href="#">
            Markets
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">
            Alert
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">

      </NavbarContent>
    </Navbar>
  );
}