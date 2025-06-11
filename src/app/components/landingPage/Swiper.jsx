"use client";
import { useEffect, useRef } from "react";

const items = [
  "BNB/USDT", "XRP/USDT", "FLOKI/USDT", "DOGE/USDT",
  "BNB/USDT", "XRP/USDT", "FLOKI/USDT", "DOGE/USDT",
];

export default function CustomTicker() {
  const tickerRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="overflow-hidden bg-black text-white w-full select-none">
      <div ref={tickerRef} className="flex whitespace-nowrap">
        {items.concat(items).map((item, index) => (
          <div key={index} className="px-16 py-4 text-md">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
