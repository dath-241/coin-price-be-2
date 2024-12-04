"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const deleteUser = async (username: string) => {
  const url = `https://dath.hcmutssps.id.vn//admin/removeUserByUsername?username=${username}`;

  try {
    const res = await axios.delete(url, {
      headers: {
        token: process.env.adminToken,
      },
    });
    const response: CustomResponse<null> = {
      success: true,
      data: null,
      message: res.data.message,
    };
    return response;
  } catch (error: any) {
    console.error(error.data);
    const response: CustomResponse<null> = {
      success: false,
      data: null,
      message: error.data,
    };
    return response;
  }
};

export const test = (message: string) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");

  console.log("Token:", token?.value);
};
