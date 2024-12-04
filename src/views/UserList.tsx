"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import { User as UserType } from "../types";
import FlexBox from "../components/FlexBox";
import UserInforModal from "./UserInfoModal";

interface Props {
  userList: UserType[];
}

export default function UserList({ userList }: Props) {
  const { isOpen, onOpenChange } = useDisclosure();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const renderCell = useCallback((user: any, columnKey: ColumnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", src: "/user.svg" }}
            description={`@${user.username}`}
            name={cellValue}></User>
        );
      case "vip_role":
        return `VIP${cellValue}`;
      case "otp":
        if (!cellValue) return "Không có OTP";
        return cellValue.otpCode;
      default:
        return cellValue;
    }
  }, []);

  return (
    <FlexBox className="flex-col gap-4 w-full p-4 bg-neutral-100 shadow-md rounded-md">
      <UserInforModal
        userInfo={currentUser}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <Table
        color="primary"
        removeWrapper
        aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn align={column.align} key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No user to display."} items={userList}>
          {(user) => (
            <TableRow
              onClick={() => {
                setCurrentUser(user);
                onOpenChange();
              }}
              className="cursor-pointer hover:bg-neutral-300"
              key={user.email}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(user, columnKey as ColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </FlexBox>
  );
}

type ColumnKey = "name" | "email" | "username" | "vip_role" | "coin" | "otp";

type Column = {
  key: ColumnKey;
  label: string;
  align: "start" | "center" | "end";
};

const columns: Column[] = [
  { key: "name", label: "Name", align: "start" },
  { key: "email", label: "Email", align: "center" },
  { key: "vip_role", label: "VIP Role", align: "center" },
  { key: "coin", label: "Coin", align: "center" },
  { key: "otp", label: "OTP", align: "center" },
];
