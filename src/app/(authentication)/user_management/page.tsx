"use client";

import Container from "@/src/components/Container";
import { useState, useEffect } from "react";
import { User, sampleUsers } from "@/src/types/user";
import UserProfileModal from "@/src/views/user_profile_modal";




export default function UserManagementPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Đánh dấu đã tải xong trên client
  }, []);

  const handleViewProfile = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  if (!isClient) return null;

  return (
    <Container className="bg-[#DCF0FF]">
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Username</th>
            <th className="border border-gray-300 p-2">VIP Role</th>
            <th className="border border-gray-300 p-2">Coin</th>
            <th className="border border-gray-300 p-2">Telegram ID</th>
            <th className="border border-gray-300 p-2">IP List</th>
            <th className="border border-gray-300 p-2">OTP Code</th>
            <th className="border border-gray-300 p-2">OTP Expiry</th>
            <th className="border border-gray-300 p-2">OTP Expired</th>
          </tr>
        </thead>
        <tbody>
          {sampleUsers.map((user) => (
            <tr key={user.username}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.username}</td>
              <td className="border border-gray-300 p-2">{`VIP${user.vip_role}`}</td>
              <td className="border border-gray-300 p-2">{user.coin ?? "N/A"}</td>
              <td className="border border-gray-300 p-2">{user.telegram_id}</td>
              <td className="border border-gray-300 p-2">
                {user.ip_list.map((ips, index) => (
                  <div key={index}>
                    {ips.join(", ")}
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 p-2">{user.otp.otpCode}</td>
              <td className="border border-gray-300 p-2">{user.otp.expiryDate}</td>
              <td className="border border-gray-300 p-2">{user.otp.expired ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Profile Modal */}
      {selectedUser && isModalOpen && (
        <UserProfileModal
          isOpen={isModalOpen}
          onOpenChange={() => setIsModalOpen(false)}
        />
      )}
    </div>
    </Container>
  );
}
