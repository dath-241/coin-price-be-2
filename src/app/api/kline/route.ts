import axios from "axios";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { BaseUrl, customHeader } from "@/src/libs";

export async function GET(req: NextRequest): Promise<Response> {
	let token = cookies().get("token")?.value;
	try {
		// Retrieve the token from cookies

		if (!token) {
			return new Response("Unauthorized: Token is missing", {
				status: 401,
			});
		}

		const res = await refreshToken();
		if (!res.success) {
			return new Response("Unauthorized: Token is missing", {
				status: 401,
			});
		}
		token = res.data;

		if (!token) {
			return new Response("Unauthorized: Token is missing", {
				status: 401,
			});
		}

		const { searchParams } = new URL(req.url);
		const symbols = searchParams.get("symbols");

		if (!symbols) {
			return new Response("Bad Request: Missing symbols", {
				status: 400,
			});
		}

		const response = await axios({
			method: "get",
			url: `${BaseUrl}/api/vip1/get-kline?symbols=${symbols}`,
			responseType: "stream",
			headers: {
				Connection: "keep-alive",
				"Cache-Control": "no-cache",
				"Content-Type": "text/event-stream",
				Cookie: `token=${token}`,
			},
		});

		// Forward the SSE stream to the client
		const readable = new ReadableStream({
			start(controller) {
				response.data.on("data", (chunk: Buffer) => {
					controller.enqueue(chunk); // Forward each chunk to the client
				});

				response.data.on("end", () => {
					controller.close(); // End the client stream
				});

				response.data.on("error", (err: Error) => {
					controller.error(err); // Forward errors to the client
				});
			},
			cancel() {
				response.data.destroy(); // Clean up on client disconnect
			},
		});

		return new Response(readable, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});
	} catch (error: any) {
		console.error("Error forwarding SSE:", error);
		return new Response("Failed to fetch SSE stream", { status: 500 });
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
				data: "",
			} as CustomResponse<string>;
		}
		const newToken = headers[0].split(";")[0].split("=")[1];
		if (!newToken) {
			return {
				success: false,
				message: "Something went wrong",
				status: 404,
				data: "",
			} as CustomResponse<string>;
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
			data: "",
		} as CustomResponse<string>;
	}
}
