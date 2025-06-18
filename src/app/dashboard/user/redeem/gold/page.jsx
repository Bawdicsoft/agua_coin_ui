"use client";
import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { WalletContext } from "@/context/WalletContext";
import { Contract } from "ethers";
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
      const decimals = 18; // adjust if needed
      const tokenAmount = ethers.parseUnits(totalAmount.toString(), decimals);
      console.log("Parsed token amount:", tokenAmount.toString());
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
        TotalQuantity: numTokens, // Make sure this key exists in your order object
        totalAmount: totalAmount,
        tokenStatus: "pending",
        currentRate: goldRates.gram,
        transactionHash: tx.hash,
        paymentMethod: "MetaMask",
      };

      const response = await axios.post("/api/redeemTokens", payload);

      console.log("token sendSuccessfully:", response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div
        className="max-w-3xl mx-auto p-6 font-lora rounded-2xl shadow-lg border mt-8 transition-colors bg-white dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100"
      >
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-tight dark:text-neutral-100 text-neutral-900">
          Redeem Gold Tokens
        </h1>
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <InfoCard label="User ID" value={
            clientId && clientId.length > 8
              ? `${clientId.slice(0, 4)}...${clientId.slice(-4)}`
              : clientId || "-"
          } theme={theme} />
          <InfoCard label="Current AU Rate (oz)" value={goldRates.loading ? "Loading..." : `$${goldRates.ounce}`} theme={theme} />
          <InfoCard label="Token Rate (per gram)" value={goldRates.loading ? "Loading..." : `$${goldRates.gram}`} theme={theme} />
        </div>
        {/* Dual Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`shadow rounded-xl p-6 border flex flex-col gap-2 transition-colors
            ${theme === "dark" ? "bg-neutral-800 border-neutral-700" : "bg-neutral-50 border-neutral-200"}
          `}>
            <label className="text-sm font-semibold">Number of Tokens</label>
            <input
              type="text"
              value={numTokens}
              onChange={e => {
                let value = e.target.value.replace(/[^0-9.]/g, '');
                const parts = value.split('.');
                if (parts.length > 2) {
                  value = parts[0] + '.' + parts.slice(1).join('');
                }
                setNumTokens(value);
                setTotalAmount(
                  (
                    parseFloat(value || 0) * parseFloat(goldRates.gram || 0)
                  ).toFixed(2)
                );
              }}
              onPaste={e => {
                const paste = e.clipboardData.getData('text');
                if (!/^[0-9]*\.?[0-9]*$/.test(paste)) {
                  e.preventDefault();
                }
              }}
              inputMode="decimal"
              autoComplete="off"
              className={`mt-1 w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition
                ${theme === "dark"
                  ? "bg-neutral-900 border-neutral-700 text-neutral-100 focus:ring-neutral-600"
                  : "bg-neutral-50 border-neutral-200 text-neutral-900 focus:ring-neutral-300"}
              `}
              placeholder="Enter number of tokens"
            />
          </div>
          <div className={`shadow rounded-xl p-6 border flex flex-col gap-2 transition-colors
            ${theme === "dark" ? "bg-neutral-800 border-neutral-700" : "bg-neutral-50 border-neutral-200"}
          `}>
            <label className="text-sm font-semibold">Total Amount (USD)</label>
            <input
              type="number"
              value={totalAmount}
              onChange={e => {
                const value = e.target.value;
                setTotalAmount(value);
                setNumTokens(
                  (
                    parseFloat(value || 0) / parseFloat(goldRates.gram || 1)
                  ).toFixed(4)
                );
              }}
              className={`mt-1 w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition
                ${theme === "dark"
                  ? "bg-neutral-900 border-neutral-700 text-neutral-100 focus:ring-neutral-600"
                  : "bg-neutral-50 border-neutral-200 text-neutral-900 focus:ring-neutral-300"}
              `}
              placeholder="Enter total amount"
            />
          </div>
        </div>
        <button
          className={`mt-2 px-6 py-2 rounded-lg text-base font-bold shadow transition
            ${theme === "dark"
              ? "bg-neutral-700 text-neutral-100 hover:bg-neutral-600"
              : "bg-neutral-200 text-neutral-900 hover:bg-neutral-300"}
          `}
          onClick={sendToken}
        >
          Redeem Token
        </button>
      </div>
    </>
  );
}

const InfoCard = ({ label, value, theme }) => (
  <div className={`shadow rounded-xl p-4 border flex flex-col items-center transition-colors
    ${
      theme === "dark"
        ? "bg-neutral-900 border-neutral-700 text-neutral-100"
        : "bg-white border-neutral-100 text-neutral-900"
    }
  `}>
    <label className="text-xs font-semibold mb-1">{label}</label>
    <div className="text-lg font-bold">{value}</div>
  </div>
);

// Stripe Payment UI
const StripeAsset = ({ totalAmount }) => (
  <div className="rounded-md border p-4 shadow-sm bg-white">
    <p className="text-sm text-gray-600 font-semibold">Stripe Selected</p>
    <p className="text-sm text-gray-500">
      You will be redirected to Stripe to complete the payment of{" "}
      <strong>${totalAmount}</strong>.
    </p>
    <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded text-sm">
      Pay with Stripe
    </button>
  </div>
);

// Crypto Payment UI
const CryptoAsset = ({ totalAmount }) => (
  <div className="rounded-md border p-4 shadow-sm bg-white">
    <p className="text-sm text-gray-600 font-semibold">Crypto Wallet</p>
    <p className="text-sm text-gray-500">
      Connect your wallet to pay <strong>${totalAmount}</strong> in crypto.
    </p>
    <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded text-sm">
      Connect Wallet
    </button>
  </div>
);
