// "use client";
// import { useTheme } from "@/context/ThemeContext";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useBreadcrumb } from "@/context/BreadcrumbContext";
// import Image from "next/image";

// export default function AGPayment() {
//   const { theme } = useTheme();
//   const router = useRouter();
//   const { setBreadcrumb } = useBreadcrumb();
//   const [totalAmount, setTotalAmount] = useState("");
//   const [numTokens, setNumTokens] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [selectedToken, setSelectedToken] = useState("");
//   const [selectedCrypto, setSelectedCrypto] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalData, setModalData] = useState(null);
//   const [goldRates, setGoldRates] = useState({ loading: true, ounce: 0, gram: 0 });
//   const [selectedNetwork, setSelectedNetwork] = useState("");
//   const [transactionStatus, setTransactionStatus] = useState("");
//   const [estimatedGas, setEstimatedGas] = useState("");

//   const OUNCE_TO_GRAM = 31.1034768;


//   const fetchGoldRates = async () => {
//     try {
//       // Simulated API call - replace with actual API endpoint
//       const response = await fetch("https://api.gold-api.com/price/XAU");
//       const data = await response.json();
//       setGoldRates({
//         loading: false,
//         ounce: data.ounce,
//         gram: data.ounce / OUNCE_TO_GRAM,
//       });
//     } catch (error) {
//       console.error("Error fetching gold rates:", error);
//       setGoldRates({ loading: false, ounce: 0, gram: 0 });
//     }
//   };

//   return (
//     <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
//       <div className="max-w-5xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4">
//             Purchase AG Tokens
//           </h1>
//           <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
//             Secure your investment with gold-backed tokens
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300`}>
//             <div className="flex items-center justify-between mb-2">
//               <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>User ID</span>
//               {/* <span className="text-yellow-500">#{!clientId?.slice(0, 6)}</span> */}
//             </div>
//             <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//               {/* {!clientId?.slice(0, 6)} */}
//             </div>
//           </div>

//           <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300`}>
//             <div className="flex items-center justify-between mb-2">
//               <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Gold Rate (oz)</span>
//               <span className="text-yellow-500">Live</span>
//             </div>
//             <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//               {goldRates.loading ? (
//                 <div className="animate-pulse">Loading...</div>
//               ) : (
//                 `$${goldRates.ounce}`
//               )}
//             </div>
//           </div>

//           <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300`}>
//             <div className="flex items-center justify-between mb-2">
//               <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Rate per Gram</span>
//               <span className="text-yellow-500">Live</span>
//             </div>
//             <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//               {goldRates.loading ? (
//                 <div className="animate-pulse">Loading...</div>
//               ) : (
//                 `$${goldRates.gram}`
//               )}
//             </div>
//           </div>
//         </div>

//         <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 mb-8`}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="space-y-2">
//               <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
//                 Number of Tokens
//               </label>
//               <div className="relative">
//                 <input
//                   type="number"
//                   value={numTokens}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     setNumTokens(value);
//                     setTotalAmount(
//                       (parseFloat(value || 0) * parseFloat(goldRates.gram || 0)).toFixed(2)
//                     );
//                   }}
//                   className={`w-full p-3 pl-4 pr-12 rounded-lg border ${
//                     theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
//                   } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                   placeholder="Enter number of tokens"
//                 />
//                 <span className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
//                   AG
//                 </span>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
//                 Total Amount (USD)
//               </label>
//               <div className="relative">
//                 <input
//                   type="number"
//                   value={totalAmount}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     setTotalAmount(value);
//                     setNumTokens(
//                       (parseFloat(value || 0) / parseFloat(goldRates.gram || 1)).toFixed(4)
//                     );
//                   }}
//                   className={`w-full p-3 pl-4 pr-12 rounded-lg border ${
//                     theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
//                   } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                   placeholder="Enter total amount"
//                 />
//                 <span className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
//                   USD
//                 </span>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
//                 Network
//               </label>
//               <select
//                 value={selectedNetwork}
//                 onChange={(e) => setSelectedNetwork(e.target.value)}
//                 className={`w-full p-3 rounded-lg border ${
//                   theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
//                 } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//               >
//                 <option value="">Select Network</option>
//                 <option value="ethereum">Ethereum</option>
//                 <option value="polygon">Polygon</option>
//                 <option value="fantom">Fantom</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Payment Method Selection */}
//         <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 mb-8`}>
//           <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//             Select Payment Method
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <button
//               onClick={() => setPaymentMethod("stripe")}
//               className={`p-6 rounded-lg border-2 transition-all duration-200 ${
//                 paymentMethod === "stripe"
//                   ? `${theme === 'dark' ? 'border-yellow-500 bg-gray-700' : 'border-yellow-500 bg-yellow-50'}`
//                   : `${theme === 'dark' ? 'border-gray-600 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-500'}`
//               }`}
//             >
//               <div className="flex items-center space-x-4">
//                 <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                   <Image src="/stripe-icon.png" alt="Stripe" className="w-8 h-8" />
//                 </div>
//                 <div className="text-left">
//                   <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//                     Credit Card (Stripe)
//                   </h3>
//                   <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
//                     Pay with credit card
//                   </p>
//                 </div>
//               </div>
//             </button>

