"use client";
import EarningsChart from "@/components/EarningsChart";
import RightSidebar from "@/components/RightSidebar";
import SummaryCards from "@/components/user/SummaryCards";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <SummaryCards />
      </div>
      <div className="flex flex-row  gap-4 ">
        <div className="w-3/4">
          <EarningsChart />
        </div>
        <div className="w-1/4">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
