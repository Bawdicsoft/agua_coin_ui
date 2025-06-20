"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { WalletContext } from "./WalletContext";

export const BalanceContext = createContext();

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

export const BalanceProvider = ({ children }) => {
  const { walletAddress, provider } = useContext(WalletContext);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Token addresses from .env
  const tokenAddresses = {
    AU: process.env.AU_TOKEN_ADDRESS,
    AG: process.env.AG_TOKEN_ADDRESS,
    AGUA: process.env.AGUA_TOKEN_ADDRESS,
    USDT: process.env.USDT_TOKEN_ADDRESS,
  };

  const getBalances = async () => {
    try {
      if (!provider || !walletAddress) return;
      setLoading(true);
      setError("");
      console.log("Wallet Address:", walletAddress);
      console.log("Provider:", provider);
      
      const balancesArray = [];

      for (const [symbol, address] of Object.entries(tokenAddresses)) {
        const contract = new ethers.Contract(address, ERC20_ABI, provider);
        const [decimals, balance] = await Promise.all([
          contract.decimals(),
          contract.balanceOf(walletAddress),
        ]);
        balancesArray.push({
          symbol,
          balance: ethers.utils.formatUnits(balance, decimals),
        });
      }

      setBalances(balancesArray);
    } catch (err) {
      console.error(err);
      setError("Error fetching balances.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBalances();
  }, [walletAddress, provider]);

  return (
    <BalanceContext.Provider value={{ balances, loading, error, getBalances }}>
      {children}
    </BalanceContext.Provider>
  );
};
