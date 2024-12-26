"use server";

import axios from "axios";
import {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SignupPayload,
} from "@/src/types/user";
import { BaseUrl, customHeader } from "..";
import { cookies } from "next/headers";

export async function signin(
	identifier: string,
	password: string,
	signinType: string
) {
	let url = "";
	let payload = {};
	if (signinType == "email") {
		url = `${BaseUrl}/auth/loginWithEmail`;
		payload = {
			email: identifier,
			password: password,
		};
	} else if (signinType == "username") {
		url = `${BaseUrl}/auth/login`;
		payload = {
			username: identifier,
			password: password,
		};
	}
	try {
		const res = await axios.put(url, payload, {
			headers: customHeader(null),
		});

		console.log(res);

		const headers = res.headers["set-cookie"];
		if (!headers) {
			return {
				success: false,
				message: "Something went wrong",
				status: 404,
				data: null,
			} as CustomResponse<null>;
		}

		const token = headers[0].split(";")[0].split("=")[1];
		const cookieStore = cookies();
		cookieStore.set("token", token, {
			path: "/",
			sameSite: "none",
			httpOnly: true,
			secure: true,
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

export async function signout() {
	const cookieStore = cookies();
	cookieStore.delete("token");
}

export async function signup(payload: SignupPayload) {
	const url = `${BaseUrl}/auth/register`;

	try {
		const res = await axios.post(url, payload, {
			headers: customHeader(null),
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
		const cookieStore = cookies();
		cookieStore.set("token", newToken, {
			path: "/",
			sameSite: "none",
			httpOnly: true,
			secure: true,
		});
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
			message: error.response.data
				? error.response.data.message
				: "Something went wrong",
			status: error.status,
			data: null,
		} as CustomResponse<null>;
	}
}

export async function forgotPassword(payload: ForgotPasswordPayload) {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	const url = `${BaseUrl}/auth/forgotPassword?email=${payload.email}`;
	try {
		const res = await axios.get(url, {
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

export async function resetPassword(payload: ResetPasswordPayload) {
	const url = `${BaseUrl}/auth/resetPassword?email=${payload.email}&otpCode=${payload.otp}`;
	const newPayload = {
		newPassword: payload.newPassword,
	};
	try {
		const res = await axios.put(url, newPayload, {
			headers: customHeader(null),
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
