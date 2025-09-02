"use client";
import { useEffect, useRef, useState } from "react";

// Define the API endpoint and conversion constant
const OUNCE_TO_GRAM = 31.1035;

export default function CustomTicker() {
  const tickerRef = useRef(null);
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch price data from API
  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        setLoading(true);
        
        // Fetch gold price
        const goldRes = await fetch("https://api.gold-api.com/price/XAU");
        const goldData = await goldRes.json();
        const goldOunce = goldData.price;
        const goldGram = goldOunce / OUNCE_TO_GRAM;

        // Fetch silver price
        const silverRes = await fetch("https://api.gold-api.com/price/XAG");
        const silverData = await silverRes.json();
        const silverOunce = silverData.price;
        const silverGram = silverOunce / OUNCE_TO_GRAM;

        // Create price items array
        const priceItems = [
          { symbol: "Gold/USD", price: `$${goldOunce.toFixed(2)}/oz` },
          { symbol: "Gold/G", price: `$${goldGram.toFixed(2)}/g` },
          { symbol: "Silver/USD", price: `$${silverOunce.toFixed(2)}/oz` },
          { symbol: "Silver/G", price: `$${silverGram.toFixed(2)}/g` },
          { symbol: "Gold/USD", price: `$${goldOunce.toFixed(2)}/oz` },
          { symbol: "Gold/G", price: `$${goldGram.toFixed(2)}/g` },
          { symbol: "Silver/USD", price: `$${silverOunce.toFixed(2)}/oz` },
          { symbol: "Silver/G", price: `$${silverGram.toFixed(2)}/g` },
        ];

        setPriceData(priceItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching price data:", error);
        setLoading(false);
        
        // Fallback data in case API fails
        const fallbackItems = [
          { symbol: "Gold/USD", price: "$2,050.50/oz" },
          { symbol: "Gold/G", price: "$65.92/g" },
          { symbol: "Silver/USD", price: "$24.80/oz" },
          { symbol: "Silver/G", price: "$0.80/g" },
          { symbol: "Gold/USD", price: "$2,050.50/oz" },
          { symbol: "Gold/G", price: "$65.92/g" },
          { symbol: "Silver/USD", price: "$24.80/oz" },
          { symbol: "Silver/G", price: "$0.80/g" },
        ];
        setPriceData(fallbackItems);
      }
    };

    fetchPriceData();

    // Optional: Set up interval to refresh prices (e.g., every 30 seconds)
    const intervalId = setInterval(fetchPriceData, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // Animation effect
  useEffect(() => {
    if (!tickerRef.current || priceData.length === 0) return;

    let animationFrameId;
    const ticker = tickerRef.current;

    let pos = 0;
    const speed = 0.5;

    const animate = () => {
      pos -= speed;
      if (Math.abs(pos) >= ticker.scrollWidth / 2) {
        pos = 0;
      }
      ticker.style.transform = `translateX(${pos}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [priceData]);

  if (loading && priceData.length === 0) {
    return (
      <div className="overflow-hidden bg-black text-white w-full select-none py-4">
        <div className="flex justify-center">
          <div className="animate-pulse">Loading prices...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-black text-white w-full select-none">
      <div ref={tickerRef} className="flex whitespace-nowrap">
        {priceData.concat(priceData).map((item, index) => (
          <div key={index} className="px-16 py-4 text-md flex items-center gap-3">
            <span className="font-semibold">{item.symbol}</span>
            <span className="text-green-400">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}