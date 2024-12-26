"use server";

import axios from "axios";
import { BaseUrl, customHeader } from "..";
import {
  CreateIndicatorTriggerPayload,
  CreateSnoozePayload,
  CreateTriggerPayload,
  CreateUserIndicatorPayload,
  DeleteIndicatorTriggerPayload,
  DeleteTriggerPayload,
} from "@/src/types/alert";
import { cookies } from "next/headers";

export async function CreateSnoozeAlert(payload: CreateSnoozePayload) {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const url = `${BaseUrl}/api/vip2/create/snooze?snoozeType=${payload.triggerType}`;

	try {
		const res = await axios.post(url, payload, {
			headers: customHeader(token),
		});

		return {
			success: true,
			message: res.data.message,
			status: res.status,
			data: null,
		} as CustomResponse<null>;
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			message: error.response.data
				? error.response.data.message
				: "Something went wrong",
			status: error.status,
			data: null,
		} as CustomResponse<null>;
	}
}

export async function CreateTriggerAlert(payload: CreateTriggerPayload) {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const url = `${BaseUrl}/api/vip2/create?triggerType=${payload.triggerType}`;

	try {
		const res = await axios.post(url, payload, {
			headers: customHeader(token),
		});

		return {
			success: true,
			message: res.data.message,
			status: res.status,
			data: null,
		} as CustomResponse<null>;
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			message: error.response.data
				? error.response.data.message
				: "Something went wrong",
			status: error.status,
			data: null,
		} as CustomResponse<null>;
	}
}

export async function CreateIndicatorAlert(
	payload: CreateIndicatorTriggerPayload
) {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const url = `${BaseUrl}/api/vip3/create`;

	try {
		const res = await axios.post(url, payload, {
			headers: customHeader(token),
		});

		return {
			success: true,
			message: res.data.message,
			status: res.status,
			data: null,
		} as CustomResponse<null>;
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			message: error.response.data
				? error.response.data.message
				: "Something went wrong",
			status: error.status,
			data: null,
		} as CustomResponse<null>;
	}
}

export async function CreateUserIndicatorAlert(
	payload: CreateUserIndicatorPayload
) {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const url = `${BaseUrl}/api/vip3/user-indicators`;

	try {
		const res = await axios.post(url, payload, {
			headers: customHeader(token),
		});

		return {
			success: true,
			message: res.data.message,
			status: res.status,
			data: null,
		} as CustomResponse<null>;
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			message: error.response.data
				? error.response.data.message
				: "Something went wrong",
			status: error.status,
			data: null,
		} as CustomResponse<null>;
	}
}

export async function DeleteTrigger(payload: DeleteTriggerPayload) {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const url = `${BaseUrl}/api/vip2/delete/${payload.symbol}?triggerType=${payload.triggerType}`;

	try {
		const res = await axios.delete(url, {
			headers: customHeader(token),
		});

		return {
			success: true,
			message: res.data.message,
			status: res.status,
			data: null,
		} as CustomResponse<null>;
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			message: error.response.data
				? error.response.data.message
				: "Something went wrong",
			status: error.status,
			data: null,
		} as CustomResponse<null>;
	}
}

export async function DeleteIndicatorTrigger(
	payload: DeleteIndicatorTriggerPayload
) {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const url = `${BaseUrl}/api/vip3/delete/${payload.symbol}`;

	try {
		const res = await axios.delete(url, {
			headers: customHeader(token),
		});

		return {
			success: true,
			message: res.data.message,
			status: res.status,
			data: null,
		} as CustomResponse<null>;
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			message: error.response.data
				? error.response.data.message
				: "Something went wrong",
			status: error.status,
			data: null,
		} as CustomResponse<null>;
	}
}
