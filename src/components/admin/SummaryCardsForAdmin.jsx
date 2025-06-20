"use client";
import React, { useEffect, useState, useContext } from "react";
import { Contract, ethers } from "ethers";
import { useTheme } from "@/context/ThemeContext";
import { WalletContext } from "@/context/WalletContext";
import {
  goldToken,
  silverToken,
  aguaToken,
  auAbi,
  agAbi,
  aguaAbi,
} from "@/content/tokendata";

const OUNCE_TO_GRAM = 31.1035;
const GOLD_WEIGHT = 0.6;
const SILVER_WEIGHT = 0.4;

export default function SummaryCardsForAdmin() {
  const { theme } = useTheme();
  const { walletAddress, signer } = useContext(WalletContext);
  const [rates, setRates] = useState({ gold: null, silver: null, agua: null });
  const [balances, setBalances] = useState({ gold: 0, silver: 0, agua: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch rates
  useEffect(() => {
    async function fetchRates() {
      try {
        const goldRes = await fetch("https://api.gold-api.com/price/XAU");
        const goldData = await goldRes.json();
        const goldOunce = goldData.price;
        const goldGram = goldOunce / OUNCE_TO_GRAM;
        const silverRes = await fetch("https://api.gold-api.com/price/XAG");
        const silverData = await silverRes.json();
        const silverOunce = silverData.price;
        const silverGram = silverOunce / OUNCE_TO_GRAM;
        // AGUA: weighted average for both per oz and per gram
        const aguaOunce = (goldData.price * 0.6) + (silverData.price * 0.4);
        const aguaGram = goldGram * GOLD_WEIGHT + silverGram * SILVER_WEIGHT;
        setRates({
          gold: { ounce: goldOunce, gram: goldGram },
          silver: { ounce: silverOunce, gram: silverGram },
          agua: { ounce: aguaOunce, gram: aguaGram },
        });
      } catch (e) {
        setRates({ gold: { ounce: 0, gram: 0 }, silver: { ounce: 0, gram: 0 }, agua: { ounce: 0, gram: 0 } });
      }
    }
    fetchRates();
  }, []);

  // Fetch balances
  useEffect(() => {
    async function fetchBalances() {
      if (!walletAddress || !signer) {
        setBalances({ gold: 0, silver: 0, agua: 0 });
        setLoading(false);
        return;
      }
      try {
        const goldContract = new Contract(goldToken, auAbi, signer);
        const silverContract = new Contract(silverToken, agAbi, signer);
        const aguaContract = new Contract(aguaToken, aguaAbi, signer);
        const [goldBal, silverBal, aguaBal] = await Promise.all([
          goldContract.balanceOf(walletAddress),
          silverContract.balanceOf(walletAddress),
          aguaContract.balanceOf(walletAddress),
        ]);
        setBalances({
          gold: Number(ethers.formatUnits(goldBal, 18)),
          silver: Number(ethers.formatUnits(silverBal, 18)),
          agua: Number(ethers.formatUnits(aguaBal, 18)),
        });
      } catch (e) {
        setBalances({ gold: 0, silver: 0, agua: 0 });
      } finally {
        setLoading(false);
      }
    }
    fetchBalances();
  }, [walletAddress, signer]);

  // 3D card backgrounds
  const cardBg = theme === "dark"
    ? "linear-gradient(135deg, #23272e 0%, #18181b 100%)"
    : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)";
  const cardShadow = theme === "dark"
    ? "0 2px 12px 0 rgba(0,0,0,0.32), 0 1.5px 4px 0 rgba(0,0,0,0.18)"
    : "0 2px 12px 0 rgba(0,0,0,0.10), 0 1.5px 4px 0 rgba(0,0,0,0.06)";
  const borderColor = theme === "dark" ? "#23272e" : "#e5e7eb";
  const textColor = theme === "dark" ? "#f3f4f6" : "#22292f";
  const labelColor = theme === "dark" ? "#cbd5e1" : "#64748b";

  const containerStyle = {
    display: "grid",
    gap: "0.7rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  };

  const cardStyle = {
    background: cardBg,
    border: `1px solid ${borderColor}`,
    borderRadius: "10px",
    padding: "0.5rem 0.6rem 0.4rem 0.6rem",
    minHeight: "48px",
    boxShadow: cardShadow,
    color: textColor,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  const topRowStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 2,
  };

  const titleStyle = {
    fontWeight: 700,
    fontSize: "0.85rem",
    color: textColor,
    letterSpacing: 0.2,
    display: "flex",
    alignItems: "center",
    gap: 4,
  };

  // Shadow text for current rate
  const shadowTextStyle = {
    fontWeight: 500,
    fontSize: "0.75rem",
    color: labelColor,
    textShadow: theme === "dark"
      ? "0 1px 2px #000, 0 0.5px 0.5px #23272e"
      : "0 1px 2px #e2e8f0, 0 0.5px 0.5px #fff",
    marginLeft: 8,
    minWidth: 60,
    textAlign: "right",
    whiteSpace: "nowrap",
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "0.09rem 0",
    borderBottom: `1px solid ${borderColor}`,
  };

  const lastRowStyle = {
    ...rowStyle,
    borderBottom: "none",
  };

  const labelStyle = {
    color: labelColor,
    fontWeight: 500,
    fontSize: "0.8rem",
  };

  const valueStyle = {
    color: textColor,
    fontWeight: 600,
    fontSize: "0.85rem",
    marginLeft: 8,
    display: "flex",
    alignItems: "center",
  };

  const tokenValueStyle = {
    color: textColor,
    fontWeight: 700,
    fontSize: "0.85rem",
    marginLeft: 8,
    display: "flex",
    alignItems: "center",
    letterSpacing: 0.5,
    wordBreak: "break-all",
  };

  const dollarStyle = {
    fontWeight: 600,
    fontSize: "0.85rem",
    marginRight: 2,
    display: "inline-block",
    color: textColor,
  };

  // Responsive styles for mobile
  const responsiveStyle = `
    @media (max-width: 600px) {
      .summary-cards-admin-container {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      .summary-cards-admin-card {
        padding: 0.4rem 0.3rem 0.3rem 0.3rem;
      }
      .summary-cards-admin-title {
        font-size: 0.8rem;
      }
      .summary-cards-admin-token-value {
        font-size: 0.8rem;
      }
    }
  `;

  const cards = [
    {
      type: "gold",
      title: "Gold",
      symbol: "(AU)",
      marketRate: loading ? "Loading..." : rates.gold?.ounce,
      tokenRate: loading ? "Loading..." : rates.gold?.gram,
      balance: loading ? "Loading..." : balances.gold,
    },
    {
      type: "silver",
      title: "Silver",
      symbol: "(AG)",
      marketRate: loading ? "Loading..." : rates.silver?.ounce,
      tokenRate: loading ? "Loading..." : rates.silver?.gram,
      balance: loading ? "Loading..." : balances.silver,
    },
    {
      type: "agua",
      title: "Agua",
      symbol: "(AGUA)",
      marketRate: loading ? "Loading..." : rates.agua?.ounce,
      tokenRate: loading ? "Loading..." : rates.agua?.gram,
      balance: loading ? "Loading..." : balances.agua,
    },
  ];

  return (
    <>
      <style>{responsiveStyle}</style>
      <div className="summary-cards-admin-container" style={containerStyle}>
        {cards.map((card, idx) => (
          <div key={idx} className="summary-cards-admin-card" style={cardStyle}>
            <div style={topRowStyle}>
              <span className="summary-cards-admin-title" style={titleStyle}>{card.title} <span style={{ fontWeight: 400, fontSize: "0.8rem", color: labelColor, marginLeft: 4 }}>{card.symbol}</span></span>
              <span style={shadowTextStyle}>
                {card.marketRate === "Loading..."
                  ? "Loading..."
                  : `Current Rate: $${card.marketRate !== null ? Number(card.marketRate).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "0"}/oz`}
              </span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Token Rate:</span>
              <span style={valueStyle}>
                <span style={dollarStyle}>$</span>
                {card.tokenRate === "Loading..."
                  ? "Loading..."
                  : card.tokenRate !== null
                    ? `${Number(card.tokenRate).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                    : "0"}
              </span>
            </div>
            <div style={lastRowStyle}>
              <span style={labelStyle}>No. of Tokens:</span>
              <span className="summary-cards-admin-token-value" style={tokenValueStyle}>
                {card.balance === "Loading..."
                  ? "Loading..."
                  : card.balance !== null && card.balance !== undefined
                    ? Number(card.balance).toLocaleString(undefined, { maximumFractionDigits: 4 })
                    : "0"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
