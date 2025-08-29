"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Contract, ethers } from "ethers";
// import { auAbi, adminAddress, token } from "../../../../../constant/data";
// import { WalletContext } from "@/context/WalletContext";
import { adminAddress, usdtToken, usdtAbi } from "@/content/tokendata";
import { WalletContext } from "@/context/WalletContext";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AutoCloseModal from "@/components/common/AutoCloseModal";
import { useTheme } from "@/context/ThemeContext";
import { ToastContext } from "@/context/ToastContext";
import { fetchUserData } from "@/app/dashboard/admin/page";

export default function SilverPayment() {
  const [totalAmount, setTotalAmount] = useState("");
  const [numTokens, setNumTokens] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [silverRates, setSilverRates] = useState({
    milligram: 0,
    gram: 0,
    loading: true,
  });
  const [selectedToken, setSelectedToken] = useState("AG"); // NEW
  const [selectedCrypto, setSelectedCrypto] = useState(""); // NEW
  const [showModal, setShowModal] = useState(false);

  const OUNCE_TO_GRAM = 31.1035;
  const OUNCE_TO_MG = 31103.5;

  const { walletAddress, signer } = useContext(WalletContext);
  const router = useRouter();

  const { auth, setAuth } = useContext(AuthContext);
  const [clientId, setClientId] = useState(null);
  const { theme } = useTheme();
  const { showToast } = useContext(ToastContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUserData(setUser);
    console.log("user", user);
    const fetchSilverRate = async () => {
      try {
        setSilverRates({ milligram: 0, gram: 0, loading: true });

        const res = await fetch("https://api.gold-api.com/price/XAG");
        console.log("res=>", res);
        if (!res.ok) throw new Error("Failed to fetch silver rate");

        const data = await res.json();
        const ouncePrice = data.price;
        const gramPrice = ouncePrice / OUNCE_TO_GRAM;
        const milligramPrice = ouncePrice / OUNCE_TO_MG;
        console.log(milligramPrice);

        setSilverRates({
          milligram: milligramPrice.toFixed(6),
          gram: gramPrice.toFixed(2),
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching silver rates:", error);
        setSilverRates({ milligram: 0, gram: 0, loading: false });
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

  const stripeCheckout = () => {
    if (!signer || !walletAddress) {
      return alert("Kindly connect your wallet first");
    } else if (user?.status === "block") {
      alert("You Have blocked by the user");
    }
    console.log("paymentMethod", paymentMethod);
    axios
      .post("/api/stripe-checkout", {
        id: clientId,
        tokenQuantity: numTokens,
        tokenType: selectedToken,
        gramRate: silverRates.gram,
        amount: totalAmount,
        paymentType: "USDT",
        paymentMethod: paymentMethod,
        type: "purchase",
        status: "pending",
        from: walletAddress,
      })
      .then((response) => {
        router.push(response?.data?.message?.url);
      })
      .catch((error) => {
        console.error("Stripe checkout error:", error);
      });
  };

  // const web3ModalRef = useRef(null);

  const handleCryptoCheckout = async (tokenType) => {
    if (!signer || !walletAddress) {
      return alert("Kindly connect your wallet first");
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

      const amountInEth = (totalAmount / ethPriceInUsd).toFixed(6); // Limit decimals
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
            gramRate: silverRates?.gram,
            amount: totalAmount,
            paymentType: "Ethereum Eth",
            paymentMethod,
            type: "purchase",
            status: "pending",
            from: walletAddress,
            hash: tx.hash,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to save transaction.");
        }

        console.log("✅ ETH Transaction saved to DB successfully.");
      }
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
      const parsedAmount = ethers.parseUnits(totalAmount.toString(), 6);
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
          gramRate: silverRates?.gram,
          amount: totalAmount,
          paymentType: "Ethereum USDT",
          paymentMethod,
          type: "purchase",
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

      const amountInUsd = totalAmount;
      const amountInMatic = (amountInUsd / maticPriceInUsd).toFixed(18);
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
          gramRate: silverRates?.gram,
          amount: totalAmount,
          paymentType: "Matic USDT",
          paymentMethod,
          type: "purchase",
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
      router.push("/userdashboard");
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
      const tx = await contract.transfer(adminAddress, totalAmount * 10 ** 6);
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
          gramRate: silverRates?.gram,
          amount: totalAmount,
          paymentType: "Polygon USDT",
          paymentMethod,
          type: "purchase",
          status: "pending",
          from: walletAddress,
          hash: tx.hash,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save transaction to backend.");
      }

      // console.log("✅ Polygon USDT Transaction saved to DB successfully.");
      router.push("/userdashboard");
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
          }
        `}
      >
        <div className="flex items-center justify-center mb-8">
          <h1
            className={`text-4xl font-extrabold text-center mb-0 tracking-tight
              ${theme === "dark" ? "text-neutral-100" : "text-neutral-900"}
            `}
          >
            Purchase Silver Tokens
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
            label="Token Rate (per milligram)"
            value={
              silverRates.loading ? "Loading..." : `$${silverRates.milligram}`
            }
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
              }
            `}
          >
            <label className="text-sm font-semibold">Number of Tokens</label>
            <input
              type="text"
              value={numTokens}
              onChange={(e) => {
                // Remove all non-numeric and non-dot characters, allow only one dot
                let value = e.target.value.replace(/[^0-9.]/g, "");
                // Only allow one dot
                const parts = value.split(".");
                if (parts.length > 2) {
                  value = parts[0] + "." + parts.slice(1).join("");
                }
                setNumTokens(value);
                setTotalAmount(
                  (
                    parseFloat(value || 0) * parseFloat(silverRates.gram || 0)
                  ).toFixed(2)
                );
              }}
              onPaste={(e) => {
                // Prevent pasting non-numeric content
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
              type="number"
              value={totalAmount}
              style={{
                MozAppearance: "textfield",
                WebkitAppearance: "none",
              }}
              onChange={(e) => {
                const value = e.target.value;
                setTotalAmount(value);
                setNumTokens(
                  (
                    parseFloat(value || 0) / parseFloat(silverRates.gram || 1)
                  ).toFixed(4)
                );
              }}
              className={`mt-1 w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition ${
                theme === "dark"
                  ? "bg-neutral-800 border-neutral-700 text-neutral-100 focus:ring-neutral-600 shadow-inner"
                  : "bg-neutral-100 border border-neutral-300 text-neutral-900 focus:ring-neutral-300 shadow-inner"
              } `}
              placeholder="Enter total amount"
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
            ${
              theme === "dark"
                ? "bg-neutral-800 border-neutral-700 text-neutral-100"
                : "bg-neutral-50 border-neutral-200 text-neutral-900"
            }
          `}
                >
                  <img src={icon} alt={label} className="w-10 h-10" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Stripe Checkout Section */}
          {paymentMethod === "stripe" && (
            <StripeAsset
              totalAmount={totalAmount}
              stripeCheckout={stripeCheckout}
              theme={theme}
            />
          )}

          {/* Crypto Token Selection */}

          {paymentMethod === "crypto" && (
            <div
              className={`border rounded-xl p-6 mt-2 transition-colors
      ${
        theme === "dark"
          ? "bg-neutral-900 border-neutral-700"
          : "bg-white border-neutral-100"
      }
    `}
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
                  : "bg-neutral-50 border-neutral-200 text-neutral-900"
              } hover:ring-2 hover:ring-green-500`}
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
      {showModal && (
        <AutoCloseModal
          message="Action completed successfully!"
          type="success"
          onClose={() => setShowModal(false)}
        />
      )}
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

const StripeAsset = ({ totalAmount, stripeCheckout, theme }) => (
  <div
    className={`rounded-xl border px-6 py-5 shadow-sm mt-2 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4
    ${
      theme === "dark"
        ? "bg-neutral-900 border-neutral-700"
        : "bg-white border-neutral-200"
    }
  `}
  >
    {/* Left Section: Icon + Text */}
    <div className="flex items-start gap-4 flex-1">
      <img
        src="/icons/stripe-icon.png"
        alt="Stripe"
        className="w-10 h-10 object-contain mt-1"
      />
      <div>
        <h3 className="text-base font-bold mb-1">Stripe Selected</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You will be redirected to Stripe to complete the payment of{" "}
          <span className="font-semibold text-black dark:text-white">
            ${totalAmount}
          </span>
          .
        </p>
      </div>
    </div>

    {/* Right Section: Button */}
    <div className="w-full md:w-auto">
      <button
        onClick={stripeCheckout}
        className={`w-full md:w-auto px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200
        ${
          theme === "dark"
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }
      `}
      >
        Pay with Stripe
      </button>
    </div>
  </div>
);
