import { BaseUrl, customHeader } from "@/src/libs";
import AuthProvider from "@/src/provider/AuthProvider";
import { BasicUserInfo } from "@/src/types/user";
import axios from "axios";
import { cookies } from "next/headers";

interface Props {
  children: React.ReactNode;
}

export default async function layouts({ children }: Props) {
  const res = await fetchInfo();
  return <AuthProvider basicUserInfor={res.data}>{children}</AuthProvider>;
}

const fetchInfo = async () => {
  const cookieStore = cookies();
  const res = await refreshToken();
  const token = res.data ?? cookieStore.get("token")?.value;
  const url = `${BaseUrl}/api/info`;

  try {
    const res = await axios.get(url, {
      headers: customHeader(token),
    });

    return {
      success: true,
      message: "",
      status: res.status,
      data: res.data,
    } as CustomResponse<BasicUserInfo>;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
      status: error.status,
      data: null,
    } as CustomResponse<null>;
  }
};

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
