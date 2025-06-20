"use client";

import React, { createContext, useState, useEffect } from "react";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddressState] = useState("");
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState(null);

  // On mount, restore wallet address from localStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setWalletAddressState(savedAddress);
    }
  }, []);

  // Save wallet address to localStorage when it changes
  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem("walletAddress", walletAddress);
    } else {
      localStorage.removeItem("walletAddress");
    }
  }, [walletAddress]);

  // Custom setter to handle localStorage clearing on logout
  const setWalletAddress = (address) => {
    setWalletAddressState(address);
    if (!address) {
      localStorage.removeItem("walletAddress");
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        signer,
        setSigner,
        provider,
        setProvider,
        chainId,
        setChainId,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
