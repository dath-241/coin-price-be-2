"use client";
import FlexBox from "@/src/components/Box/FlexBox";
import { CoinData } from "@/src/types/coin";
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Props {
  coinList: CoinData[];
}

export default function CoinList({ coinList }: Props) {
  const router = useRouter();

  const [list, setList] = useState<CoinData[]>(coinList);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "market_cap_rank",
    direction: "ascending",
  });

  useEffect(() => {
    setList(coinList);
    setSortDescriptor({
      column: "market_cap_rank",
      direction: "ascending",
    });
  }, [coinList]);

  const renderCell = useCallback((coin: CoinData, columnKey: ColumnKey) => {
    const cellValue = coin[columnKey];

    switch (columnKey) {
      case "market_cap_rank":
        return <span className="font-medium">{coin.market_cap_rank}</span>;
      case "name":
        return (
          <User
            avatarProps={{
              src: coin.image,
              alt: coin.name,
            }}
            name={cellValue}
            description={coin.symbol.toUpperCase()}
          />
        );
      case "current_price":
      case "market_cap":
      case "total_volume":
        if (!cellValue) return <span className="pl-4">-</span>;
        const value = (cellValue as number).toLocaleString();
        return <span className="pl-4">{`$${value}`}</span>;
      case "price_change_percentage_24h":
        const color = (change: number) => {
          if (change > 0) return "text-success";
          return "text-danger";
        };
        const change = cellValue as number;
        if (!change || change == 0) {
          return <span className={`${color(0)} font-medium`}>0%</span>;
        }
        const num = change.toFixed(1);
        return <span className={`${color(change)} font-medium`}>{num}%</span>;
      case "total_supply":
        if (!cellValue) return <span className="">-</span>;
        const supply = (cellValue as number).toFixed(2).toLocaleString();
        return <span className="">{supply}</span>;
      default:
        if (!cellValue) return <span className="">-</span>;
        return cellValue;
    }
  }, []);

  const onSort = () => {
    const newDes = {
      column: "market_cap_rank",
      direction:
        sortDescriptor.direction == "ascending" ? "descending" : "ascending",
    } as SortDescriptor;
    setSortDescriptor(newDes);
    const order = newDes.direction;
    const sortedList = [...list].sort((a, b) => {
      if (order === "ascending") return a.market_cap_rank - b.market_cap_rank;
      return b.market_cap_rank - a.market_cap_rank;
    });
    setList(sortedList);
  };

  return (
    <FlexBox className="flex-col gap-4 w-full rounded-md mt-4">
      <Table
        color="primary"
        removeWrapper
        isHeaderSticky
        sortDescriptor={sortDescriptor}
        onSortChange={onSort}
        fullWidth
        aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              align={column.align}
              key={column.key}
              allowsSorting={column.sortable}
              width={column.width as any}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No coin to display."} items={list}>
          {(coin) => (
            <TableRow
              onClick={() => {
                router.push(`/coin/${coin.id}`);
              }}
              className="cursor-pointer hover:bg-neutral-200 rounded-md"
              key={coin.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(coin, columnKey as ColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </FlexBox>
  );
}

type ColumnKey =
  | "market_cap_rank"
  | "name"
  | "symbol"
  | "current_price"
  | "price_change_percentage_24h"
  | "total_volume"
  | "market_cap"
  | "total_supply";

type Column = {
  key: ColumnKey;
  label: string;
  align: "start" | "center" | "end";
  sortable?: boolean;
  width?: string;
};

const columns: Column[] = [
  {
    key: "market_cap_rank",
    label: "Rank",
    align: "center",
    sortable: true,
    width: "5%",
  },
  { key: "name", label: "Coin", align: "start", width: "30%" },
  { key: "current_price", label: "Price", align: "end" },
  {
    key: "price_change_percentage_24h",
    label: "24h",
    align: "end",
  },
  { key: "total_volume", label: "Volume", align: "end" },
  { key: "market_cap", label: "Market Cap", align: "end" },
  { key: "total_supply", label: "Supply", align: "end" },
];