//             <button
//               onClick={() => setPaymentMethod("crypto")}
//               className={`p-6 rounded-lg border-2 transition-all duration-200 ${
//                 paymentMethod === "crypto"
//                   ? `${theme === 'dark' ? 'border-yellow-500 bg-gray-700' : 'border-yellow-500 bg-yellow-50'}`
//                   : `${theme === 'dark' ? 'border-gray-600 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-500'}`
//               }`}
//             >
//               <div className="flex items-center space-x-4">
//                 <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                   <Image src="/crypto-icon.png" alt="Crypto" className="w-8 h-8" />
//                 </div>
//                 <div className="text-left">
//                   <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//                     Cryptocurrency
//                   </h3>
//                   <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
//                     Pay with crypto
//                   </p>
//                 </div>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Payment Method Details */}
//         {paymentMethod && (
//           <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
//             {paymentMethod === "stripe" ? (
//               <div className="space-y-6">
//                 <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//                   Credit Card Payment
//                 </h3>
//                 <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
//                   You will be redirected to Stripe to complete your payment securely.
//                 </p>
//                 <button
//                   className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-medium hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 shadow-lg`}
//                 >
//                   Proceed to Payment
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//                   Cryptocurrency Payment
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <button
//                     onClick={() => setSelectedCrypto("eth")}
//                     className={`p-4 rounded-lg border-2 transition-all duration-200 ${
//                       selectedCrypto === "eth"
//                         ? `${theme === 'dark' ? 'border-yellow-500 bg-gray-700' : 'border-yellow-500 bg-yellow-50'}`
//                         : `${theme === 'dark' ? 'border-gray-600 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-500'}`
//                     }`}
//                   >
//                     <div className="flex flex-col items-center space-y-2">
//                       <Image src="/eth-icon.png" alt="ETH" className="w-8 h-8" />
//                       <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//                         ETH
//                       </span>
//                     </div>
//                   </button>

//                   <button
//                     onClick={() => setSelectedCrypto("usdt")}
//                     className={`p-4 rounded-lg border-2 transition-all duration-200 ${
//                       selectedCrypto === "usdt"
//                         ? `${theme === 'dark' ? 'border-yellow-500 bg-gray-700' : 'border-yellow-500 bg-yellow-50'}`
//                         : `${theme === 'dark' ? 'border-gray-600 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-500'}`
//                     }`}
//                   >
//                     <div className="flex flex-col items-center space-y-2">
//                       <img src="/usdt-icon.png" alt="USDT" className="w-8 h-8" />
//                       <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//                         USDT
//                       </span>
//                     </div>
//                   </button>

