"use client";

import React, { createContext, useState } from "react";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState(null);

  return (
    <WalletContext.Provider
      value={{ walletAddress, setWalletAddress, signer, setSigner }}
    >
      {children}
    </WalletContext.Provider>
  );
};
