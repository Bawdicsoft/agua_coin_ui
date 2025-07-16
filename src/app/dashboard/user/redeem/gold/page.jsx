"use client";
import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { WalletContext } from "@/context/WalletContext";
import { Contract, ethers } from "ethers";
import { adminAddress, auAbi, goldToken } from "@/content/tokendata";
import { useTheme } from "@/context/ThemeContext";

export default function Goldredeem() {
  const [totalAmount, setTotalAmount] = useState("");
  const [numTokens, setNumTokens] = useState("");
  const [goldRates, setGoldRates] = useState({
    ounce: 0,
    gram: 0,
    loading: true,
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [clientId, setClientId] = useState("");
  const [selectedToken, setSelectedToken] = useState("AU");
  const { signer, walletAddress } = useContext(WalletContext);
  const { theme } = useTheme();
  const OUNCE_TO_GRAM = 31.1035;

  useEffect(() => {
    const fetchGoldRate = async () => {
      try {
        setGoldRates({ ounce: 0, gram: 0, loading: true });
        const goldRes = await fetch("https://api.gold-api.com/price/XAU");
        if (!goldRes.ok) throw new Error("Failed to fetch gold rate");
        const goldData = await goldRes.json();
        const ouncePrice = goldData.price;
        const gramPrice = ouncePrice / OUNCE_TO_GRAM;
        setGoldRates({
          ounce: ouncePrice.toFixed(2),
          gram: gramPrice.toFixed(2),
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching gold rates:", error);
        setGoldRates({ ounce: 0, gram: 0, loading: false });
      }
    };
    fetchGoldRate();
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("No authToken found in localStorage.");
      return null;
    }
    const decodedToken = jwtDecode(token);
    setClientId(decodedToken?.id);
  }, []);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const sendToken = async (e) => {
    e.preventDefault();
    if (!signer || !walletAddress) {
      return alert("Kindly connect your wallet first");
    }
    try {
      const contract = new Contract(goldToken, auAbi, signer);
      // const decimals = 18; // adjust if needed
      const decimals = await contract.decimals(); // example: 18
      const tokenAmount = ethers.parseUnits(numTokens.toString(), decimals);
      console.log("Parsed token amount:", numTokens.toString());
      const tx = await contract.transfer(adminAddress, tokenAmount);
      const receipt = await tx.wait(); // waits for block confirmation

      console.log("Transaction sent. Hash:", tx.hash);
      if (!receipt.status) {
        throw new Error("Blockchain transaction failed (reverted).");
      }
      const payload = {
        id: clientId,
        TokenAddress: goldToken,
        from: walletAddress,
        to: adminAddress,
        TokenType: selectedToken,
        TotalQuantity: numTokens,
        totalAmount: totalAmount,
        tokenStatus: "pending",
        currentRate: goldRates.gram,
        transactionHash: tx.hash,
        paymentMethod: "MetaMask",
      };

      const response = await axios.post("/api/redeemTokens", payload);

      console.log("token sendSuccessfully:", response.data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <>
      <div
        className={`max-w-3xl mx-auto p-6 font-lora rounded-2xl shadow-lg border mt-8 transition-colors
          ${
            theme === "dark"
              ? "bg-neutral-900 border-neutral-800 text-neutral-100"
              : "bg-white border-neutral-200 text-neutral-900"
          }
        `}
      >
        <div className="flex items-center justify-center mb-8">
          <h1
            className={`text-4xl font-extrabold text-center mb-0 tracking-tight
            ${theme === "dark" ? "text-neutral-100" : "text-neutral-900"}
          `}
          >
            Redeem Gold Tokens
          </h1>
        </div>

        {/* Display Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <InfoCard
            label="User ID"
            value={
              clientId && clientId.length > 8
                ? `${clientId.slice(0, 4)}...${clientId.slice(-4)}`
                : clientId || "-"
            }
            theme={theme}
          />
          <InfoCard
            label="Current AU Rate oz"
            value={goldRates.loading ? "Loading..." : `$${goldRates.ounce}`}
            theme={theme}
          />
          <InfoCard
            label="Token Rate (per gram)"
            value={goldRates.loading ? "Loading..." : `$${goldRates.gram}`}
            theme={theme}
          />
        </div>

        {/* Summary Box */}
        <div
          className={`rounded-lg p-4 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm border transition-colors
          ${
            theme === "dark"
              ? "bg-neutral-800 border-neutral-700"
              : "bg-neutral-50 border-neutral-200"
          }
        `}
        >
          <div className="flex-1 flex justify-between items-center flex-col md:flex-row md:items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Tokens:</span>
              <span className="text-lg font-bold">{numTokens || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold md:ml-6">Total (USD):</span>
              <span className="text-lg font-bold">${totalAmount || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold md:ml-6">Rate/gram:</span>
              <span className="text-lg font-bold">${goldRates.gram || 0}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Number of Tokens */}
          <div
            className={`shadow rounded-xl p-6 border flex flex-col gap-2 transition-colors
            ${
              theme === "dark"
                ? "bg-neutral-900 border-neutral-700"
                : "bg-white border-neutral-100"
            }
          `}
          >
            <label className="text-sm font-semibold">Number of Tokens</label>
            <input
              type="text"
              value={numTokens}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9.]/g, "");
                const parts = value.split(".");
                if (parts.length > 2) {
                  value = parts[0] + "." + parts.slice(1).join("");
                }
                setNumTokens(value);
                setTotalAmount(
                  (
                    parseFloat(value || 0) * parseFloat(goldRates.gram || 0)
                  ).toFixed(2)
                );
              }}
              onPaste={(e) => {
                const paste = e.clipboardData.getData("text");
                if (!/^[0-9]*\.?[0-9]*$/.test(paste)) {
                  e.preventDefault();
                }
              }}
              inputMode="decimal"
              autoComplete="off"
              className={`mt-1 w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition
                ${
                  theme === "dark"
                    ? "bg-neutral-800 border-neutral-700 text-neutral-100 focus:ring-neutral-600 focus:border-neutral-600"
                    : "bg-neutral-50 border-neutral-200 text-neutral-900 focus:ring-neutral-300 focus:border-neutral-300"
                }
              `}
              placeholder="Enter number of tokens"
            />
          </div>

          {/* Total Amount in USD */}
          <div
            className={`shadow rounded-xl p-6 border flex flex-col gap-2 transition-colors
            ${
              theme === "dark"
                ? "bg-neutral-900 border-neutral-700"
                : "bg-white border-neutral-100"
            }
          `}
          >
            <label className="text-sm font-semibold">Total Amount (USD)</label>
            <input
              type="text"
              value={totalAmount}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9.]/g, "");
                const parts = value.split(".");
                if (parts.length > 2) {
                  value = parts[0] + "." + parts.slice(1).join("");
                }
                setTotalAmount(value);
                setNumTokens(
                  (
                    parseFloat(value || 0) / parseFloat(goldRates.gram || 1)
                  ).toFixed(4)
                );
              }}
              onPaste={(e) => {
                const paste = e.clipboardData.getData("text");
                if (!/^[0-9]*\.?[0-9]*$/.test(paste)) {
                  e.preventDefault();
                }
              }}
              inputMode="decimal"
              autoComplete="off"
              className={`mt-1 w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition
                ${
                  theme === "dark"
                    ? "bg-neutral-800 border-neutral-700 text-neutral-100 focus:ring-neutral-600 focus:border-neutral-600"
                    : "bg-neutral-50 border-neutral-200 text-neutral-900 focus:ring-neutral-300 focus:border-neutral-300"
                }
              `}
              placeholder="Enter total amount"
            />
          </div>
        </div>

        <button
          className={`
            w-full py-3 px-6 rounded-xl font-semibold text-white
            bg-gradient-to-r from-neutral-600 to-neutral-700
            hover:from-neutral-700 hover:to-neutral-800
            focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2
            transition-all duration-200 ease-in-out
            disabled:opacity-50 disabled:cursor-not-allowed
            ${!numTokens || !totalAmount ? "opacity-50 cursor-not-allowed" : ""}
          `}
          onClick={sendToken}
          disabled={!numTokens || !totalAmount}
        >
          Redeem Tokens
        </button>
      </div>
    </>
  );
}

const InfoCard = ({ label, value, theme }) => (
  <div
    className={`shadow rounded-xl p-4 border flex flex-col items-center transition-colors
    ${
      theme === "dark"
        ? "bg-neutral-900 border-neutral-700 text-neutral-100"
        : "bg-white border-neutral-100 text-neutral-900"
    }
  `}
  >
    <label className="text-xs font-semibold mb-1">{label}</label>
    <div className="text-lg font-bold">{value}</div>
  </div>
);
