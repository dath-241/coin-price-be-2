"use client";
import Logo from "@/src/components/Logo";
import { signout } from "@/src/libs/auth";
import UserProfileModal from "@/src/views/userProfile";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";
import { SignOut, User } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PrivateNavbar() {
  const router = useRouter();
  const { isOpen, onOpenChange } = useDisclosure();

  return (
    <Navbar maxWidth="full" className="fixed bg-[#DCF0FF] shadow-md">
      <NavbarBrand>
        <Logo className="w-32" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        <NavbarItem>
          <Link href="#" className="text-lg font-medium hover:underline">
            Markets
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/alerts" className="text-lg font-medium hover:underline">
            Alerts
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Avatar src="/user.svg" isBordered color="default" />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              onClick={() => onOpenChange()}
              startContent={<User />}>
              Profile
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                signout();
                router.push("/signin");
              }}
              color="danger"
              className="text-error-500"
              startContent={<SignOut />}>
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <UserProfileModal isOpenMain={isOpen} onOpenChangeMain={onOpenChange} />
    </Navbar>
  );
}
