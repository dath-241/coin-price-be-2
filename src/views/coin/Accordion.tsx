"use client";
import FlexBox from "@/src/components/Box/FlexBox";
import {
  CoinDetailData,
  FundingRateData,
  FuturePriceData,
  KlineData,
  SpotPriceData,
} from "@/src/types/coin";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface Props {
  coinDetail: CoinDetailData;
}

export default function CustomAccordion({ coinDetail }: Props) {
  const [spot, setSpot] = useState<SpotPriceData | null>(null);
  const [future, setFuture] = useState<FuturePriceData | null>(null);
  const [funding, setFunding] = useState<FundingRateData | null>(null);
  const [kline, setKline] = useState<KlineData | null>(null);

  useEffect(() => {
		const symbols = coinDetail.symbol.toUpperCase() + "USDT";
		const spotEventSource = new EventSource(`/api/spot?symbols=${symbols}`);
		const futureEventSource = new EventSource(
			`/api/future?symbols=${symbols}`
		);
		const fundingEventSource = new EventSource(
			`/api/funding?symbols=${symbols}`
		);
		const klineEventSource = new EventSource(
			`/api/kline?symbols=${symbols}`
		);

		spotEventSource.onmessage = (event) => {
			const spotData = JSON.parse(event.data) as SpotPriceData;
			setSpot(spotData);
		};

		spotEventSource.onerror = (error: any) => {
			setSpot(null);
			console.log(error);
			spotEventSource.close();
		};

		futureEventSource.onmessage = (event) => {
			const futureData = JSON.parse(event.data) as FuturePriceData;
			setFuture(futureData);
		};

		futureEventSource.onerror = (error: any) => {
			setFuture(null);
			console.log(error);
			futureEventSource.close();
		};

		fundingEventSource.onmessage = (event) => {
			const fundingData = JSON.parse(event.data) as FundingRateData;
			console.log(fundingData);
			setFunding(fundingData);
		};

		fundingEventSource.onerror = (error: any) => {
			setFunding(null);
			console.log(error);
			fundingEventSource.close();
		};

		klineEventSource.onmessage = (event) => {
			const klineData = JSON.parse(event.data) as KlineData;
			setKline(klineData);
		};

		klineEventSource.onerror = (error: any) => {
			setKline(null);
			console.log(error);
			klineEventSource.close();
		};

		return () => {
			spotEventSource.close();
			futureEventSource.close();
			fundingEventSource.close();
			klineEventSource.close();
		};
  }, []);

  return (
		<Accordion isCompact>
			{coinDetail.market_data.market_cap.usd != null ? (
				<AccordionItem
					key="1"
					title="Market Cap"
					subtitle={
						<span className="font-bold text-md text-black">
							$
							{coinDetail.market_data.market_cap.usd.toLocaleString()}
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
			) : (
				(null as any)
			)}

			{spot && (
				<AccordionItem
					key="7"
					title="Spot price"
					subtitle={
						<span className="font-bold text-md text-black">
							${parseFloat(spot.price).toLocaleString()}
						</span>
					}>
					<FlexBox className="flex-col gap-2">
						<span>
							{`The spot price is the current price in the marketplace at which a given asset—such as a security, commodity, or currency—can be bought or sold for immediate delivery.`}
						</span>
						<span className="text-sm text-gray-500">
							{`Last update: ${spot.eventTime}`}
						</span>
					</FlexBox>
				</AccordionItem>
			)}

			{future && (
				<AccordionItem
					key="8"
					title="Future price"
					subtitle={
						<span className="font-bold text-md text-black">
							${parseFloat(future.price).toLocaleString()}
						</span>
					}>
					<FlexBox className="flex-col gap-2">
						<span>
							{`Futures price is an agreed-upon price for future delivery of the asset.`}
						</span>
						<span className="text-sm text-gray-500">
							{`Last update: ${future.eventTime}`}
						</span>
					</FlexBox>
				</AccordionItem>
			)}

			{funding && (
				<AccordionItem
					key="9"
					title="Funding rate"
					subtitle={
						<span className="font-bold text-md text-black">
							{parseFloat(funding.fundingRate).toLocaleString()}%
						</span>
					}>
					<FlexBox className="flex-col gap-2">
						<span>
							{`Futures price is an agreed-upon price for future delivery of the asset.`}
						</span>
						<span className="text-sm text-gray-500">
							{`Last update: ${funding.eventTime}`}
						</span>
					</FlexBox>
				</AccordionItem>
			)}

			{kline && (
				<AccordionItem
					key="10"
					title="Kline"
					subtitle={
						<span className="font-bold text-md text-black">
							${parseFloat(kline.openPrice).toLocaleString()}
						</span>
					}>
					<FlexBox className="flex-col">
						<FlexBox className="flex-row gap-2">
							<span className="font-bold text-sm">
								Open / Close:{" "}
							</span>
							<span className="text-sm">
								${parseFloat(kline.openPrice).toLocaleString()}{" "}
								{" / "}$
								{parseFloat(kline.closePrice).toLocaleString()}
							</span>
						</FlexBox>
						<FlexBox className="flex-row gap-2">
							<span className="font-bold text-sm">
								High / Low:{" "}
							</span>
							<span className="text-sm">
								${parseFloat(kline.highPrice).toLocaleString()}
								{" / "}$
								{parseFloat(kline.lowPrice).toLocaleString()}
							</span>
						</FlexBox>

						<FlexBox className="flex-row gap-2 mt-2">
							<span className="font-bold text-sm">
								Number of trades:{" "}
							</span>
							<span className="text-sm">
								{kline.numberOfTrades.toLocaleString()}
							</span>
						</FlexBox>

						<FlexBox className="flex-row gap-2 mt-2">
							<span className="font-bold text-sm">
								Base asset volume:{" "}
							</span>
							<span className="text-sm">
								{parseFloat(
									kline.baseAssetVolume
								).toLocaleString()}
							</span>
						</FlexBox>
						<FlexBox className="flex-row gap-2">
							<span className="font-bold text-sm">
								Taker buy volume:{" "}
							</span>
							<span className="text-sm">
								{parseFloat(
									kline.takerBuyVolume
								).toLocaleString()}
							</span>
						</FlexBox>
						<FlexBox className="flex-row gap-2">
							<span className="font-bold text-sm">
								Taker buy base volume:{" "}
							</span>
							<span className="text-sm">
								{parseFloat(
									kline.takerBuyBaseVolume
								).toLocaleString()}
							</span>
						</FlexBox>
						<FlexBox className="flex-row gap-2">
							<span className="font-bold text-sm">Volume: </span>
							<span className="text-sm">
								{parseFloat(kline.volume).toLocaleString()}
							</span>
						</FlexBox>

						<FlexBox className="flex-row gap-2 mt-2">
							<span className="font-bold text-sm">
								Start time:{" "}
							</span>
							<span className="text-sm">
								{kline.klineStartTime}
							</span>
						</FlexBox>
						<FlexBox className="flex-row gap-2">
							<span className="font-bold text-sm">
								Close time:{" "}
							</span>
							<span className="text-sm">
								{kline.klineCloseTime}
							</span>
						</FlexBox>

						<span className="text-sm text-gray-500 mt-2">
							{`Last update: ${kline.eventTime}`}
						</span>
					</FlexBox>
				</AccordionItem>
			)}

			{coinDetail.market_data.fully_diluted_valuation.usd != null ? (
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
			) : null}

			{coinDetail.market_data.total_volume.usd != null ? (
				<AccordionItem
					key="3"
					title="Total Trading Volume"
					subtitle={
						<span className="font-bold text-md text-black">
							$
							{coinDetail.market_data.total_volume.usd.toLocaleString()}
						</span>
					}>
					<FlexBox className="flex-col gap-2">
						<span>
							{`A measure of a cryptocurrency trading volume across all tracked
            platforms`}
						</span>
					</FlexBox>
				</AccordionItem>
			) : null}

			{coinDetail.market_data.circulating_supply != null ? (
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
			) : null}

			{coinDetail.market_data.total_supply != null ? (
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
			) : null}

			{coinDetail.market_data.max_supply != null ? (
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
			) : null}
		</Accordion>
  );
}
