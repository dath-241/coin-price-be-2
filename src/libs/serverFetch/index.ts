import { cookies } from "next/headers";
import { BaseUrl, customHeader } from "..";
import axios from "axios";
import { BasicUserInfo } from "@/src/types/user";
import { IndicatorTrigerData, TriggerConditionData } from "@/src/types/alert";
import { CoinData, CoinDetailData, CoinHistoryData } from "@/src/types/coin";
// import mockCoinData from "./mockCoinData.json";
// import mockHistoryData from "./mockHistoryData.json";

export async function refreshToken() {
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

export async function fetchInfo() {
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
			message: "",
			status: error.status,
			data: null,
		} as CustomResponse<null>;
	}
}

export async function fetchAlerts() {
	const cookieStore = cookies();
	const res = await refreshToken();
	const token = res.data ?? cookieStore.get("token")?.value;
	const url = `${BaseUrl}/api/vip2/get/alerts`;

	try {
		const res = await axios.get(url, {
			headers: customHeader(token),
		});

		const triggerList: TriggerConditionData[] = [];
		const indicatorList: IndicatorTrigerData[] = [];
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
			triggerList: [],
			indicatorList: [],
		};
	}
}

export async function fetchCoinList(currency: string, page: number) {
	const token = process.env.geckoToken;
	const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}`;
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
		} as CustomResponse<CoinData[]>;
	} catch (error: any) {
		return {
			success: false,
			message: error.response.data.error,
			status: error.status,
			data: [],
		} as CustomResponse<CoinData[]>;
	}
}

export async function fetchCoinDetail(id: string) {
	const token = process.env.geckoToken2;
	const url = `https://api.coingecko.com/api/v3/coins/${id}`;
	const header = {
		"Content-Type": "application/json",
		"api-key": token,
	};

	// return {
	// 	success: true,
	// 	message: "Not implemented",
	// 	status: 404,
	// 	data: mockCoinData as any,
	// } as CustomResponse<CoinDetailData>;

	try {
		const res = await axios.get(url, {
			headers: header,
		});

		return {
			success: true,
			message: "",
			status: res.status,
			data: res.data,
		} as CustomResponse<CoinDetailData>;
	} catch (error: any) {
		return {
			success: false,
			message: error.response.data.error,
			status: error.status,
			data: null,
		} as CustomResponse<null>;
	}
}

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

	// return {
	// 	success: true,
	// 	message: "Not implemented",
	// 	status: 404,
	// 	data: mockHistoryData as any,
	// } as CustomResponse<CoinHistoryData>;

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
