"use client";

import { useState, Fragment } from "react";
import { DetailUserInfo, sampleUsers } from "@/src/types/user";



export default function UserManagementPage() {
  const [users, setUsers] = useState<DetailUserInfo[]>(sampleUsers);

  // Xóa một người dùng
  const handleDeleteUser = (username: string) => {
    if (confirm(`Are you sure you want to delete ${username}?`)) {
      const updatedUsers = users.filter((user) => user.username !== username);
      setUsers(updatedUsers);
      alert(`${username} has been deleted.`);
    }
  };

  // Xóa tất cả người dùng
  const handleDeleteAllUsers = () => {
    if (confirm("Are you sure you want to delete ALL users?")) {
      setUsers([]); // Xóa toàn bộ danh sách người dùng
      alert("All users have been deleted.");
    }
  };

  return (
    <Fragment>  
      <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>  

     

      
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2 text-center">STT</th>
            <th className="border border-gray-300 p-2 text-center">Name</th>
            <th className="border border-gray-300 p-2 text-center">Email</th>
            <th className="border border-gray-300 p-2 text-center">Username</th>
            <th className="border border-gray-300 p-2 text-center">VIP Role</th>
            <th className="border border-gray-300 p-2 text-center">Coin</th>
            <th className="border border-gray-300 p-2 text-center">Telegram ID</th>
            <th className="border border-gray-300 p-2 text-center">IP List</th>
            <th className="border border-gray-300 p-2 text-center">OTP Code</th>
            <th className="border border-gray-300 p-2 text-center">OTP Expiry</th>
            <th className="border border-gray-300 p-2 text-center">OTP Expired</th>
            <th className="border border-gray-300 p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.username}</td>
                <td className="border border-gray-300 p-2">{user.vip_role}</td>
                <td className="border border-gray-300 p-2">{user.coin}</td>
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
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteUser(user.username)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="border px-4 py-2 text-center">
                Không có người dùng nào!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mb-4">
        <button
          onClick={handleDeleteAllUsers}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Xóa tất cả người dùng
        </button>
      </div>

    </div>
    </Fragment>
  );
}
