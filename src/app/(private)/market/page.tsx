import FlexBox from "@/src/components/Box/FlexBox";
import Container from "@/src/components/Container";
import { H1 } from "@/src/components/Heading";
import { fetchCoinList } from "@/src/libs/serverFetch";
import CoinList from "@/src/views/market/CoinList";
import MarketPagnitation from "@/src/views/market/Pagnitation";

interface CoinParams {
  page: number;
}

interface Props {
  searchParams: CoinParams;
}

export default async function Page({ searchParams }: Props) {
  const page = searchParams.page || 1;
  const fetchRes = await fetchCoinList("usd", page);
  const coinList = fetchRes.data;

  return (
    <Container className="py-20">
      <FlexBox className="w-10/12 pt-20 pb-4 flex-col">
        <H1 className="text-4xl">Cryptocurrency Market</H1>
        <span className="text-md text-gray-500 w-1/2">
          Cryptocurrency is a dynamic and decentralized digital financial
          ecosystem that facilitates the trading, investment, and exchange of
          cryptocurrencies—digital assets secured by cryptographic technology.
        </span>
      </FlexBox>
      <FlexBox className="w-10/12 flex-col gap-4 items-center">
        <CoinList coinList={coinList} />
        <MarketPagnitation />
      </FlexBox>
    </Container>
  );
}
