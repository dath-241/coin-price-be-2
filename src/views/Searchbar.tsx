"use client";
import { Input, Select, SelectItem } from "@nextui-org/react";
import FlexBox from "../components/FlexBox";
import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface Props {
  searchParams: SearchParams;
  basePath: string;
}

export default function Searchbar({ searchParams, basePath }: Props) {
  const router = useRouter();

  const [searchParam, setSearchParam] = useState<SearchParams>(searchParams);

  const onChangeSearchParam = (change: Partial<SearchParams>) => {
    setSearchParam({
      ...searchParam,
      ...change,
    });
  };

  const onSearch = () => {
    if (!searchParam.field || !searchParam.value) {
      router.push(`${basePath}`);
    }

    router.push(
      `${basePath}/?field=${searchParam.field}&value=${searchParam.value}`
    );
  };

  return (
    <FlexBox className="justify-center gap-4">
      <Select
        placeholder="Tìm kiếm bằng"
        radius="sm"
        variant="bordered"
        defaultSelectedKeys={["name"]}
        onChange={(e) => {
          onChangeSearchParam({
            field: e.target.value,
          });
        }}
        className="w-48 bg-white rounded-lg">
        <SelectItem key="name" value="name">
          Tìm bằng tên
        </SelectItem>
        <SelectItem key="email" value="email">
          Tìm bằng email
        </SelectItem>
        <SelectItem key="username" value="username">
          Tìm bằng username
        </SelectItem>
      </Select>
      <form
        className="w-96 bg-white rounded-lg"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch?.();
        }}>
        <Input
          radius="sm"
          size="md"
          variant="bordered"
          placeholder="Tìm kiếm người dùng"
          value={searchParam.value}
          onChange={(e) => {
            onChangeSearchParam({
              value: e.target.value,
            });
          }}
          onSubmit={onSearch}
          startContent={
            <MagnifyingGlass
              onClick={onSearch}
              className="cursor-pointer"
              size={20}
              weight="bold"
            />
          }
        />
      </form>
    </FlexBox>
  );
}
