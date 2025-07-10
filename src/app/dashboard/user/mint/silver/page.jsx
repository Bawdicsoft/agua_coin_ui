"use client";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { jwtDecode } from "jwt-decode";
import { WalletContext } from "@/context/WalletContext";
import { AuthContext } from "@/context/AuthContext";

export default function Silvermint() {
  const [totalAmount, setTotalAmount] = useState("");
  const [numTokens, setNumTokens] = useState("");
  // const totalAmount = numTokens ? (numTokens * silverRates.gram).toFixed(2) : 0;
  const { auth, setAuth } = useContext(AuthContext);

  const [silverRates, setSilverRates] = useState({
    ounce: 0,
    gram: 0,
    loading: true,
  });
  const { theme } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [clientId, setClientId] = useState("");
  const { walletAddress, signer } = useContext(WalletContext);
  const OUNCE_TO_GRAM = 31.1035;

  useEffect(() => {
    const fetchSilverRate = async () => {
      try {
        setSilverRates({ ounce: 0, gram: 0, loading: true });

        const res = await fetch("https://api.gold-api.com/price/XAG");
        console.log("res=>", res);
        if (!res.ok) throw new Error("Failed to fetch silver rate");

        const data = await res.json();
        const ouncePrice = data.price;
        const gramPrice = ouncePrice / OUNCE_TO_GRAM;

        setSilverRates({
          ounce: ouncePrice.toFixed(2),
          gram: gramPrice.toFixed(2),
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching silver rates:", error);
        setSilverRates({ ounce: 0, gram: 0, loading: false });
      }
    };

    fetchSilverRate();
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No authToken found in localStorage.");
      return null;
    }
    // // console.log(token);
    const decodedToken = jwtDecode(token);
    const userId = decodedToken?.id;
    setClientId(userId);
    // // console.log("decodedToken=>", decodedToken);
    setAuth((prev) => ({
      ...prev,
      isLoggedIn: true,
      token,
      user: { id: userId }, // if no full user object available
    }));
    // console.log("Signer=>", signer);
    // console.log("WalletAddress=>", walletAddress);
  }, [signer]);

  const handlePaymentMethodChange = (e) => {
    if (!signer || !walletAddress) {
      showToast({ message: "Kindly connect your wallet first", type: "error" });
      return;
    }
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No authToken found in localStorage.");
      return null;
    }
    console.log(token);
    const decodedToken = jwtDecode(token);
    console.log(decodedToken, "decodedToken");
    setClientId(decodedToken?.id);
    console.log(clientId, "decodedid");
  });
  const stripeCheckout = () => {
    axios
      .post("/api/stripe-checkout", {
        type: "Silver",
        userId: clientId,
        tokens: numTokens,
        gramRate: silverRates.gram,
        amount: totalAmount,
        paymentMethod: paymentMethod,
        status: "mint",
      })
      .then((response) => {
        router.push(response?.data?.message?.url);
      })
      .catch((error) => {
        console.error("Stripe checkout error:", error);
      });
  };

  return (
    <>
      <div
        className={`max-w-3xl mx-auto p-6 font-lora rounded-2xl shadow-lg border my-8 transition-colors
          ${
            theme === "dark"
              ? "bg-neutral-900 border-neutral-800 text-neutral-100"
              : "bg-white border-neutral-200 text-neutral-900"
          }`}
      >
        <div className="flex items-center justify-center mb-8">
          <h1
            className={`text-4xl font-extrabold text-center mb-0 tracking-tight
              ${theme === "dark" ? "text-neutral-100" : "text-neutral-900"}`}
          >
            Mint Silver Tokens
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
            label="Current AG Rate oz"
            value={silverRates.loading ? "Loading..." : `$${silverRates.ounce}`}
            theme={theme}
          />
          <InfoCard
            label="Token Rate (per gram)"
            value={silverRates.loading ? "Loading..." : `$${silverRates.gram}`}
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
            }`}
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
              <span className="text-lg font-bold">
                ${silverRates.gram || 0}
              </span>
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
              }`}
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
                  (parseFloat(value || 0) * parseFloat(silverRates.gram || 0)).toFixed(
                    2
                  )
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
              className={`mt-1 w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition
                ${
                  theme === "dark"
                    ? "bg-neutral-800 border-neutral-700 text-neutral-100 focus:ring-neutral-600 shadow-inner"
                    : "bg-neutral-100 border border-neutral-300 text-neutral-900 focus:ring-neutral-300 shadow-inner"
                }`}
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
              }`}
          >
            <label className="text-sm font-semibold">Total Amount (USD)</label>
            <input
              type="number"
              value={totalAmount || ""}
              placeholder="Enter total amount"
              onChange={(e) => {
                const value = e.target.value;
                setTotalAmount(value);
                setNumTokens(
                  (parseFloat(value || 0) / parseFloat(silverRates.gram || 1)).toFixed(
                    4
                  )
                );
              }}
              className={`mt-1 w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition
    ${
      theme === "dark"
        ? "bg-neutral-800 border-neutral-700 text-neutral-100 focus:ring-neutral-600 shadow-inner"
        : "bg-neutral-100 border border-neutral-300 text-neutral-900 focus:ring-neutral-300 shadow-inner"
    }`}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-1">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-1">
              {[
                {
                  label: "Stripe",
                  value: "stripe",
                  icon: "/icons/stripe-icon.png",
                },
                {
                  label: "Crypto",
                  value: "crypto",
                  icon: "/icons/crypto-icon.png",
                },
              ].map(({ label, value, icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPaymentMethod(value)}
                  className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl border shadow-sm transition font-semibold w-full
                      ${
                        paymentMethod === value
                          ? "ring-2 ring-blue-500"
                          : "hover:ring-1 hover:ring-gray-400"
                      }
                    `}
                >
                  <img src={icon} alt={label} className="w-10 h-10" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Asset Display */}
          {paymentMethod === "stripe" && (
            <StripeAsset
              totalAmount={totalAmount}
              stripeCheckout={stripeCheckout}
            />
          )}

          {/* Crypto Token Selection */}
          {paymentMethod === "crypto" && (
            <div
              className={`border rounded-xl p-6 mt-2 transition-colors ${
                theme === "dark"
                  ? "bg-neutral-900 border-neutral-700"
                  : "bg-white border-neutral-100"
              }`}
            >
              <label className="block text-sm font-bold mb-2">
                Select Crypto Token
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {["eth", "usdt_eth", "matic", "usdt_polygon", "btc"].map(
                  (token) => {
                    const labelMap = {
                      eth: "Ether (Ethereum)",
                      usdt_eth: "USDT (Ethereum)",
                      matic: "Matic (Polygon)",
                      usdt_polygon: "USDT (Polygon)",
                      btc: "Bitcoin (BTC Network)",
                    };
                    const iconMap = {
                      eth: "/icons/eth-icon.png",
                      usdt_eth: "/icons/usdt-icon.png",
                      matic: "/icons/matic-logo.png",
                      usdt_polygon: "/icons/USDT (Polygon).png",
                      btc: "/icons/Bitcoin (BTC Network).png",
                    };

                    return (
                      <button
                        key={token}
                        type="button"
                        className={`flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-xl border shadow-sm transition font-medium w-full
                          ${
                            theme === "dark"
                              ? "bg-neutral-800 border-neutral-700 text-neutral-100"
                              : "bg-neutral-50 border-neutral-200 text-neutral-900 hover:ring-2 hover:ring-green-500"
                          }`}
                      >
                        <img
                          src={iconMap[token]}
                          alt={labelMap[token]}
                          className="w-10 h-10"
                        />
                        {labelMap[token]}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>
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
      }`}
  >
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
