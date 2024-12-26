"use client";
import FlexBox from "@/src/components/Box/FlexBox";
import { CoinDetailData, CoinHistoryData } from "@/src/types/coin";
import CustomeBreadcrumbs from "./Breadcrumbs";
import { H1 } from "@/src/components/Heading";
import {
  Accordion,
  AccordionItem,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import CustomAccordion from "./Accordion";
import HistoryChart from "./HistoryChart";

interface Props {
  coinDetail: CoinDetailData;
  historyData: CoinHistoryData | null;
}

export default function CoinDetail({ historyData, coinDetail }: Props) {
  return (
    <FlexBox className="flex-row w-10/12 pt-12 gap-4">
      <FlexBox className="w-4/12 flex-col gap-4">
        <CustomeBreadcrumbs name={coinDetail.name} />
        <FlexBox className="flex-row gap-4 items-center">
          <Image
            src={coinDetail.image.large}
            alt="Symbol"
            className="size-16"
          />
          <FlexBox className="flex-col">
            <FlexBox className="gap-2 items-center justify-center">
              <H1>{coinDetail.name}</H1>
              <Chip radius="sm">#{coinDetail.market_data.market_cap_rank}</Chip>
            </FlexBox>
            <span className="text-gray-500">
              {coinDetail.symbol.toUpperCase()}
            </span>
          </FlexBox>
        </FlexBox>
        <FlexBox className="gap-4 items-center">
          {coinDetail.market_data.current_price.usd && (
            <H1 className="text-4xl">
              ${coinDetail.market_data.current_price.usd.toLocaleString()}
            </H1>
          )}
          {coinDetail.market_data.price_change_percentage_24h && (
            <span
              className={`text-2xl flex items-center font-bold ${
                coinDetail.market_data.price_change_percentage_24h > 0
                  ? "text-success"
                  : "text-danger"
              }`}>
              {coinDetail.market_data.price_change_percentage_24h > 0 ? (
                <ArrowUp size={24} />
              ) : (
                <ArrowDown size={24} />
              )}
              {coinDetail.market_data.price_change_percentage_24h.toFixed(1)}%
            </span>
          )}
        </FlexBox>
        <CustomAccordion coinDetail={coinDetail} />
        <Divider />
        <FlexBox className="flex-col gap-2">
          <H1>Catagory</H1>
          <FlexBox className="gap-2 flex-wrap">
            {coinDetail.categories.map((category) => (
              <Chip key={category} radius="sm" className="cursor-default">
                {category}
              </Chip>
            ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <FlexBox className="w-full flex-col gap-16">
        {historyData && (
          <HistoryChart id={coinDetail.id} historyData={historyData} />
        )}
        <FlexBox className="flex-col gap-2">
          {coinDetail.description.en && (
            <Accordion defaultExpandedKeys={["description"]}>
              <AccordionItem key="description" title={<H1>Description</H1>}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: coinDetail.description.en.replace(
                      /(?:\r\n|\r|\n)/g,
                      "<br />"
                    ),
                  }}></span>
              </AccordionItem>
            </Accordion>
          )}
          <Divider />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
