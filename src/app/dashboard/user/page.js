import EarningsChart from "@/components/EarningsChart";
import RightSidebar from "@/components/RightSidebar";
import SummaryCards from "@/components/user/SummaryCards";


export default function Page() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "1.5rem" }}>
      <div>
        <SummaryCards />
        <EarningsChart />
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
}
