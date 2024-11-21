"use client";
import { Avatar } from "@nextui-org/react";
import { At, Envelope, Wallet } from "@phosphor-icons/react";

import Container from "@/src/components/Container";
import {useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sampleUsers, User, Role } from "@/src/types/user";

const renderVipRole = (vipRole: Role) => {
  switch (vipRole) {
    case Role.VIP0:
      return "VIP0";
    case Role.VIP1:
      return "VIP1";
    case Role.VIP2:
      return "VIP2";
    case Role.VIP3:
      return "VIP3";
    default:
      return "Unknown";
  }
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Xác nhận rằng đang chạy trên phía client
  }, []);

  if (!isClient) {
    return null; // Tránh render bất kỳ logic nào liên quan đến `useRouter` trên server
  }

  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    if (username) {
      const foundUser = sampleUsers.find((u) => u.username === username);
      setUser(foundUser || null);
    }
  }, [username]);

  if (!username) {
    return <div className="p-6">Error: Username is required</div>;
  }

  if (!user) {
    return <div className="p-6">Error: User not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <div className="flex items-center gap-6">
        <Avatar src="/user.svg" isBordered color="default" size="lg" />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>
      <div className="mt-6">
        <p className="flex items-center gap-2">
          <At size={20} /> <span>{user.username}</span>
        </p>
        <p className="flex items-center gap-2">
          <Envelope size={20} /> <span>{user.email}</span>
        </p>
        <p className="flex items-center gap-2 text-green-500">
          <Wallet size={20} /> <span>{user.coin || 0}</span>
        </p>
        <p className="mt-2 font-bold">VIP Role: {renderVipRole(user.vip_role)}</p>
      </div>
    </div>
  );
}
