"use client";
import EarningsChart from "@/components/EarningsChart";
import RightSidebar from "@/components/RightSidebar";
import SummaryCards from "@/components/user/SummaryCards";
import { useEffect, useState } from "react";

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "3fr 1fr",
        gap: "1.5rem",
        alignItems: "start", // ✅ Keeps sidebar top-aligned with content
      }}
    >
      <div>
        <SummaryCards />
        <EarningsChart />
      </div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "3fr 1fr", // or "1fr" for mobile
    gap: "1rem",
  }}
>
  <RightSidebar /> {/* ← Will stretch full width on mobile */}
</div>

    </div>
  );
}