//                   <button
//                     onClick={() => setSelectedCrypto("usdc")}
//                     className={`p-4 rounded-lg border-2 transition-all duration-200 ${
//                       selectedCrypto === "usdc"
//                         ? `${theme === 'dark' ? 'border-yellow-500 bg-gray-700' : 'border-yellow-500 bg-yellow-50'}`
//                         : `${theme === 'dark' ? 'border-gray-600 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-500'}`
//                     }`}
//                   >
//                     <div className="flex flex-col items-center space-y-2">
//                       <img src="/usdc-icon.png" alt="USDC" className="w-8 h-8" />
//                       <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//                         USDC
//                       </span>
//                     </div>
//                   </button>
//                 </div>

//                 {selectedCrypto && (
//                   <div className="mt-6">
//                     <button
//                       className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-medium hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 shadow-lg`}
//                     >
//                       Connect Wallet
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Success Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full mx-4`}>
//               <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
//                 {modalData?.title}
//               </h3>
//               <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
//                 {modalData?.message}
//               </p>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-medium hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200`}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// } 

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
  // State management for form inputs and UI
  const [totalAmount, setTotalAmount] = useState(""); // Stores the total payment amount in USD
  const [numTokens, setNumTokens] = useState(""); // Stores the number of tokens user wants to purchase
  const [paymentMethod, setPaymentMethod] = useState(""); // Tracks selected payment method (stripe/crypto)
  const [selectedToken, setSelectedToken] = useState("AU"); // Tracks selected token type
  const [selectedCrypto, setSelectedCrypto] = useState(""); // Tracks selected cryptocurrency for payment
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [modalData, setModalData] = useState({
    message: "",
    type: "success",
  }); // Stores modal content and type

  // Gold rates state with loading indicator
  const [goldRates, setGoldRates] = useState({
    ounce: 0, // Price per ounce
    gram: 0,  // Price per gram
    loading: true, // Loading state
  });

  // Context hooks for wallet and auth
  const { walletAddress, setWalletAddress, signer, setSigner } =
    useContext(WalletContext);
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);
  
  // Local state for client ID and constants
  const [clientId, setClientId] = useState(null);
  const OUNCE_TO_GRAM = 31.1035; // Conversion constant

  // Provider options for wallet connections
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

  // Effect for fetching gold rates and checking auth
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
    const decodedToken = jwtDecode(token);
    const userId = decodedToken?.id;
    setClientId(userId);
    setAuth((prev) => ({
      ...prev,
      isLoggedIn: true,
      token,
      user: { id: userId }, // if no full user object available
    }));
  }, [signer]);

  // Handler for payment method selection
  const handlePaymentMethodChange = (e) => {
    if (!signer || !walletAddress) {
      return alert("Kindly connect your wallet first");
    }
    setPaymentMethod(e.target.value);
  };

  // Stripe checkout handler
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

  // Web3 modal reference
  const web3ModalRef = useRef(null);

  // Main crypto checkout handler
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

  // [Rest of your payment handler functions...]

  return (
    <>
      {/* Main container */}
      <div className="max-w-4xl mx-auto p-6 font-lora">
        {/* Page heading with gradient text */}
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-8">
          Purchase Gold Tokens
        </h1>

        {/* Info cards section - shows user ID and gold rates */}
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

        {/* Input section for token amount and total calculation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Number of Tokens input */}
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

          {/* Total Amount in USD input */}
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

        {/* Payment method selection section */}
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

          {/* Conditional rendering based on payment method */}
          {paymentMethod === "stripe" && (
            <StripeAsset
              totalAmount={totalAmount}
              stripeCheckout={stripeCheckout}
            />
          )}
          {paymentMethod === "crypto" && (
            <>
              {/* Crypto token selection */}
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

              {/* Show crypto payment UI when token is selected */}
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

      {/* Success/Error modal */}
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

// Reusable Info Card component
const InfoCard = ({ label, value }) => (
  <div className="bg-white shadow rounded p-4">
    <label className="text-sm text-gray-500">{label}</label>
    <div className="text-lg font-semibold text-gray-800">{value}</div>
  </div>
);

// Stripe payment component
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

// Crypto payment component
const CryptoAsset = ({ totalAmount, selectedCrypto, handleCheckout }) => {
  // Mapping for readable crypto names
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