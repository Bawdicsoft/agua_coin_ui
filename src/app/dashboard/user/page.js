"use client";
import EarningsChart from "@/components/EarningsChart";
import RightSidebar from "@/components/RightSidebar";
import SummaryCardsForUser from "@/components/user/SummaryCardsForUser";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Page() {
const { auth } = useContext(AuthContext)
const router = useRouter();


  useEffect(() => {
    if (!auth?.isLoggedIn || auth?.user?.role !== "user") {
      // router.push("/unauthorized");
        console.log("You are unauthorized person")
    }
  }, [auth]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <div className="w-full lg:w-3/4 flex flex-col gap-4">
        <SummaryCardsForUser />
        <EarningsChart />
      </div>
      <div className="w-full lg:w-1/4">
        <RightSidebar />
      </div>
    </div>
  );
}
