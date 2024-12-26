"use server";

import axios from "axios";
import { BaseUrl, customHeader } from "..";
import { cookies } from "next/headers";
import {
  ChangeEmailPayload,
  ChangePasswordPayload,
  DepositCoinPayload,
  PurchaseVIPPayload,
} from "../../types/user";

export async function changePassword(payload: ChangePasswordPayload) {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const url = `${BaseUrl}/api/changePassword`;

	try {
		const res = await axios.put(url, payload, {
			headers: customHeader(token),
		});
		return {
			success: true,
			message: res.data.message,
			status: res.status,
			data: null,
		};
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			message: error.response.data
				? error.response.data.message
				: "Something went wrong",
			status: error.status,
			data: null,
		};
	}
}

export async function changeEmail(payload: ChangeEmailPayload) {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const url = `${BaseUrl}/api/changeEmail?email=${payload.email}`;

	try {
		const res = await axios.put(
			url,
			{},
			{
				headers: customHeader(token),
			}
		);
		return {
			success: true,
			message: res.data.message,
			status: res.status,
			data: null,
		};
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			message: error.response.data
				? error.response.data.message
				: "Something went wrong",
			status: error.status,
			data: null,
		};
	}
}

export async function deposit(payload: DepositCoinPayload) {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const url = `${BaseUrl}/api/deposit?amount=${payload.amount}`;

	try {
		const res = await axios.put(
			url,
			{},
			{
				headers: customHeader(token),
			}
		);
		return {
			success: true,
			message: res.data.message,
			status: res.status,
			data: null,
		};
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			message: error.response.data
				? error.response.data.message
				: "Something went wrong",
			status: error.status,
			data: null,
		};
	}
}

export async function purchaseVIP(payload: PurchaseVIPPayload) {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const url = `${BaseUrl}/api/purchaseVip?vipLevel=${payload.vipLevel}`;

	try {
		const res = await axios.put(
			url,
			{},
			{
				headers: customHeader(token),
			}
		);
		return {
			success: true,
			message: res.data.message,
			status: res.status,
			data: null,
		};
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			message: error.response.data
				? error.response.data.message
				: "Something went wrong",
			status: error.status,
			data: null,
		};
	}
}
