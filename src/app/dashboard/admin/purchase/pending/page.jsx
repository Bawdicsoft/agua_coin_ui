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
import axios from "axios";
import { Contract, ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";

const Pending = () => {
  const [purchaseData, setPurchaseData] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const { walletAddress, setWalletAddress, signer, setSigner } =
    useContext(WalletContext);
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/get-paymentDetail");
      const result = response.data;
      const ordersArray = result.getPaymentDetail || [];
      // setPurchaseData(ordersArray);
      const PurchaseOrders = ordersArray.filter(
        (u) => u.status === "pending" && u.tokenStatus === "purchase"
      );
      setPurchaseData(PurchaseOrders);
      console.log("Fetched orders:", ordersArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const OrderStatus = async (order, key) => {
    console.log("order", order, key);
    if (!signer || !walletAddress) {
      return alert("Kindly connect your wallet first");
    }

    setLoadingId(order._id); // Disable buttons while processing

    try {
      const tokenMap = {
        AU: { address: goldToken, abi: auAbi },
        AG: { address: silverToken, abi: agAbi },
        AGUA: { address: aguaToken, abi: aguaAbi },
      };

      const selected = tokenMap[order.tokenType];
      if (!selected) {
        return alert("Unknown token type");
      }

      const contract = new Contract(selected.address, selected.abi, signer);
      const decimals = await contract.decimals();
      const tokenAmount = ethers.parseUnits(
        order.tokenQuantity.toString(),
        decimals
      );

      if (key === "approved") {
        const balance = await contract.balanceOf(walletAddress);
        if (balance < tokenAmount) {
          return alert("Insufficient token balance in admin wallet");
        }

        const tx = await contract.transfer(order.fromAddress, tokenAmount);
        const receipt = await tx.wait();
        if (!receipt.status) throw new Error("Token transfer failed");
      } else if (key === "rejected") {
        const usdtContract = new Contract(usdtToken, usdtAbi, signer);
        const refundAmount = ethers.parseUnits(order.totalAmount.toString(), 6); // USDT has 6 decimals
        console.log("Refund Amount:", refundAmount.toString());
        const balance = await usdtContract.balanceOf(walletAddress);
        if (balance < refundAmount) {
          return alert("Insufficient USDT balance in admin wallet for refund");
        }

        const tx = await usdtContract.transfer(order.fromAddress, refundAmount);
        const receipt = await tx.wait();
        if (!receipt.status) throw new Error("Refund transaction failed");
      }

      // Log order status update in backend
      const payload = {
        id: order._id,
        userId: order.userId,
        name: order.name,
        email: order.email,
        TokenAddress: selected.address,
        from: walletAddress,
        to: order.fromAddress,
        TokenType: order.tokenType,
        TokenQuantity: order.tokenQuantity,
        tokenStatus: order.tokenStatus,
        status: key,
        totalAmount: order.totalAmount,
      };
      console.log("Payload for Order Status Update:", payload);
      await axios.post("/api/orderDetails", payload);
      if (key === "approved") {
        let message = `Admin transferred ${order.tokenQuantity} ${order.tokenType} Token successfully`;
        axios.post("/api/message", {
          userId: order?.userId,
          message: message,
        });
      } else if (key === "rejected") {
        let message = `Admin Rejected ${order.tokenQuantity} ${order.tokenType} Token request `;
        axios.post("/api/message", {
          userId: order?.userId,
          message: message,
        });
      }

      // alert(`Order ${key} successfully`);

      // Refresh data
      fetchData();
      setPurchaseData((prev) => prev.filter((o) => o.id !== order._id));
    } catch (err) {
      console.error("Error processing order:", err);
      alert(
        `Transaction failed: ${err?.reason || err?.message || "Unknown error"}`
      );
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6 overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-300 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">S.No</th>
            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Wallet Address</th>
            <th className="py-3 px-4 text-left">Token Type</th>
            <th className="py-3 px-4 text-left">Token Quantity</th>
            <th className="py-3 px-4 text-center">Amount</th>
            <th className="py-3 px-4 text-center">Status</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {purchaseData.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-500">
                No pending orders found.
              </td>
            </tr>
          ) : (
            purchaseData.map((order, index) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {order.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {order.email}
                </td>
                <td className="py-3 px-4 text-sm font-mono text-gray-500">
                  {order.fromAddress}
                </td>
                <td className="py-3 px-4 text-gray-600">{order.tokenType}</td>
                <td className="py-3 px-4 text-gray-700">
                  {order.tokenQuantity}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {order.totalAmount || "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-700">{order.status}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="bg-green-200 hover:bg-green-600 text-gray-700 hover:text-white text-sm font-semibold px-3 py-1 rounded-full"
                      onClick={() => OrderStatus(order, "approved")}
                      disabled={loadingId === order._id}
                    >
                      {loadingId === order._id ? "Processing..." : "Accept"}
                    </button>
                    <button
                      className="bg-red-300 hover:bg-red-600 text-gray-700 hover:text-white text-sm font-semibold px-3 py-1 rounded-full"
                      onClick={() => OrderStatus(order, "rejected")}
                      disabled={loadingId === order._id}
                    >
                      {loadingId === order._id ? "Processing..." : "Reject"}
                    </button>
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

export default Pending;
