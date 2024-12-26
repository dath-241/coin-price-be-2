"use server";
import { CoinHistoryData } from "@/src/types/coin";
import axios from "axios";

export async function fetchCoinHistory(
  id: string,
  currency: string,
  day: number
) {
  const token = process.env.geckoToken3;
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${day}`;
  const header = {
    "Content-Type": "application/json",
    "api-key": token,
  };

  try {
    const res = await axios.get(url, {
      headers: header,
    });

    return {
      success: true,
      message: "",
      status: res.status,
      data: res.data,
    } as CustomResponse<CoinHistoryData>;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.error,
      status: error.status,
      data: null,
    } as CustomResponse<null>;
  }
}
