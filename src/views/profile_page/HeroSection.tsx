"use client";

import {Fragment, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { sampleUsers, User } from "@/src/types/user";


export default function HeroSection() {


  const searchParams = useSearchParams();
  const username = searchParams.get('username'); // Lấy username từ URL

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (username) {
      const foundUser = sampleUsers.find((u) => u.username === username);
      setUser(foundUser || null);
    }
  }, [username]);

  if (!username) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">
          User not found for username: {username}
        </p>
      </div>
    );
  }

  return (
    <Fragment>
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Profile of {user.name}
        </h1>
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
            <p>{user.coin ?? 'No coins'}</p>
            </div>
            <div>
            <p className="text-gray-600 font-medium">Telegram ID:</p>
            <p>{user.telegram_id}</p>
            </div>
            <div>
            <p className="text-gray-600 font-medium">IP List:</p>
            <ul className="list-disc pl-5">
                {user.ip_list.map((ip, index) => (
                <li key={index}>{ip.join(', ')}</li>
                ))}
            </ul>
            </div>
        </div>
        </div>
    </Fragment>
  );
  
}
