export const BaseUrl = "https://dath.hcmutssps.id.vn";

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
