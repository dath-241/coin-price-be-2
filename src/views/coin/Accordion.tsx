import FlexBox from "@/src/components/Box/FlexBox";
import { CoinDetailData } from "@/src/types/coin";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface Props {
  coinDetail: CoinDetailData;
}

export default function CustomAccordion({ coinDetail }: Props) {
  return (
    <Accordion isCompact>
      <AccordionItem
        key="1"
        title="Market Cap"
        subtitle={
          <span className="font-bold text-md text-black">
            ${coinDetail.market_data.market_cap.usd.toLocaleString()}
          </span>
        }>
        <FlexBox className="flex-col gap-2">
          <span className="font-medium">
            {`Market Cap = Current Price x Circulating Supply`}
          </span>
          <span>
            {`Refers to the total market value of a cryptocurrency’s circulating
            supply. It is similar to the stock market’s measurement of
            multiplying price per share by shares readily available in the
            market (not held & locked by insiders, governments)`}
          </span>
        </FlexBox>
      </AccordionItem>
      <AccordionItem
        key="2"
        title="Fully Diluted Valuation"
        subtitle={
          <span className="font-bold text-md text-black">
            $
            {coinDetail.market_data.fully_diluted_valuation.usd.toLocaleString()}
          </span>
        }>
        <FlexBox className="flex-col gap-2">
          <span className="font-medium">
            {`Fully Diluted Valuation (FDV) = Current Price x Total Supply`}
          </span>
          <span>
            {`Fully Diluted Valuation (FDV) is the theoretical market
            capitalization of a coin if the entirety of its supply is in
            circulation, based on its current market price. The FDV value is
            theoretical as increasing the circulating supply of a coin may
            impact its market price. Also depending on the tokenomics, emission
            schedule or lock-up period of a coin's supply, it may take a
            significant time before its entire supply is released into
            circulation.`}
          </span>
        </FlexBox>
      </AccordionItem>
      <AccordionItem
        key="3"
        title="Total Trading Volume"
        subtitle={
          <span className="font-bold text-md text-black">
            ${coinDetail.market_data.total_volume.usd.toLocaleString()}
          </span>
        }>
        <FlexBox className="flex-col gap-2">
          <span>
            {`A measure of a cryptocurrency trading volume across all tracked
            platforms`}
          </span>
        </FlexBox>
      </AccordionItem>
      <AccordionItem
        key="4"
        title="Circulating Supply"
        subtitle={
          <span className="font-bold text-md text-black">
            {coinDetail.market_data.circulating_supply.toLocaleString()}
          </span>
        }>
        <FlexBox className="flex-col gap-2">
          <span>
            {`The amount of coins that are circulating in the market and are
            tradeable by the public. It is comparable to looking at shares
            readily available in the market (not held & locked by insiders,
            governments).`}
          </span>
        </FlexBox>
      </AccordionItem>
      <AccordionItem
        key="5"
        title="Total Supply"
        subtitle={
          <span className="font-bold text-md text-black">
            {coinDetail.market_data.total_supply.toLocaleString()}
          </span>
        }>
        <FlexBox className="flex-col gap-2">
          <span className="font-medium">
            {`Total Supply = Onchain supply - burned tokens`}
          </span>
          <span>
            {`The amount of coins that have already been created, minus any coins
            that have been burned (removed from circulation). It is comparable
            to outstanding shares in the stock market.`}
          </span>
        </FlexBox>
      </AccordionItem>
      <AccordionItem
        key="6"
        title="Max Supply"
        subtitle={
          <span className="font-bold text-md text-black">
            {coinDetail.market_data.max_supply.toLocaleString()}
          </span>
        }>
        <FlexBox className="flex-col gap-2">
          <span className="font-medium">
            {`Max Supply = Theoretical maximum as coded`}
          </span>
          <span>
            {`The maximum number of coins coded to exist in the lifetime of the
            cryptocurrency. It is comparable to the maximum number of issuable
            shares in the stock market.`}
          </span>
        </FlexBox>
      </AccordionItem>
    </Accordion>
  );
}
