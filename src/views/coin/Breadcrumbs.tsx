"use client";
import FlexBox from "@/src/components/Box/FlexBox";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

interface Props {
  name: string;
}

export default function CustomeBreadcrumbs({ name }: Props) {
  return (
    <FlexBox className="w-full">
      <Breadcrumbs underline="hover" size="lg">
        <BreadcrumbItem href="/market">Market</BreadcrumbItem>
        <BreadcrumbItem>{name}</BreadcrumbItem>
      </Breadcrumbs>
    </FlexBox>
  );
}
