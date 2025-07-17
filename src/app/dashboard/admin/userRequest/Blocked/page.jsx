"use client";
import axios from "axios";
import { Contract, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // ✅ Add this line
const Blacklisted = () => {
  const [userData, setUserData] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/auth/get-account");
        const result = response.data;
        console.log("Fetched User Data", result);
        const usersArray = result.users || [];
        // setPurchaseData(ordersArray);
        const userDetails = usersArray.filter(
          (u) => u.status === "block" && u.role === "user"
        );
        setUserData(userDetails);
        console.log("Fetched users:", usersArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const UserStatus = async (user, status) => {
    console.log(user, status);
    try {
      axios.post("/api/auth/update-user-status", {
        userId: user._id,
        status: status,
      });
      setUserData((prevUsers) =>
        prevUsers.map((u) =>
          u._id === user._id ? { ...u, status: status } : u
        )
      );
    } catch (error) {}
  };
  return (
    <div className="p-6 overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-300 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">S.No</th>
            <th className="py-3 px-4 text-left">Profile</th>

            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-left">Email</th>

            <th className="py-3 px-4 text-center">role</th>

            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            userData.map((user, index) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  <Image
                    src={user.profilePicture}
                    alt="User Image"
                    width={40}
                    height={20}
                    className="rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{user.name}</td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="py-3 px-4 text-gray-700">{user.role}</td>

                {/* <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {user.status === "unblock" ? (
                      <button
                        className="bg-red-200 hover:bg-red-600 text-gray-700 hover:text-white text-sm font-semibold px-3 py-1 rounded-full"
                        onClick={() => UserStatus(user, "block")}
                        disabled={loadingId === user._id}
                      >
                        {loadingId === user._id ? "Processing..." : "block"}
                      </button>
                    ) : (
                      <button
                        className="bg-green-300 hover:bg-green-600 text-gray-700 hover:text-white text-sm font-semibold px-3 py-1 rounded-full"
                        onClick={() => UserStatus(user, "unblock")}
                        disabled={loadingId === user._id}
                      >
                        {loadingId === user._id ? "Processing..." : "unblock"}
                      </button>
                    )}
                  </div>
                </td> */}
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {user.status === "block" ? (
                      <button
                        className="bg-green-200 hover:bg-green-600 text-gray-700 hover:text-white text-sm font-semibold px-3 py-1 rounded-full"
                        onClick={() => UserStatus(user, "unblock")}
                        disabled={loadingId === user._id}
                      >
                        {loadingId === user._id ? "Processing..." : "unblock"}
                      </button>
                    ) : (
                      <button
                        className="bg-gray-300 text-gray-500 text-sm font-semibold px-3 py-1 rounded-full cursor-not-allowed"
                        disabled
                      >
                        UnBlocked
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Blacklisted;
