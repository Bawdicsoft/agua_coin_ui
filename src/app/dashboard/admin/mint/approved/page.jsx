"use client";
import {
  agAbi,
  aguaAbi,
  aguaToken,
  auAbi,
  goldToken,
  silverToken,
  usdtAbi,
  usdtToken,
} from "@/content/tokendata";
import { WalletContext } from "@/context/WalletContext";
import { useTheme } from "@/context/ThemeContext";
import axios from "axios";
import { Contract, ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const [purchaseData, setPurchaseData] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const { walletAddress, setWalletAddress, signer, setSigner } =
    useContext(WalletContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getOrderDetails");
        const result = response.data;
        const ordersArray = result.getOrders || [];
        setPurchaseData(ordersArray);
        const PurchaseOrders = ordersArray.filter(
          (u) => u.status === "approved" && u.tokenStatus === "mint"
        );
        setPurchaseData(PurchaseOrders);
        console.log("Fetched orders:", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const { theme } = useTheme();
  return (
    <div className="p-6 overflow-x-auto">
      <table
        className={`min-w-full shadow-lg rounded-lg overflow-hidden
        ${theme === "dark" ? "bg-[#1F1F1F]" : "bg-white"}
      `}
      >
        <thead
          className={`
          ${
            theme === "dark"
              ? "bg-[#262626] text-gray-200"
              : "bg-gray-300 text-gray-700"
          }
          `}
        >
          <tr>
            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Wallet Address</th>
            <th className="py-3 px-4 text-left">Token Type</th>
            <th className="py-3 px-4 text-left">Token Quantity</th>
            <th className="py-3 px-4 text-center">Amount</th>
            <th className="py-3 px-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {purchaseData.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-500">
                No Approved orders found.
              </td>
            </tr>
          ) : (
            purchaseData.map((order) => (
              <tr
                key={order.id}
                className={`border-b transition-all
                  ${theme === "dark" ? "text-gray-300" : "text-gray-600"}
               `}
              >
                <td className="py-3 px-4 text-sm">{order.name}</td>
                <td className="py-3 px-4 text-sm">{order.email}</td>
                <td className="py-3 px-4 text-sm font-mono">{order.from}</td>
                <td className="py-3 px-4">{order.TokenType}</td>
                <td className="py-3 px-4">{order.quantity}</td>
                <td className="py-3 px-4">{order.totalAmount || "N/A"}</td>
                <td className="py-3 px-4">{order.status}</td>
                {/* <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="bg-green-200 hover:bg-green-600 text-gray-700 hover:text-white text-sm font-semibold px-3 py-1 rounded-full"
                      onClick={() => OrderStatus(order, "approved")}
                      disabled={loadingId === order.id}
                    >
                      {loadingId === order.id ? "Processing..." : "Accept"}
                    </button>
                    <button
                      className="bg-red-300 hover:bg-red-600 text-gray-700 hover:text-white text-sm font-semibold px-3 py-1 rounded-full"
                      onClick={() => OrderStatus(order, "rejected")}
                      disabled={loadingId === order.id}
                    >
                      {loadingId === order.id ? "Processing..." : "Reject"}
                    </button>
                  </div>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default page;
