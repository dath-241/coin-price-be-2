"use client";
import FlexBox from "@/src/components/Box/FlexBox";
import Container from "@/src/components/Container";
import { H1 } from "@/src/components/Heading";
import {
  FundingRateData,
  FuturePriceData,
  KlineData,
  SpotPriceData,
} from "@/src/types/coin";
import { useEffect, useState } from "react";

export default function Page() {
  const [spot, setSpot] = useState<SpotPriceData | null>(null);
  const [future, setFuture] = useState<FuturePriceData | null>(null);
  const [funding, setFunding] = useState<FundingRateData | null>(null);
  const [kline, setKline] = useState<KlineData | null>(null);

  useEffect(() => {
    const spotEventSource = new EventSource("/api/spot?symbols=BTCUSDT");
    const futureEventSource = new EventSource("/api/future?symbols=BTCUSDT");
    const fundingEventSource = new EventSource("/api/funding?symbols=BTCUSDT");
    const klineEventSource = new EventSource("/api/kline?symbols=BTCUSDT");

    spotEventSource.onmessage = (event) => {
      const spotData = JSON.parse(event.data) as SpotPriceData;
      setSpot(spotData);
    };

    spotEventSource.onerror = (error) => {
      setSpot(null);
      console.error("SSE Error:", error);
      spotEventSource.close();
    };

    futureEventSource.onmessage = (event) => {
      const futureData = JSON.parse(event.data) as FuturePriceData;
      setFuture(futureData);
    };

    futureEventSource.onerror = (error) => {
      setFuture(null);
      console.error("SSE Error:", error);
      futureEventSource.close();
    };

    fundingEventSource.onmessage = (event) => {
      const fundingData = JSON.parse(event.data) as FundingRateData;
      console.log(fundingData);
      setFunding(fundingData);
    };

    fundingEventSource.onerror = (error) => {
      setFunding(null);
      console.error("SSE Error:", error);
      fundingEventSource.close();
    };

    klineEventSource.onmessage = (event) => {
      const klineData = JSON.parse(event.data) as KlineData;
      setKline(klineData);
    };

    klineEventSource.onerror = (error) => {
      setKline(null);
      console.error("SSE Error:", error);
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
    <Container>
      <FlexBox className="w-10/12 gap-4">
        {spot && (
          <FlexBox className="flex-col gap-2">
            <H1>Spot</H1>
            <span>{`${parseFloat(spot.price).toFixed(2)}$`}</span>
          </FlexBox>
        )}
        {future && (
          <FlexBox className="flex-col gap-2">
            <H1>Future</H1>
            <span>{`${parseFloat(future.price).toFixed(2)}$`}</span>
          </FlexBox>
        )}
        {funding && (
          <FlexBox className="flex-col gap-2">
            <H1>Funding Rate</H1>
            <span>{`${parseFloat(funding.fundingRate)}%`}</span>
          </FlexBox>
        )}
        {kline && (
          <FlexBox className="flex-col gap-2">
            <H1>Kline</H1>
            <span>{`${parseFloat(kline.highPrice).toFixed(2)}$`}</span>
          </FlexBox>
        )}
      </FlexBox>
    </Container>
  );
}
