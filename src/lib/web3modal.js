// lib/web3modal.js ya kisi utils folder mein

import { EthereumProvider } from "@walletconnect/ethereum-provider";

export const providerOptions = {
  walletconnect: {
    package: EthereumProvider, // 👈 ye v2 ka engine hai
    options: {
      projectId: "YOUR_PROJECT_ID", // WalletConnect Cloud se milega
      chains: [1, 137], // Ethereum Mainnet, Polygon, etc.
      rpcMap: {
        1: "https://mainnet.infura.io/v3/YOUR_INFURA_ID",
        137: "https://polygon-rpc.com"
      }
    },
  },
};
