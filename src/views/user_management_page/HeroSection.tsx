"use client";

import { useState, useEffect, Fragment } from "react";
import { DetailUserInfo} from "@/src/types/user";
import { AdminOperation } from "@/src/libs";



export default function UserManagementPage() {
  const [users, setUsers] = useState<DetailUserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const adminOperation = new AdminOperation();

  // Lấy danh sách người dùng từ server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await adminOperation.getAllUser();
        if (response.success && response.data) {
          setUsers(response.data);
        } else {
          alert("Không thể lấy danh sách người dùng: " + response.message);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Xóa một người dùng
  const handleDeleteUser = async (username: string) => {
    if (confirm(`Are you sure you want to delete ${username}?`)) {
      try {
        const response = await adminOperation.removeUserByUsername(username);
        if (response.success) {
          setUsers(users.filter((user) => user.username !== username));
          alert(`${username} has been deleted.`);
        } else {
          alert("Lỗi khi xóa người dùng: " + response.message);
        }
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    }
  };

  // Xóa tất cả người dùng
  const handleDeleteAllUsers = async () => {
    if (confirm("Are you sure you want to delete ALL users?")) {
      try {
        const response = await adminOperation.deleteAllUsername();
        if (response.success) {
          setUsers([]);
          alert("All users have been deleted.");
        } else {
          alert("Lỗi khi xóa tất cả người dùng: " + response.message);
        }
      } catch (error) {
        console.error("Lỗi khi xóa tất cả người dùng:", error);
      }
    }
  };
  return (
    <Fragment>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>
        {loading ? (
          <p className="text-center">Đang tải danh sách người dùng...</p>
        ) : (
          <table className="table-auto border-collapse border border-gray-300 w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-center">STT</th>
                <th className="border border-gray-300 p-2 text-center">Name</th>
                <th className="border border-gray-300 p-2 text-center">Email</th>
                <th className="border border-gray-300 p-2 text-center">Username</th>
                <th className="border border-gray-300 p-2 text-center">VIP Role</th>
                <th className="border border-gray-300 p-2 text-center">Coin</th>
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
        )}
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
