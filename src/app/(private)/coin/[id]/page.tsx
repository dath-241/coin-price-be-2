import Container from "@/src/components/Container";
import { fetchCoinDetail, fetchCoinHistory } from "@/src/libs/serverFetch";
import CoinDetail from "@/src/views/coin/CoinDetail";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default async function Page({ params }: Props) {
  const coinRes = await fetchCoinDetail(params.id);
  const coinDetail = coinRes.data;

  const historyRes = await fetchCoinHistory(params.id, "usd", 1);
  const historyData = historyRes.data;

  if (!coinDetail) {
    return (
      <Container className="py-20 items-center justify-center">
        <h1 className="text-4xl font-bold">Coin not found</h1>
      </Container>
    );
  }

  return (
    <Container className="py-20">
      <CoinDetail coinDetail={coinDetail} historyData={historyData} />
    </Container>
  );
}
