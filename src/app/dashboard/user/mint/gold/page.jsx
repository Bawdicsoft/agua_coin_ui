"use client";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { jwtDecode } from "jwt-decode";
import { WalletContext } from "@/context/WalletContext";
import { AuthContext } from "@/context/AuthContext";
import { Contract, ethers } from "ethers";
import { adminAddress, usdtAbi, usdtToken } from "@/content/tokendata";
import axios from "axios";
import { useRouter } from "next/navigation";
import { fetchUserData } from "@/app/dashboard/admin/page";

export default function Goldmint() {
  const [totalAmount, setTotalAmount] = useState("");
  const [numTokens, setNumTokens] = useState("");
  // const totalAmount = numTokens ? (numTokens * goldRates.gram).toFixed(2) : 0;
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  const [goldRates, setGoldRates] = useState({
    ounce: 0,
    gram: 0,
    loading: true,
  });
  const { theme } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [clientId, setClientId] = useState("");
  const [selectedToken, setSelectedToken] = useState("AU"); // NEW

  const { walletAddress, signer } = useContext(WalletContext);
  const OUNCE_TO_GRAM = 31.1035;
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUserData(setUser);
    console.log("user", user);

    const fetchGoldRate = async () => {
      try {
        setGoldRates({ ounce: 0, gram: 0, loading: true });

        const res = await fetch("https://api.gold-api.com/price/XAU");
        console.log("res=>", res);
        if (!res.ok) throw new Error("Failed to fetch gold rate");

        const data = await res.json();
        const ouncePrice = data.price;
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
    if (!signer || !walletAddress) {
      return alert("Kindly connect your wallet first");
    } else if (user?.status === "block") {
      alert("you have been block by the user");
    }
    console.log("clientId", clientId);
    console.log("selectedToken", selectedToken);
    console.log("numTokens", numTokens);
    console.log("gramRate", goldRates.gram);
    console.log("totalAmount", parseFloat((totalAmount * 1.1).toFixed(2)));
    console.log("paymentMethod", paymentMethod);
    console.log("paymentType", "USD");
    console.log("status", "pending");
    console.log("walletAddress", walletAddress);
    axios
      .post("/api/stripe-checkout", {
        id: clientId,
        tokenQuantity: numTokens,
        tokenType: selectedToken,
        gramRate: goldRates?.gram,
        amount: parseFloat((totalAmount * 1.1).toFixed(2)),
        paymentType: "USD",
        paymentMethod: paymentMethod,
        type: "mint",
        status: "pending",
        from: walletAddress,
      })
      .then((response) => {
        router.push(response?.data?.message?.url);
      })
      .catch((error) => {
        console.log("Stripe checkout error:", error);
      });
  };

  // const web3ModalRef = useRef(null);

  const handleCryptoCheckout = async (tokenType) => {
    if (!signer || !walletAddress) {
      return alert("Kindly connect your wallet first");
    } else if (user?.status === "block") {
      alert("you have been block by the user");
    }
    switch (tokenType) {
      case "eth":
        return handleEthPayment();
      case "usdt_eth":
        return handleUsdtEthPayment();
      case "matic":
        return handleMaticPayment();
      case "usdt_polygon":
        return handleUsdtPolygonPayment();
      case "btc":
        return handleBitcoinPayment();
      default:
        console.warn("Invalid token type selected.");
    }
  };

  // EXAMPLE FUNCTIONS
  //get Current Eth Price
  const getEthPriceInUsd = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await res.json();

      const price = data?.ethereum?.usd;
      console.log("ETH Price:", price);
      if (!price) throw new Error("ETH price not found in response.");

      return price;
    } catch (error) {
      console.error("Error fetching ETH price:", error.message || error);
      throw new Error("Unable to fetch current ETH price.");
    }
  };

  // ✅ Handle ETH Payment
  const [isPaying, setIsPaying] = useState(false);
  const handleEthPayment = async () => {
    console.log("🔄 Processing ETH payment...");
    setIsPaying(true);

    try {
      // Fetch ETH Price
      const ethPriceInUsd = await getEthPriceInUsd();
      console.log(`Live ETH Price: $${ethPriceInUsd}`);
      const amountWithFee = totalAmount * 1.1; // Add 10% fee

      const amountInEth = (amountWithFee / ethPriceInUsd).toFixed(6); // Limit decimals
      const ethValue = ethers.parseEther(amountInEth);

      // Send ETH
      const tx = await signer.sendTransaction({
        to: adminAddress,
        value: ethValue,
      });

      const receipt = await tx.wait();
      console.log("Transaction sent. Hash:", tx.hash);

      console.log("Transaction confirmed. Saving to backend...");

      // Save to backend
      if (tx.hash) {
        const res = await fetch("/api/send-paymentDetail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: clientId,
            tokenQuantity: numTokens,
            tokenType: selectedToken,
            gramRate: goldRates?.gram,
            amount: parseFloat((totalAmount * 1.1).toFixed(2)),
            paymentType: "Ethereum Eth",
            paymentMethod,
            type: "mint",
            status: "pending",
            from: walletAddress,
            hash: tx.hash,
          }),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save transaction.");
      }

      console.log("✅ ETH Transaction saved to DB successfully.");
    } catch (err) {
      console.error("❌ ETH Payment failed:", err.message || err);
      showToast({
        message: "ETH Payment failed: " + err.message,
        type: "error",
      });
    } finally {
      setIsPaying(false);
    }
  };

  const handleUsdtEthPayment = async () => {
    console.log("Processing USDT (Ethereum) payment...");

    try {
      const contract = new Contract(usdtToken, usdtAbi, signer);

      // ✅ USDT has 6 decimals
      const amountWithFee = totalAmount * 1.1; // Add 10% fee
      const parsedAmount = ethers.parseUnits(amountWithFee.toString(), 6);
      console.log("Parsed amount:", parsedAmount.toString());
      const tx = await contract.transfer(adminAddress, parsedAmount);
      console.log("🔁 Transaction sent to admin:", tx.hash);

      const receipt = await tx.wait();
      if (!receipt.status) {
        throw new Error("Blockchain transaction failed (reverted).");
      }

      console.log("✅ Transaction confirmed. Saving to backend...");

      const response = await fetch("/api/send-paymentDetail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: clientId,
          tokenQuantity: numTokens,
          tokenType: selectedToken,
          gramRate: goldRates?.gram,
          amount: parseFloat((totalAmount * 1.1).toFixed(2)),
          paymentType: "Ethereum USDT",
          paymentMethod,
          type: "mint",
          status: "pending",
          from: walletAddress,
          hash: tx.hash,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save transaction to backend.");
      }

      console.log("✅ Transaction saved to DB successfully.");
    } catch (err) {
      console.error("❌ Payment failed:", err?.message || err);
    }
  };

  //matic Price in USDT
  const getMaticPriceInUsd = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
      );
      const data = await res.json();

      const price = data?.["matic-network"]?.usd;
      if (!price) throw new Error("MATIC price not found in response.");

      return price;
    } catch (error) {
      console.error("Error fetching MATIC price:", error.message || error);
      throw new Error("Unable to fetch current MATIC price.");
    }
  };

  const handleMaticPayment = async () => {
    // console.log("Processing MATIC payment...");

    try {
      // ✅ Fetch live MATIC price
      const maticPriceInUsd = await getMaticPriceInUsd();
      // console.log(`Live MATIC Price: $${maticPriceInUsd}`);

      // const amountInUsd = totalAmount;
      const amountWithFee = totalAmount * 1.1; // Add 10% fee
      const amountInMatic = (amountWithFee / maticPriceInUsd).toFixed(18);
      const maticValue = ethers.utils.parseEther(amountInMatic);

      // 🔁 Send MATIC using native transaction
      const tx = await signer.sendTransaction({
        to: adminAddress,
        value: maticValue,
      });

      const receipt = await tx.wait();
      // console.log("Transaction sent. Hash:", tx.hash);

      if (!receipt.status) {
        throw new Error("Blockchain transaction failed (reverted).");
      }

      // console.log("Transaction confirmed. Saving to backend...");

      const response = await fetch("/api/send-paymentDetail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: clientId,
          tokenQuantity: numTokens,
          tokenType: selectedToken,
          gramRate: goldRates?.gram,
          amount: parseFloat((totalAmount * 1.1).toFixed(2)),
          paymentType: "Matic USDT",
          paymentMethod,
          type: "mint",
          status: "pending",
          from: walletAddress,
          hash: tx.hash,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save transaction to backend.");
      }

      // console.log("✅ MATIC Transaction saved to DB successfully.");
    } catch (err) {
      console.error("❌ MATIC Payment failed:", err.message || err);
      showToast({
        message: "MATIC Payment failed: " + err.message,
        type: "error",
      });
    }
  };

  const handleUsdtPolygonPayment = async () => {
    // console.log("Processing USDT (Polygon) payment...");

    try {
      // 🟣 Use the USDT token contract on Polygon (replace with correct address)
      const polygonUsdtToken = "0xYOUR_POLYGON_USDT_ADDRESS"; // USDT on Polygon
      const contract = new Contract(polygonUsdtToken, auAbi, signer); // signer must be on Polygon

      // Multiply by 1e6 because USDT has 6 decimals
      const amountWithFee = totalAmount * 1.1; // Add 10% fee

      const tx = await contract.transfer(adminAddress, amountWithFee * 10 ** 6);
      const receipt = await tx.wait();
      // console.log("Transaction sent. Hash:", tx.hash);

      if (!receipt.status) {
        throw new Error("Blockchain transaction failed (reverted).");
      }

      // console.log("Transaction confirmed. Saving to backend...");

      const response = await fetch("/api/send-paymentDetail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: clientId,
          tokenQuantity: numTokens,
          tokenType: selectedToken,
          gramRate: goldRates?.gram,
          amount: parseFloat((totalAmount * 1.1).toFixed(2)),
          paymentType: "Polygon USDT",
          paymentMethod,
          type: "mint",
          status: "pending",
          from: walletAddress,
          hash: tx.hash,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save transaction to backend.");
      }
    } catch (err) {
      console.error("❌ Polygon USDT Payment failed:", err.message || err);
      showToast({
        message: "Polygon USDT Payment failed: " + err.message,
        type: "error",
      });
    }
  };

  const handleBitcoinPayment = async () => {
    // console.log("Show BTC address or initiate BTC API call...");
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
            Mint Gold Tokens
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
            <label className="text-sm font-semibold">
              Total Amount with Tax (USD)
            </label>
            <input
              type="number"
              // value={totalAmount || ""}
              value={totalAmount ? (totalAmount * 1.1).toFixed(2) : ""}
              placeholder="Enter total amount"
              onChange={(e) => {
                const value = e.target.value;
                setTotalAmount(value);
                setNumTokens(
                  (
                    parseFloat(value || 0) / parseFloat(goldRates.gram || 1)
                  ).toFixed(4)
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
                        onClick={() => handleCryptoCheckout(token)}
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
const StripeAsset = ({ totalAmount, stripeCheckout }) => (
  <div className="rounded-md border p-4 shadow-sm bg-white">
    <p className="text-sm text-gray-600 font-semibold">Stripe Selected</p>
    <p className="text-sm text-gray-500">
      You will be redirected to Stripe to complete the payment of{" "}
      <strong>${totalAmount}</strong>.
    </p>
    <button
      className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded text-sm"
      onClick={stripeCheckout}
    >
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
