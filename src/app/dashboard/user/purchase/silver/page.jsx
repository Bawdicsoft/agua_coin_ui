"use client";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBreadcrumb } from "@/context/BreadcrumbContext";

export default function AUPayment() {
  const { theme } = useTheme();
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState("");
  const [numTokens, setNumTokens] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [goldRates, setGoldRates] = useState({ loading: true, ounce: 0, gram: 0 });
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [estimatedGas, setEstimatedGas] = useState("");

  const OUNCE_TO_GRAM = 31.1034768;

  useEffect(() => {
    fetchGoldRates();
  }, []);

  const fetchGoldRates = async () => {
    try {
      // Simulated API call - replace with actual API endpoint
      const response = await fetch("https://api.gold-api.com/price/XAG");
      const data = await response.json();
      setGoldRates({
        loading: false,
        ounce: data.ounce,
        gram: data.ounce / OUNCE_TO_GRAM,
      });
    } catch (error) {
      console.error("Error fetching Silver rates:", error);
      setGoldRates({ loading: false, ounce: 0, gram: 0 });
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4">
            Purchase AU Tokens
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
            Secure your investment with gold-backed tokens
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>User ID</span>
              {/* <span className="text-yellow-500">#{clientId?.slice(0, 6)}</span> */}
            </div>
            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {/* {clientId?.slice(0, 6)} */}
            </div>
          </div>

          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Gold Rate (oz)</span>
              <span className="text-yellow-500">Live</span>
            </div>
            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {goldRates.loading ? (
                <div className="animate-pulse">Loading...</div>
              ) : (
                `$${goldRates.ounce}`
              )}
            </div>
          </div>

          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Rate per Gram</span>
              <span className="text-yellow-500">Live</span>
            </div>
            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {goldRates.loading ? (
                <div className="animate-pulse">Loading...</div>
              ) : (
                `$${goldRates.gram}`
              )}
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Number of Tokens
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={numTokens}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNumTokens(value);
                    setTotalAmount(
                      (parseFloat(value || 0) * parseFloat(goldRates.gram || 0)).toFixed(2)
                    );
                  }}
                  className={`w-full p-3 pl-4 pr-12 rounded-lg border ${
                    theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                  } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter number of tokens"
                />
                <span className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  AU
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Total Amount (USD)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTotalAmount(value);
                    setNumTokens(
                      (parseFloat(value || 0) / parseFloat(goldRates.gram || 1)).toFixed(4)
                    );
                  }}
                  className={`w-full p-3 pl-4 pr-12 rounded-lg border ${
                    theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                  } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter total amount"
                />
                <span className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  USD
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Network
              </label>
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
              >
                <option value="">Select Network</option>
                <option value="ethereum">Ethereum</option>
                <option value="polygon">Polygon</option>
                <option value="fantom">Fantom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 mb-8`}>
          <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Select Payment Method
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setPaymentMethod("stripe")}
              className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                paymentMethod === "stripe"
                  ? `${theme === 'dark' ? 'border-yellow-500 bg-gray-700' : 'border-yellow-500 bg-yellow-50'}`
                  : `${theme === 'dark' ? 'border-gray-600 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-500'}`
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <img src="/stripe-icon.png" alt="Stripe" className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Credit Card (Stripe)
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Pay with credit card
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod("crypto")}
              className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                paymentMethod === "crypto"
                  ? `${theme === 'dark' ? 'border-yellow-500 bg-gray-700' : 'border-yellow-500 bg-yellow-50'}`
                  : `${theme === 'dark' ? 'border-gray-600 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-500'}`
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <img src="/crypto-icon.png" alt="Crypto" className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Cryptocurrency
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Pay with crypto
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Payment Method Details */}
        {paymentMethod && (
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
            {paymentMethod === "stripe" ? (
              <div className="space-y-6">
                <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Credit Card Payment
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  You will be redirected to Stripe to complete your payment securely.
                </p>
                <button
                  className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-medium hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 shadow-lg`}
                >
                  Proceed to Payment
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Cryptocurrency Payment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setSelectedCrypto("eth")}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedCrypto === "eth"
                        ? `${theme === 'dark' ? 'border-yellow-500 bg-gray-700' : 'border-yellow-500 bg-yellow-50'}`
                        : `${theme === 'dark' ? 'border-gray-600 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-500'}`
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <img src="/eth-icon.png" alt="ETH" className="w-8 h-8" />
                      <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        ETH
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedCrypto("usdt")}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedCrypto === "usdt"
                        ? `${theme === 'dark' ? 'border-yellow-500 bg-gray-700' : 'border-yellow-500 bg-yellow-50'}`
                        : `${theme === 'dark' ? 'border-gray-600 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-500'}`
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <img src="/usdt-icon.png" alt="USDT" className="w-8 h-8" />
                      <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        USDT
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedCrypto("usdc")}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedCrypto === "usdc"
                        ? `${theme === 'dark' ? 'border-yellow-500 bg-gray-700' : 'border-yellow-500 bg-yellow-50'}`
                        : `${theme === 'dark' ? 'border-gray-600 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-500'}`
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <img src="/usdc-icon.png" alt="USDC" className="w-8 h-8" />
                      <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        USDC
                      </span>
                    </div>
                  </button>
                </div>

                {selectedCrypto && (
                  <div className="mt-6">
                    <button
                      className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-medium hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 shadow-lg`}
                    >
                      Connect Wallet
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Success Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full mx-4`}>
              <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {modalData?.title}
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                {modalData?.message}
              </p>
              <button
                onClick={() => setShowModal(false)}
                className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-medium hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200`}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 