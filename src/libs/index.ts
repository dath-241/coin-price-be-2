export const BaseUrl = "https://a2-price.thuanle.me";

export function customHeader(token: string | null | undefined) {
	if (!token) {
		return {
			"Content-Type": "application/json",
		};
	}
	return {
		"Content-Type": "application/json",
		Cookie: `token=${token}`,
	};
}
