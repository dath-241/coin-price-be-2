"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { useCallback } from "react";
import { PaymentHistory } from "../types";
import FlexBox from "../components/FlexBox";
import { useRouter } from "next/navigation";

interface Props {
  historyList: PaymentHistory[];
  searchParams: SearchParams;
}

export default function HistoryList({ historyList, searchParams }: Props) {
  const router = useRouter();

  const renderCell = useCallback((history: any, columnKey: ColumnKey) => {
    const cellValue = history[columnKey];

    switch (columnKey) {
      case "username":
        return (
          <User
            avatarProps={{ radius: "full", src: "/user.svg" }}
            name={cellValue}></User>
        );
      case "date":
        return new Date(cellValue).toLocaleDateString();
      default:
        return cellValue;
    }
  }, []);

  const onLoadMore = () => {
    const page = searchParams.page || 1;
    const newPage = parseInt(page.toString()) + 1;
    console.log(newPage);
    router.push(`/paymentHistory?page=${newPage}`, { scroll: false });
  };

  const hasMore = () => {
    const page = searchParams.page || 1;
    return historyList.length === page * 10;
  };

  return (
    <FlexBox className="flex-col gap-4 w-full p-4 bg-neutral-100 shadow-md rounded-md">
      <Table
        bottomContent={
          hasMore() && (
            <div className="flex w-full justify-center">
              <Button onClick={onLoadMore} variant="flat">
                Load More
              </Button>
            </div>
          )
        }
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
        <TableBody emptyContent={"No history to display."} items={historyList}>
          {(history) => (
            <TableRow
              className="cursor-pointer hover:bg-neutral-300"
              key={history.email}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(history, columnKey as ColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </FlexBox>
  );
}

type ColumnKey = "date" | "username" | "email" | "amount";

type Column = {
  key: ColumnKey;
  label: string;
  align: "start" | "center" | "end";
};

const columns: Column[] = [
  {
    key: "username",
    label: "Username",
    align: "start",
  },
  {
    key: "email",
    label: "Email",
    align: "center",
  },
  {
    key: "amount",
    label: "Amount",
    align: "center",
  },
  {
    key: "date",
    label: "Date",
    align: "center",
  },
];
