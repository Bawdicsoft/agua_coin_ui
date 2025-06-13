import { useState } from "react";
import Modal from "@/components/common/Modal";

export default function WalletConnectButton() {
  const [showWalletModal, setShowWalletModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowWalletModal(true)}
        style={{
          background: "orange",
          color: "#000",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Connect Wallet
      </button>

      <Modal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)}>
        <h2>Connect Your Wallet</h2>
        <p style={{ color: "#bbb" }}>Coming soon or integrate with MetaMask API</p>
      </Modal>
    </div>
  );
}
