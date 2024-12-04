import Container from "@/src/components/Container";
import PrivateNavbar from "@/src/layouts/Navbar";
import { H1 } from "../../components/Heading";
import FlexBox from "../../components/FlexBox";
import { PaymentHistory } from "../../types";
import NavLink from "../../layouts/NavLink";
import HistoryList from "@/src/views/HistoryList";
import axios from "axios";

interface PageProps {
  searchParams: SearchParams;
}

export default async function UserManagementPage({ searchParams }: PageProps) {
  const { field, value } = searchParams;

  let paymentList: PaymentHistory[] = await fetchHistoryList(searchParams);

  if (field && value) {
    const filteredUserList = paymentList.filter((payment) => {
      const userValue = payment[field as keyof PaymentHistory] as string;
      return userValue.toLowerCase().includes(value.toLowerCase());
    });
    paymentList = filteredUserList;
  }

  return (
    <Container className="bg-[#DCF0FF] py-16">
      <PrivateNavbar />
      <NavLink />
      <FlexBox className="w-9/12 mb-8">
        <H1 className="text-3xl font-bold text-center">Lịch sử thanh toán</H1>
      </FlexBox>

      <FlexBox className="w-9/12 mt-4">
        <HistoryList historyList={paymentList} searchParams={searchParams} />
      </FlexBox>
    </Container>
  );
}
async function fetchHistoryList(params: SearchParams) {
  const page = params.page || 1;
  const to = page * 10;

  const url = `https://dath.hcmutssps.id.vn/admin/getHistoryPayment?from=0&to=${to}`;
  const token = process.env.adminToken;

  try {
    const response = await axios.get(url, {
      headers: {
        token: token,
      },
    });
    return response.data as PaymentHistory[];
  } catch (error: any) {
    console.error(error.data);
    return [];
  }
}
