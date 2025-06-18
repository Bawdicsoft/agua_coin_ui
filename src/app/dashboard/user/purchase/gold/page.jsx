"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { jwtDecode } from "jwt-decode";
import { Contract } from "ethers";
import { ethers } from "ethers"; // ✅ THIS IS REQUIRED

// import { auAbi, adminAddress, token } from "../../../../../constant/data";
// import { WalletContext } from "@/context/WalletContext";
import { adminAddress, usdtToken, usdtAbi } from "@/content/tokendata";
import { WalletContext } from "@/context/WalletContext";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AutoCloseModal from "@/components/common/AutoCloseModal";

export default function Goldpayment() {
  const [totalAmount, setTotalAmount] = useState("");
  const [numTokens, setNumTokens] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedToken, setSelectedToken] = useState("AU"); // NEW
  const [selectedCrypto, setSelectedCrypto] = useState(""); // NEW
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    message: "",
    type: "success",
  });

  const [goldRates, setGoldRates] = useState({
    ounce: 0,
    gram: 0,
    loading: true,
  });

  const { walletAddress, setWalletAddress, signer, setSigner } =
    useContext(WalletContext);
  const router = useRouter();

  const { auth, setAuth } = useContext(AuthContext);
  const [clientId, setClientId] = useState(null);
  const OUNCE_TO_GRAM = 31.1035;

  // Fetch live gold rate
  const providerOptions = {
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "Web3Modal Demo",
        rpc: {
          4002: "https://rpc.testnet.fantom.network",
        },
        chainId: 4002,
        darkMode: false,
      },
    },

    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          4002: "https://rpc.testnet.fantom.network",
        },
        bridge: "https://bridge.walletconnect.org",
        qrcode: true,
      },
    },
  };

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
      return alert("Kindly connect your wallet first");
    }
    setPaymentMethod(e.target.value);
  };

  const stripeCheckout = () => {
    axios
      .post("/api/stripe-checkout", {
        id: clientId,
        tokenQuantity: numTokens,
        tokenType: selectedToken,
        gramRate: goldRates.gram,
        amount: totalAmount,
        paymentType: "USDT",
        paymentMethod: paymentMethod,
        status: "purchase",
      })
      .then((response) => {
        router.push(response?.data?.message?.url);
      })
      .catch((error) => {
        console.error("Stripe checkout error:", error);
      });
  };

  const web3ModalRef = useRef(null);

  const handleCryptoCheckout = async (tokenType) => {
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
      if (!signer || !walletAddress) {
        alert("Wallet not connected.");
        return;
      }

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

      if (!receipt || receipt.status !== 1) {
        throw new Error("Transaction reverted or failed.");
      }

      console.log("Transaction confirmed. Saving to backend...");

      // Save to backend
      const res = await fetch("/api/send-paymentDetail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: clientId,
          gramRate: goldRates.gram,
          amount: totalAmount,
          paymentMethod: "MetaMask",
          tokenQuantity: numTokens,
          tokenType: selectedToken,
          paymentType: "ETH",
          status: "purchase",
          hash: tx.hash,
          from: walletAddress,
          to: adminAddress,
          network: "Sepolia", // or "mainnet"
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save transaction.");
      }

      console.log("✅ ETH Transaction saved to DB successfully.");
      router.push("/userdashboard");
    } catch (err) {
      console.error("❌ ETH Payment failed:", err.message || err);
      alert("ETH Payment failed: " + err.message);
    } finally {
      setIsPaying(false);
    }
  };
  //working
  const handleUsdtEthPayment = async () => {
    // console.log("Processing USDT (Ethereum) payment...");
    try {
      const contract = new Contract(usdtToken, usdtAbi, signer);

      const tx = await contract.transfer(adminAddress, totalAmount * 10 ** 6);
      // console.log("Transaction sent. Hash:", tx.hash);

      // ✅ Wait for transaction confirmation
      const receipt = await tx.wait(); // waits for block confirmation

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
          gramRate: goldRates.gram,
          amount: totalAmount,
          paymentMethod: "MetaMask",
          tokenQuantity: numTokens,
          tokenType: selectedToken,
          tokenStatus: "pending",
          paymentType: "USDT",
          status: "purchase",
          hash: tx.hash,
          from: walletAddress,
          to: adminAddress,
          network: "Sepolia",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save transaction to backend.");
      }

      // console.log("✅ Transaction saved to DB successfully.");

      router.push("/userdashboard");
      return;
      // You can now show a success toast or redirect
    } catch (err) {
      console.error("❌ Payment failed:", err.message || err);

      // Optionally: show an alert, rollback UI, or log it
      alert("Payment failed: " + err.message);
      return;
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
          gramRate: goldRates.gram,
          amount: totalAmount,
          paymentMethod: "MetaMask",
          tokenQuantity: numTokens,
          tokenType: selectedToken,
          paymentType: "MATIC",
          status: "purchase",
          hash: tx.hash,
          from: walletAddress,
          to: adminAddress,
          network: "Polygon",
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
      alert("MATIC Payment failed: " + err.message);
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
          gramRate: goldRates.gram,
          amount: totalAmount,
          paymentMethod: "MetaMask",
          tokenQuantity: numTokens,
          tokenType: selectedToken,
          paymentType: "USDT",
          status: "purchase",
          hash: tx.hash,
          from: walletAddress,
          to: adminAddress,
          network: "Polygon", // updated network name
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
      alert("Polygon USDT Payment failed: " + err.message);
    }
  };

  const handleBitcoinPayment = async () => {
    // console.log("Show BTC address or initiate BTC API call...");
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 font-lora">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-8">
          Purchase Gold Tokens
        </h1>

        {/* Display Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InfoCard label="User ID" value="#123456" />
          <InfoCard
            label="Current AU Rate oz"
            value={goldRates.loading ? "Loading..." : `$${goldRates.ounce}`}
          />
          <InfoCard
            label="Token Rate (per gram)"
            value={goldRates.loading ? "Loading..." : `$${goldRates.gram}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Number of Tokens */}
          <div className="bg-white shadow rounded p-4">
            <label className="text-sm text-gray-500">Number of Tokens</label>
            <input
              type="number"
              value={numTokens}
              onChange={(e) => {
                const value = e.target.value;
                setNumTokens(value);
                setTotalAmount(
                  (
                    parseFloat(value || 0) * parseFloat(goldRates.gram || 0)
                  ).toFixed(2)
                );
              }}
              className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-800"
              placeholder="Enter number of tokens"
            />
          </div>

          {/* Total Amount in USD */}
          <div className="bg-white shadow rounded p-4">
            <label className="text-sm text-gray-500">Total Amount (USD)</label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => {
                const value = e.target.value;
                setTotalAmount(value);
                setNumTokens(
                  (
                    parseFloat(value || 0) / parseFloat(goldRates.gram || 1)
                  ).toFixed(4)
                );
              }}
              className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-800"
              placeholder="Enter total amount"
            />
          </div>

          {/* Current Rate Display */}
          <InfoCard label="Current Rate" value={`$${goldRates.gram}`} />
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">
              Select Payment Method
            </label>
            <select
              onChange={handlePaymentMethodChange}
              value={paymentMethod}
              className="mt-1 block w-full text-black rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            >
              <option value="">-- Select --</option>
              <option value="stripe">Stripe</option>
              <option value="crypto">Crypto</option>
            </select>
          </div>

          {paymentMethod === "stripe" && (
            <StripeAsset
              totalAmount={totalAmount}
              stripeCheckout={stripeCheckout}
            />
          )}
          {paymentMethod === "crypto" && (
            <>
              {/* Select Crypto Token */}
              <div>
                <label className="block text-sm font-medium text-black mt-4">
                  Select Crypto Token
                </label>
                <select
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                  className="mt-1 block w-full text-black rounded-md border border-gray-300 p-2 shadow-sm text-sm"
                >
                  <option value="">-- Select Token --</option>
                  <option value="eth">Ether (Ethereum)</option>
                  <option value="usdt_eth">USDT (Ethereum)</option>
                  <option value="matic">Matic (Polygon)</option>
                  <option value="usdt_polygon">USDT (Polygon)</option>
                  <option value="btc">Bitcoin (BTC Network)</option>
                </select>
              </div>

              {/* Show Crypto UI only after token selected */}
              {selectedCrypto && (
                <CryptoAsset
                  totalAmount={totalAmount}
                  selectedCrypto={selectedCrypto}
                  handleCheckout={handleCryptoCheckout}
                />
              )}
            </>
          )}
        </div>
      </div>
      {showModal && (
        <AutoCloseModal
          message="Action completed successfully!"
          type="success" // or "error"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

const InfoCard = ({ label, value }) => (
  <div className="bg-white shadow rounded p-4">
    <label className="text-sm text-gray-500">{label}</label>
    <div className="text-lg font-semibold text-gray-800">{value}</div>
  </div>
);

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

const CryptoAsset = ({ totalAmount, selectedCrypto, handleCheckout }) => {
  const readable = {
    eth: "Ether (Ethereum)",
    usdt_eth: "USDT (Ethereum)",
    matic: "Matic (Polygon)",
    usdt_polygon: "USDT (Polygon)",
    btc: "Bitcoin",
  };

  return (
    <div className="rounded-md border p-4 shadow-sm bg-white mt-4">
      <p className="text-sm text-gray-600 font-semibold">Crypto Wallet</p>
      <p className="text-sm text-gray-500">
        You selected: <strong>{readable[selectedCrypto]}</strong> to pay{" "}
        <strong>${totalAmount}</strong>.
      </p>
      <button
        className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded text-sm"
        onClick={() => handleCheckout(selectedCrypto)}
      >
        Pay with {readable[selectedCrypto]}
      </button>
    </div>
  );
};
