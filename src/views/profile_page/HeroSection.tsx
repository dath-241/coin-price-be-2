"use client";

import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UserOperation } from "@/src/libs";
import { DetailUserInfo, ChangePasswordPayload, ChangeEmailPayload, DepositCoinPayload, PurchaseVIPPayload } from "@/src/types/user";

const userOperation = new UserOperation();



export default function HeroSection() {


  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const [user, setUser] = useState<DetailUserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await userOperation.getUserInfo();
        if (response.success && response.data) {
          setUser(response.data as DetailUserInfo);
        } else {
          setError(response.message || "Unable to fetch user info.");
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("An unexpected error occurred.");
      }
    }

    fetchUserInfo();
  }, [username]);

  async function handleChangePassword(newPassword: string) {
    const payload: ChangePasswordPayload = { newPassword };
    const response = await userOperation.changePassword(payload);
    if (!response.success) {
      setError(response.message);
    } else {
      alert("Password changed successfully.");
    }
  }

  async function handleChangeEmail(newEmail: string) {
    const payload: ChangeEmailPayload = { email: newEmail };
    const response = await userOperation.changeEmail(payload);
    if (!response.success) {
      setError(response.message);
    } else {
      alert("Email changed successfully.");
    }
  }

  async function handleDepositCoin(amount: number) {
    const payload: DepositCoinPayload = { amount };
    const response = await userOperation.depositCoin(payload);
    if (!response.success) {
      setError(response.message);
    } else {
      alert(`Deposited ${amount} coins successfully.`);
    }
  }

  async function handlePurchaseVIP(vipLevel: number) {
    const payload: PurchaseVIPPayload = { vipLevel };
    const response = await userOperation.purchaseVIP(payload);
    if (!response.success) {
      setError(response.message);
    } else {
      alert(`Purchased VIP${vipLevel} successfully.`);
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }


  return (
    <Fragment>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile of {user.name}</h1>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 font-medium">Email:</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Username:</p>
            <p>{user.username}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">VIP Role:</p>
            <p>VIP{user.vip_role}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Coins:</p>
            <p>{user.coin ?? "No coins"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Telegram ID:</p>
            <p>{user.telegram_id}</p>
          </div>
          <div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => handleChangePassword("newSecurePassword")}
            >
              Change Password
            </button>
          </div>
          <div>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => handleDepositCoin(100)}
            >
              Deposit Coins
            </button>
          </div>
          <div>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded"
              onClick={() => handlePurchaseVIP(2)}
            >
              Purchase VIP2
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
  
}
