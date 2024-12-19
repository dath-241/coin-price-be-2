import Container from "@/src/components/Container";
import { fetchAlerts } from "@/src/libs/serverFetch";
import Alerts from "@/src/views/alert";

export default async function Page() {
  const { triggerList, indicatorList } = await fetchAlerts();
  return (
    <Container className="py-20">
      <Alerts triggerList={triggerList} indicatorList={indicatorList} />
    </Container>
  );
}
