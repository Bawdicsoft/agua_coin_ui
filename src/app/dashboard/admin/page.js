"use client";
import EarningsChart from "@/components/EarningsChart";
import RightSidebar from "@/components/RightSidebar";
import SummaryCardsForAdmin from "@/components/user/SummaryCardsForAdmin";
export default function Page() {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-3/4 flex gap-4 flex-col">
        <SummaryCardsForAdmin />
        <EarningsChart />
      </div>
      <div className="w-1/4">
        <RightSidebar />
      </div>
    </div>
  );
}
