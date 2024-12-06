import Container from "@/src/components/Container";
import PrivateNavbar from "@/src/layouts/private_page/Navbar";
import { BaseUrl, customHeader } from "@/src/libs";
import { IndicatorTrigerData, TriggerConditionData } from "@/src/types/alert";
import Alerts from "@/src/views/alert";
import axios from "axios";
import { cookies } from "next/headers";

export default async function Page() {
  const { triggerList, indicatorList } = await fetchAlerts();
  return (
    <Container className="bg-primary-50 pt-12 pb-20">
      <PrivateNavbar />
      <Alerts triggerList={triggerList} indicatorList={indicatorList} />
    </Container>
  );
}

async function fetchAlerts() {
  const cookieStore = cookies();
  const res = await refreshToken();
  const token = res.data ?? cookieStore.get("token")?.value;
  const url = `${BaseUrl}/api/vip2/get/alerts`;

  let triggerList: TriggerConditionData[] = [];
  let indicatorList: IndicatorTrigerData[] = [];

  try {
    const res = await axios.get(url, {
      headers: customHeader(token),
    });

    const list: any[] = res.data;

    for (const item of list) {
      if (item.triggerType == "indicator") {
        indicatorList.push(item);
      } else {
        triggerList.push(item);
      }
    }

    return {
      triggerList,
      indicatorList,
    };
  } catch (error) {
    console.error(error);
    return {
      triggerList,
      indicatorList,
    };
  }
}

async function refreshToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const header = customHeader(token);
  try {
    const res = await axios.get(`${BaseUrl}/auth/refreshToken`, {
      headers: header,
    });
    //extract token from cookie
    const headers = res.headers["set-cookie"];
    if (!headers) {
      return {
        success: false,
        message: "Something went wrong",
        status: 404,
        data: null,
      } as CustomResponse<null>;
    }
    const newToken = headers[0].split(";")[0].split("=")[1];
    if (!newToken) {
      return {
        success: false,
        message: "Something went wrong",
        status: 404,
        data: null,
      } as CustomResponse<null>;
    }
    return {
      success: true,
      message: res.data.message,
      status: res.status,
      data: newToken,
    } as CustomResponse<string>;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: error.response,
      status: error.status,
      data: null,
    } as CustomResponse<null>;
  }
}
