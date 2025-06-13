"use client";
import { useState } from "react";
import Modal from "@/components/common/Modal";
import { MdAccountBalanceWallet } from "react-icons/md";

export default function WalletConnectButton() {
  const [showWalletModal, setShowWalletModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowWalletModal(true)}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "var(--color-primary)",
          color: "#fff",
          border: "none",
          borderRadius: "9999px", // Fully rounded
          padding: "0.4rem 1rem",
          fontSize: "0.9rem",
          gap: "0.4rem",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
      >
        <MdAccountBalanceWallet size={18} />
        <span>Connect Wallet</span>
      </button>

      <Modal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)}>
        <div style={{ padding: "1rem" }}>
          <h2 style={{ marginBottom: "0.5rem" }}>Connect Your Wallet</h2>
          <p>Coming soon. Integration with MetaMask or WalletConnect planned.</p>
          <button
            onClick={() => setShowWalletModal(false)}
            style={{
              marginTop: "1rem",
              padding: "0.4rem 1rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "var(--color-danger, #f44336)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
