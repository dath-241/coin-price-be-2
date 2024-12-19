import Container from "@/src/components/Container";
import { fetchCoinDetail, fetchCoinHistory } from "@/src/libs/serverFetch";
import CoinDetail from "@/src/views/coin/CoinDetail";
import { notFound } from "next/navigation";

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
    return notFound();
  }

  return (
    <Container className="py-20">
      <CoinDetail coinDetail={coinDetail} historyData={historyData} />
    </Container>
  );
}
